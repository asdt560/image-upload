import express from "express";
import fs from "fs";
import pg from '../db.js'

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    let folder = req.body.category
    if (!fs.existsSync(`./images/${folder}`)) {
      const insertCategory = `
        INSERT INTO categories (categoryName)
        VALUES ('${folder}')
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
  const allCategories = `SELECT * FROM categories`
  pg.any(allCategories)
    .then((result) => {
      res.send({
        status: "success",
        message: "Categories sent",
        data: {
          categories: result
        },
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    })
});

export default router;