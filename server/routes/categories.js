import express from "express";
import fs from "fs";
import pg from '../db.js'
import { body, validationResult } from 'express-validator'
import pgPromise from "pg-promise";

const PQ = pgPromise.ParameterizedQuery

const categoryValidator = [
  body('category').not().isEmpty()
]

const router = express.Router()

router.post("/", categoryValidator, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()})
    return;
  }
  try {
    if(!req.session.user) {
      res.send({
        status: "failed",
        message: "Not logged in",
      });
    }
    let folder = req.body.category
    console.log(req.body)
    if (!fs.existsSync(`./images/${folder}`)) {
      const insertCategory = `
        INSERT INTO categories (categoryName, created_at, private, creator_id)
        VALUES (
          '${folder}',
          current_timestamp,
          '${req.body.privacy}',
          ${req.session.user.id}
        )
      `
      pg.none(insertCategory)
        .then(() => {
          console.log('Entry created successfully');
          res.send({
            status: "success",
            message: "Category created",
            data: {
              name: folder
            },
          });
        })
        .catch((err) => console.error('Error inserting', err))
    } else {
      res.send({
        status: "failed",
        message: "Category already exists",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let allCategories;
    if(req.session.user) {
      allCategories = `SELECT * FROM categories WHERE creator_id = ${req.session.user.id} OR private = false`
    } else {
      allCategories = `SELECT * FROM categories WHERE private = false`
    }
    pg.any(allCategories)
      .then((result) => {
        console.log(result)
        res.send({
          status: "success",
          message: "Categories sent",
          data: {
            categories: result
          },
        });
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send(error);
      })
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

router.get("/:id", (req, res) => {
  console.log(req.params)
  let categoryById;
  if(req.session.user) {
    categoryById = `SELECT 1 FROM categories WHERE id = ${req.params.id} AND created_by = ${req.session.user.id} OR private = false`
  } else {
    categoryById = new PQ({text: `SELECT 1 FROM categories WHERE id = $1 AND private = false`, values: [req.params.id]}) 
  }
  console.log(categoryById)
  pg.any(categoryById)
    .then((result) => {
      console.log(result)
      res.send({
        status: "success",
        message: "Category sent",
        data: {
          category: result
        },
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    })
})

export default router;