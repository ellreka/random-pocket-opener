const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join('./', 'dist')));

app.get('/api', (req, res) => {
  res.send({api: 'test2'});
})

app.listen(8000, ()=> {
  console.log('server running');
})