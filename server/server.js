import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import session from 'express-session'
import 'dotenv/config'
import pg from './db.js'
import pgSession from 'connect-pg-simple'

const app = express();

import imagesRoutes from './routes/images.js'
import categoriesRoutes from './routes/categories.js'
import usersRoutes from './routes/users.js'

const corsOptions = {
  origin: 'https://deployment--tiny-sunburst-e4134c.netlify.app',
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  preflightContinue: true,
  credentials: true
}

app.use(cors(corsOptions));

app.use(session(
  {
    store: new (pgSession(session))({
      createTableIfMissing: true,
      pgPromise: pg
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false
    }
  }
))

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('.'))

const cryptography = `CREATE EXTENSION IF NOT EXISTS pgcrypto`

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    username text NOT NULL,
    created_at timestamp,
    email text NOT NULL,
    password text NOT NULL
  )
`

const createCategoriesTable =`
  CREATE TABLE IF NOT EXISTS categories(
    id serial PRIMARY KEY,
    categoryName text NOT NULL,
    created_at timestamp,
    private boolean,
    creator_id int references users(id)
  )
`

const createImagesTable = `
  CREATE TABLE IF NOT EXISTS images(
    id serial PRIMARY KEY,
    category int references categories(id),
    upload_id int references users(id),
    created_at timestamp,
    filepath text NOT NULL
  );
`;

pg.any(cryptography)
  .then((data) => {
    pg.any(createUsersTable)
      .then((data) => {
        pg.any(createCategoriesTable)
          .then((data) => {
            pg.any(createImagesTable)
              .then((data) => {
              })
              .catch((err) => {
                console.error('Error creating table', err);
              })
          })
          .catch((err) => {
            console.error('Error creating table', err);
          })
      })
      .catch((err) => {
        console.error('Error creating table', err);
      })
  })
  .catch((err) => {
    console.error('Error creating table', err);
  })

app.use("/api/v1/images", imagesRoutes)
app.use("/api/v1/categories", categoriesRoutes)
app.use("/api/v1/users", usersRoutes)

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
