import 'dotenv/config'
import pg from '../db.js'
const express = require('express');
const router = express.Router();

// User Signup Route
router.post('/signup', (req, res) => {
  if(!req.body.username || !req.body.password || !req.body.email){
    res.status("400");
    res.send("Invalid details!");
 } else {
    const checkUserName = `SELECT * FROM users WHERE username = ${req.body.username}`
    pg.any(checkUserName)
      .then((result) => {
        console.log(result)
      })
    const checkEmail = `SELECT * FROM users WHERE username = ${req.body.email}`
    pg.any(checkEmail)
      .then((result) => {
        console.log(result)
      })
    const insertUser = `INSERT INTO users (username, created_at, email, password)
    VALUES (
      ${req.body.username}, 
      to_timestamp(${Date.now()}), 
      ${req.body.email}, 
      crypt(${req.body.password}, gen_salt('bf'))
    )`
    pg.any(insertUser)
      .then(() => {
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
});

// User Sign In Route
router.post('/signin', (req, res) => {
  // Implement user sign in logic here
  // ...
  res.send('User signed in successfully');
});

module.exports = router;
