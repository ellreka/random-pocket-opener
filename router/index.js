const express = require('express');
const axios = require('axios');
const cookie = require('cookie');

const router = express.Router();

const consumer_key = '81334-d57a6937c20cab86963d47e2';
const redirect_uri = 'http://localhost:8000/callback';
router
    .get('/', (req, res) => {
        const cookies = cookie.parse(req.headers.cookie);
        console.log(cookies.access_token);
        res.render('../index.pug',{logged_in:cookies.access_token});
    })
    .get('/login', async (req, res) => {
        const get_request_token = await axios({
            method: 'POST',
            url: 'https://getpocket.com/v3/oauth/request',
            params: {
                consumer_key: consumer_key,
                redirect_uri: redirect_uri
            }
        })
        req.session.request_token = get_request_token.data.split('=')[1];
        res.redirect(`https://getpocket.com/auth/authorize?request_token=${req.session.request_token}&redirect_uri=${redirect_uri}`);
    })
    .get('/callback', async (req, res) => {
        const get_access_token = await axios({
            method: 'POST',
            url: 'https://getpocket.com/v3/oauth/authorize',
            params: {
                consumer_key: consumer_key,
                code: req.session.request_token,
                redirect_uri: 'http://localhost:8000'
            }

        })
        const access_token = get_access_token['data'].split('&')[0].split('=')[1];
        res.cookie('access_token', access_token);
        res.redirect('/');
    })
module.exports = router;
