import express from "express";
import 'dotenv/config'
import pg from '../db.js'
import pgPromise from "pg-promise";

const PQ = pgPromise.ParameterizedQuery

const router = express.Router()

router.get("/", async (req, res) => {
  let params = req.query;
  try {
    if (params.random) {
      const randomImage = `
      SELECT * FROM images 
      INNER JOIN categories ON images.category = categories.id 
      WHERE categories.private = 'f' 
      ORDER BY RANDOM() LIMIT 1`
      pg.any(randomImage)
        .then((result) => {
          console.log(result)
          res.send({
            status: "success",
            body: result,
          });
        })
        .catch((error) => {
          console.log(error)
        })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/:categoryId", (req, res) => {
  console.log(req.params)
  const imagesPerCategory = new PQ({text: `SELECT * FROM images WHERE category = $1`, values: [req.params.categoryId]}) 
  pg.any(imagesPerCategory)
  .then((result) => {
    console.log(result)
    res.send({
      status: "success",
      body: result,
    });
  })
  .catch((error) => {
    console.log(error)
  })
})

router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      console.log(req.body)

      const file = req.files.files

      console.log(file)

      let path = `./imagefolder/${req.body.category}/${req.files.files.name}`
      console.log(path)
      file.mv(path)

      const insertItem = new PQ({text: `
        INSERT INTO images (img_name, category, upload_id, created_at, filepath)
        VALUES (
          $4,
          $1,
          $2,
          current_timestamp, 
          $3
        )
      `, values: [req.body.category, req.session.user.id, path, req.body.img_name]})
      pg.none(insertItem)
        .then(() => {
          console.log('Entry created successfully');
          res.send({
            status: "success",
            message: "File is uploaded",
            data: {
              name: file.name,
              mimetype: file.mimetype,
              size: file.size,
            },
          });
        })
        .catch((err) => {
          console.error('Error inserting', err.message);
        })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

export default router;