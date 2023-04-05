const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000

app.get('/mainimage', (req, res) => {
  const options = {
    root: __dirname
  }

  res.sendFile('./images/testimg/foto.jpg', options)
})

app.listen(port, () => {
  console.log(`Server running in ${port}`)
})
