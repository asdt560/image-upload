import express from "express";
import 'dotenv/config'
import pg from '../db.js'
import fs from 'fs'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const path = `../imagefolder/${req.body.category}`
    if(!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive : true})
    }
    return cb(null, path)
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})

const router = express.Router()

router.get("/", async (req, res) => {
  let params = req.query;
  try {
    if (params.random) {
      const randomImage = `SELECT * FROM images ORDER BY RANDOM() LIMIT 1`
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
  const imagesPerCategory = `SELECT * FROM images WHERE category = ${req.params.categoryId}`
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

router.post("/", upload.single('files'), async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      console.log(req.body)
      let path = `./imagefolder/${folder}/${req.files.name}`

      console.log(path)
      const insertItem = `
        INSERT INTO images (category, upload_id, created_at filepath)
        VALUES (
          ${folder},
          ${req.session.user.id},
          current_timestamp, 
          '${path}'
        )
      `
      pg.none(insertItem)
        .then(() => {
          console.log('Entry created successfully', result);
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
    res.status(500).send(err);
  }
});

export default router;