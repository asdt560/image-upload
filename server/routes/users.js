import 'dotenv/config'
import pg from '../db.js'
import express from 'express'
const router = express.Router();

const checkIfEmailExists = (email) => {
  const checkEmail = `SELECT * FROM users WHERE email = '${email}'`
  let emailExists = pg.any(checkEmail)
    .then((result) => {
      if (result.length) return true;
      else return false;
    })
  return emailExists;
}

const checkIfUserExists = (username) => {
  const checkUserName = `SELECT * FROM users WHERE username = '${username}'`
  let userExists = pg.any(checkUserName)
    .then((result) => {
      if (result.length) return true;
      else return false;
    })
  return userExists;
}

// User Signup Route
router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    console.log(req.body)
    res.status(400);
    res.send("Invalid details!");
  } else {
    console.log(req.body)
    const invalidUser = await checkIfUserExists(req.body.username)
    if (invalidUser) {
      res.status(400).send("User Already Exists!")
    } else {
      const invalidEmail = await checkIfEmailExists(req.body.email)
      if (invalidEmail) {
        res.status(400).send("Email Already Exists!")
      } else {
        const insertUser = `INSERT INTO users (username, created_at, email, password)
          VALUES (
            '${req.body.username}', 
            current_timestamp, 
            '${req.body.email}', 
            crypt('${req.body.password}', gen_salt('bf'))
          )`
        pg.any(insertUser)
          .then((result) => {
            console.log('Entry created successfully', result);
            res.send({
              status: "success",
              message: "User Created",
            });
          })
          .catch((err) => {
            console.error('Error inserting', err);
          })
      }
    }
  }
});

// User Sign In Route
router.post('/signin', (req, res) => {
  // Implement user sign in logic here
  // ...
  res.send('User signed in successfully');
});

export default router;
