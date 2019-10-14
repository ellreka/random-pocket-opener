const express = require('express');
const path = require('path');
const request = require('request');
const session = require('express-session');

require('dotenv').config();
const env = process.env;
const consumer_key = env.POCKET_CONSUMERKEY;

const app = express();

app.use(express.static(path.join('./', 'dist')));
app.use(session({
  secret: "pocketopener",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 1000 }
}));

app.get('/auth', (req, res) => {
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-Accept": "application/json"
    },
    body: `consumer_key=${consumer_key}&redirect_uri=${req.protocol + '://' + req.get('host')}/callback`,
    url: 'https://getpocket.com/v3/oauth/request'
  }
  request.post(options, (error, response, body) => {
    req.session.request_token = JSON.parse(body)['code'];
    res.send(`https://getpocket.com/auth/authorize?request_token=${req.session.request_token}&redirect_uri=${req.protocol}://${req.get('host')}/callback`);
  })
})

app.get('/callback', (req, res) => {
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-Accept": "application/json"
    },
    body: `consumer_key=${consumer_key}&code=${req.session.request_token}&redirect_uri=${req.protocol + '://' + req.get('host')}`,
    url: 'https://getpocket.com/v3/oauth/authorize'
  }
  request.post(options, function (error, response, body) {
    res.cookie('access_token', JSON.parse(body)['access_token']);
    res.redirect('/')
  });
})

app.listen(8000, ()=> {
  console.log('server running');
})