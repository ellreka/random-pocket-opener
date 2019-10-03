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

app.get('/auth', (req, res) => {
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

app.get('/api/tags', async (req, res) => {
  const pocket_json = await axios({
    method: 'POST',
    url: 'https://getpocket.com/v3/get',
    params: {
        consumer_key: consumer_key,
        access_token: req.query['access_token'],
        detailType: 'complete',
        count: 20
        }
})
// console.log(pocket_json['data']['list']['2653282151'])
// const pocket_arr = Object.entries(pocket_json['data']['list']).map(data => {
//   return Object.keys(data[1]['tags']) || undefined
// })
const pocket_arr = Object.entries(pocket_json['data']['list']).map(data => {
  return Object.keys(data[1]['tags'] || {'_untagged_':undefined})
})
res.send(Array.from(new Set(pocket_arr.flat())))

})

app.get('/api/pick', async (req, res) => {
  const pocket_json = await axios({
    method: 'POST',
    url: 'https://getpocket.com/v3/get',
    params: {
        consumer_key: consumer_key,
        access_token: req.query['access_token'],
        detailType: 'simple',
        tag: req.query['tag'],
        search: req.query['word'],
        count: req.query['count']
        }
})
const pocket_arr = Object.entries(pocket_json['data']['list']).map(data => {
  return {
    title: data[1]['resolved_title'],
    url: data[1]['resolved_url']
  }
})
console.log(pocket_arr)
})

app.listen(8000, ()=> {
  console.log('server running');
})