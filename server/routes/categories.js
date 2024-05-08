import express from "express";
import fs from "fs";
import pg from '../db.js'

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    let folder = req.body.category
    console.log(req.body)
    if (!fs.existsSync(`./images/${folder}`)) {
      console.log(req.session.id)
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
    categoryById = `SELECT * FROM categories WHERE id = ${req.params.id} IF created_by = ${req.session.user.id}`
  } else {
    categoryById = `SELECT * FROM categories WHERE id = ${req.params.id} IF private = f`
  }
  pg.any(categoryById)
    .then((result) => {
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