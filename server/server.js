import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import 'dotenv/config'
import pg from './db.js'
import imagesRoutes from './routes/images.js'
import categoriesRoutes from './routes/categories.js'

const app = express();

app.use(cors());

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('.'))

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

pg.any(createCategoriesTable)
  .then((data) => {
    console.log('Table created successfully', data);
  })
  .catch((err) => {
    console.error('Error creating table', err);
  })

pg.any(createImagesTable)
  .then((data) => {
    console.log('Table created successfully', data);
  })
  .catch((err) => {
    console.error('Error creating table', err);
  })

app.use("/api/v1/images", imagesRoutes)
app.use("/api/v1/categories", categoriesRoutes)


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
