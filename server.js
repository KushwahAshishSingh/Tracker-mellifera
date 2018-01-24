const express = require('express');
var helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

// helmet is a collection of 12 smaller middleware functions that set http headers.
app.use(helmet());             // helmet will set various http headers to help protect your app. but will nt include all middleware func by default.
// https://helmetjs.github.io
app.use(helmet.noCache());
app.use(helmet.frameguard());
// for disable them use
app.use(helmet({
    frameguard: false }));
app.use(helmet({
    noCache: false }));
// if using Express 3 , use them before app.router


const port = process.env.PORT || 3000;
app.use(bodyParser.json({}));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
require('./app/routes')(app, database);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
});



