import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import fs from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
import 'dotenv/config'
import pg from 'pg'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const client = new pg.Client({
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  host: process.env.DBHOST,
  port: process.env.PORT,
  database: process.env.DBNAME,
});


const app = express();

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });


app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/api/v1/random-image", async (req, res) => {
  try {
    const arr = fs.readdirSync('./images').filter((word) => word != '.gitignore')
    const sample = `./images/${arr[Math.floor(Math.random()*arr.length)]}`;
    const files = fs.readdirSync(sample)
    const file = `${sample}/${files[Math.floor(Math.random()*files.length)]}`
    const type = mime[path.extname(file).slice(1)] || 'text/plain';
    const imageData = fs.readFileSync(file, { encoding: 'base64' });
    res.send({
        header: 'Content-Type', type,
        status: "success",
        body: imageData,
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/v1/images", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;
      let folder = req.body.category

      file.mv(`./images/${folder}/${file.name}`);

      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/v1/categories", async (req, res) => {
  try {
    let folder = req.body.category
    if (!fs.existsSync(`./images/${folder}`)) {
      fs.mkdirSync(path.join(__dirname, `/images/${folder}`))
      res.send({
        status: "success",
        message: "Category created",
        data: {
          name: folder
        },
      });
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

app.get("/api/v1/categories", async (req, res) => {
  try {
    const arr = fs.readdirSync('./images').filter((word) => word != '.gitignore')
    res.send({
      status: "success",
      message: "Category created",
      data: {
        categories: arr 
      },
    });

  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
