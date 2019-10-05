const express = require('express');
const path = require('path');
const axios = require('axios');
const pocket = require('pocket-api');
const session = require('express-session');
const LZString = require('lz-string');

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

app.get('/api/get', async (req, res) => {
  const pocket_json = await axios({
    method: 'POST',
    url: 'https://getpocket.com/v3/get',
    params: {
        consumer_key: consumer_key,
        access_token: req.query['access_token'],
        detailType: 'complete'
        }
  })
  const pocket_articles_arr = Object.entries(pocket_json['data']['list']).map(data => {
    return {
      title: data[1]['resolved_title'],
      url: data[1]['resolved_url'],
      tags: Object.keys(data[1]['tags'] || {'_untagged_':undefined}),
      image: data[1]['image'] || {'image':undefined}
    }
  })
  const pocket_tags_arr = pocket_articles_arr.map((val) => {
    return val.tags
  })
  const pocket_data = {
    tags: Array.from(new Set(pocket_tags_arr.flat())),
    articles: LZString.compressToUTF16(JSON.stringify(pocket_articles_arr))
  }
  res.send(pocket_data)
})

app.listen(8000, ()=> {
  console.log('server running');
})