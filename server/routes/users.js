import 'dotenv/config'
import pg from '../db.js'
import express from 'express'
import { body, validationResult } from 'express-validator'
import pgPromise from "pg-promise";

const PQ = pgPromise.ParameterizedQuery

export const loginValidator = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Invalid empty password').not().isEmpty(),
]

export const signupValidator = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('username', 'Invalid empty username').not().isEmpty(),
  body('password', 'Invalid empty password').not().isEmpty(),
]

const router = express.Router();

const checkIfEmailExists = (email) => {
  const checkEmail = new PQ({text: `SELECT * FROM users WHERE email = $1`, values: [email]})
  let emailExists = pg.any(checkEmail)
    .then((result) => {
      if (result.length) return true;
      else return false;
    })
  return emailExists;
}

const checkIfUserExists = (username) => {
  const checkUserName = new PQ({text: `SELECT * FROM users WHERE username = $1`, values: [username]})
  let userExists = pg.any(checkUserName)
    .then((result) => {
      if (result.length) return true;
      else return false;
    })
  return userExists;
}

// User Signup Route
router.post('/signup', signupValidator, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()})
  } else {
    console.log(req.body)
    const invalidUser = await checkIfUserExists(req.body.username)
    if (invalidUser) {
      res.status(400).json({message: "User Already Exists"})
    } else {
      const invalidEmail = await checkIfEmailExists(req.body.email)
      if (invalidEmail) {
        res.status(400).json({message: "Email Already Exists"})
      } else {
        const insertUser = new PQ({text: `INSERT INTO users (username, created_at, email, password)
          VALUES (
            $1, 
            current_timestamp, 
            $2, 
            crypt($3, gen_salt('bf'))
          )`, values: [req.body.username, req.body.email, req.body.password]})
        pg.any(insertUser)
          .then((result) => {
            console.log('Entry created successfully', result);
            res.send({
              status: "success",
              success: true,
              message: "User Created",
            });
          })
          .catch((err) => {
            console.error('Error inserting', err);
            res.status(400).json(err);
          })
      }
    }
  }
});

// User Log In Route
router.post('/login', loginValidator, async (req, res) => {
  console.log(req.body)
  const invalidUser = await checkIfUserExists(req.body.username)
  if (!invalidUser) {
    res.status(400).send("User Does Not Exist!")
  } else {
    const checkPassword = new PQ({text: `SELECT * FROM users
      WHERE username = $1 
      AND password = crypt($2, password);`, values: [req.body.username, req.body.password]})
      console.log(checkPassword)
    pg.any(checkPassword)
      .then((result) => {
        if (result.length) {
          req.session.user = {username: result[0].username, id: result[0].id};
          console.log(req.session)
          res.send({
            status: "success",
            logged: true,
            user: req.session.user,
          })
        } else {
          res.status(400).send("Password Incorrect!")
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
});

router.get('/', (req, res) => {
  console.log(req.session.user, req.session.id)
  if(req.session.user) {
    res.send({
      user: req.session.user
    })
  } else {
    res.send({
      valid: false,
      user: null
    })
  }
})

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})

export default router;
