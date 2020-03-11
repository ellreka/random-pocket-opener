import axios from 'axios'

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())

require('dotenv').config()

app.post('/auth', async function(req, res) {
  const response = await axios.post('https://getpocket.com/v3/oauth/request', {
    consumer_key: process.env.CONSUMER_KEY,
    redirect_uri: 'https://localhost:3000'
  })
  const requestToken = response.data.split('=')[1]
  res.send(requestToken)
})

app.get('/callback', async function(req, res) {
  const response = await axios.post(
    'https://getpocket.com/v3/oauth/authorize',
    {
      consumer_key: process.env.CONSUMER_KEY,
      code: req.query.code
    }
  )
  const accessToken = response.data.split('=')[1].split('&')[0]
  res.cookie('access_token', accessToken)
  res.redirect('/')
})

app.post('/get', async function(req, res) {
  const params = {
    detailType: 'complete'
  }
  try {
    const response = await axios.post('https://getpocket.com/v3/get', {
      consumer_key: process.env.CONSUMER_KEY,
      access_token: req.cookies.access_token,
      ...params
    })
    const dataList = Object.entries(response.data.list)
    const articles = dataList.map((val) => {
      return {
        title: val[1].resolved_title,
        url: val[1].resolved_url,
        tags: Object.keys(val[1].tags || {}),
        image: val[1].image !== undefined ? val[1].image.src : undefined
      }
    })
    console.log(articles)
    res.send({
      allTags: [],
      articles
    })
  } catch (error) {
    console.log(error)
    res.send('ERROR')
  }
})

module.exports = {
  path: '/api',
  handler: app
}
