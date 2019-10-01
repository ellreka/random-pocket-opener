const express = require('express');
const path = require('path');
const axios = require('axios');
const pocket = require('pocket-api');
const session = require('express-session');

const consumer_key = '81334-d57a6937c20cab86963d47e2';

const app = express();

app.use(express.static(path.join('./', 'dist')));
app.use(session({
  secret: "randompocketopener",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 1000 }
}));

app.get('/auth', async (req, res) => {
  pocket.getRequestToken( consumer_key , function( data ) {
    req.session.request_token = data['code']
    res.send({authorize_url: `https://getpocket.com/auth/authorize?request_token=${req.session.request_token}&redirect_uri=http://localhost:8000/callback`})
  });
})

app.get('/callback', (req, res) => {
  console.log(req.session.request_token)
  pocket.getAccessToken( consumer_key , req.session.request_token, function( data ) {
    console.log( data );
    res.cookie('access_token', data['access_token']);
    res.redirect('/');
  });
})

app.listen(8000, ()=> {
  console.log('server running');
})