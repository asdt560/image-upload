import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import session from 'express-session'
import 'dotenv/config'
import pg from './db.js'
import pgSession from 'connect-pg-simple'

const app = express();

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
      sameSite: 'none',
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60,
      httpOnly: false
    }
  }
))

import imagesRoutes from './routes/images.js'
import categoriesRoutes from './routes/categories.js'
import usersRoutes from './routes/users.js'

const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true
}

app.use(cors(corsOptions));

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers","*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});  


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
    console.log('Table created successfully', data);
    pg.any(createUsersTable)
      .then((data) => {
        console.log('Table created successfully', data);
        pg.any(createCategoriesTable)
          .then((data) => {
            console.log('Table created successfully', data);
            pg.any(createImagesTable)
              .then((data) => {
                console.log('Table created successfully', data);
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
