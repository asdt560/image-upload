import express from "express";
import fs from "fs";
import path from 'path';
import 'dotenv/config'
import pg from '../db.js'

const router = express.Router()

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

router.get("/", async (req, res) => {
  let params = req.query;
  try {
    if (params.random) {
      const randomImage = `SELECT * FROM images ORDER BY RANDOM() LIMIT 1`
      pg.any(randomImage)
        .then((result) => {
          console.log(result)
          let file = result[0].filepath
          const type = mime[path.extname(file).slice(1)] || 'text/plain';
          const imageData = fs.readFileSync(file, { encoding: 'base64' });
          res.send({
            header: 'Content-Type', type,
            status: "success",
            body: imageData,
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

router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      console.log(req.body)
      let file = req.files.file;
      let folder = req.body.category
      let path = `./images/${folder}/${file.name}`

      file.mv(path);

      const insertItem = `
        INSERT INTO images (category, filepath)
        VALUES (${folder}, '${path}')
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
          console.error('Error inserting', err);
        })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;