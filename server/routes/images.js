import express from "express";
import 'dotenv/config'
import pg from '../db.js'


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
  const imagesPerCategory = `SELECT * FROM images WHERE category = ${req.params.categoryId}`
  pg.any(imagesPerCategory)
  .then((result) => {
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

      const file = req.files.files

      let path = `./imagefolder/${req.body.category}/${req.files.files.name}`
      file.mv(path)

      const insertItem = `
        INSERT INTO images (category, upload_id, created_at, filepath)
        VALUES (
          ${req.body.category},
          ${req.session.user.id},
          current_timestamp, 
          '${path}'
        )
      `
      pg.none(insertItem)
        .then(() => {
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