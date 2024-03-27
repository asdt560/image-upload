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

app.use(cors());

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createCategoriesTable =`
  CREATE TABLE IF NOT EXISTS categories(
    id serial PRIMARY KEY,
    categoryName text
  )
`

const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images(
    id serial PRIMARY KEY,
    category int references categories(id),
    filepath text
  );
`;

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    client.query(createCategoriesTable, (err, result) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Table created successfully');
      }
    });
    client.query(createImagesTable, (err, result) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Table created successfully');
      }
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });


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
    const randomImage = `SELECT * FROM images ORDER BY RANDOM() LIMIT 1`
    client.query(randomImage, (error, result) => {
      if(error) {
        console.error(error)
      } else {
        console.log(result)
        let file = result.rows[0].filepath
        const type = mime[path.extname(file).slice(1)] || 'text/plain';
        const imageData = fs.readFileSync(file, { encoding: 'base64' });
          res.send({
          header: 'Content-Type', type,
          status: "success",
          body: imageData,
        });
      }
    })
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
      console.log(req.body)
      let file = req.files.file;
      let folder = req.body.category
      let path = `./images/${folder}/${file.name}`
      
      file.mv(path);

      const insertItem = `
        INSERT INTO images (category, filepath)
        VALUES (${folder}, '${path}')
      `
      client.query(insertItem, (err, result) => {
        if (err) {
          console.error('Error inserting', err);
        } else {
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
        }
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/v1/categories", async (req, res) => {
  try {
    let folder = req.body.category
    if (!fs.existsSync(`./images/${folder}`)) {
      const insertCategory = `
        INSERT INTO categories (categoryName)
        VALUES ('${folder}')
      `
      client.query(insertCategory, (err, result) => {
        if (err) {
          console.error('Error inserting', err);
        } else {
          console.log('Entry created successfully', result);
          res.send({
            status: "success",
            message: "Category created",
            data: {
              name: folder
            },
          });
        }
      })
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
    const allCategories = `SELECT * FROM categories`
    client.query(allCategories, (err, result) => {
      if (err) {
        console.log('Error', err)
      } else {
        res.send({
          status: "success",
          message: "Categories sent",
          data: {
            categories: result.rows
          },
        });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
