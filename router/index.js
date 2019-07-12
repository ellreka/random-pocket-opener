const express = require('express');
const axios = require('axios');
const cookie = require('cookie');
const router = express.Router();
require('dotenv').config();
console.log(process.env.CONSUMER_KEY);
const consumer_key = process.env.CONSUMER_KEY;
const redirect_uri = (req,res) => {
    return req.protocol + '://' + req.get('host') + '/callback'
};
router
    .get('/', async (req, res) => {
        const cookies = cookie.parse(req.headers.cookie);
        console.log(cookies.access_token);
        console.log(cookie.parse(req.headers.cookie));
        console.log(req.headers.cookie);
        if(cookies.access_token) {
            try {
                const get_pockets_json = await axios({
                    method: 'POST',
                    url: 'https://getpocket.com/v3/get',
                    params: {
                        consumer_key: consumer_key,
                        access_token: cookies.access_token,
                        contentType: 'article',
                        detailType: 'complete'
                    }
                })
                const all_pockets = get_pockets_json['data']['list'];
                const tags_array = []
                for(var item in all_pockets) {
                    for(var i in all_pockets[item]['tags']) {
                        tags_array.push(all_pockets[item]['tags'][i]['tag'])
                    }
                }
                const tag_list = tags_array.filter((elem, index, self) => self.indexOf(elem) === index)
                tag_list.unshift('---','タグなし')
                console.log(tag_list)
                res.render('../src/index.pug',{logged_in:cookies.access_token,tag_list:tag_list});
            } catch(e) {
                console.log('キャッチあああああああああああ');
                res.render('../src/index.pug',{logged_in:undefined})
            }
        }else{
            res.render('../src/index.pug',{logged_in:cookies.access_token})
        }
    })
    .get('/login', async (req, res) => {
        const get_request_token = await axios({
            method: 'POST',
            url: 'https://getpocket.com/v3/oauth/request',
            params: {
                consumer_key: consumer_key,
                redirect_uri: redirect_uri(req,res)
            }
        })
        req.session.request_token = get_request_token.data.split('=')[1];
        res.redirect(`https://getpocket.com/auth/authorize?request_token=${req.session.request_token}&redirect_uri=${redirect_uri(req,res)}`);
    })
    .get('/callback', async (req, res) => {
        const get_access_token = await axios({
            method: 'POST',
            url: 'https://getpocket.com/v3/oauth/authorize',
            params: {
                consumer_key: consumer_key,
                code: req.session.request_token,
            }

        })
        const access_token = get_access_token['data'].split('&')[0].split('=')[1];
        res.cookie('access_token', access_token);
        res.redirect('/');
    })
    .get('/logout', (req, res) => {
        res.clearCookie('access_token')
        res.redirect('/')
    })
    .post('/pick', async (req,res) => {
        console.log(req.body)
        const cookies = cookie.parse(req.headers.cookie);
        const pick_pockets = await axios({
            method: 'POST',
            url: 'https://getpocket.com/v3/get',
            params: {
                consumer_key: consumer_key,
                access_token: cookies.access_token,
                detailType: 'simple',
                tag: req.body.tag === '---' ? '' : req.body.tag === 'タグなし' ? '_untagged_' : req.body.tag,
                search: req.body.search_word,
                num: req.body.num
                }
        })
        const articles_arr = [];
        for(item in pick_pockets['data']['list']) {
            articles_arr.push({
                title: pick_pockets['data']['list'][item]['given_title'] || pick_pockets['data']['list'][item]['resolved_title'],
                url: pick_pockets['data']['list'][item]['given_url']
            })
        }
        const random_articles_arr = [...Array(Number(req.body.num) > articles_arr.length ? articles_arr.length : Number(req.body.num))].map(() => articles_arr.splice(Math.floor(Math.random() * articles_arr.length),1)[0]);
        console.log(random_articles_arr);
        res.json(
            random_articles_arr
        )
    })
module.exports = router;
