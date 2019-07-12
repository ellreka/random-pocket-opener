const express = require('express');
const router = require('./router/index');
const session = require('express-session');

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use('/', router);

app.listen(process.env.PORT || 8000, function() {
    console.log('listening on port 8000');
})
