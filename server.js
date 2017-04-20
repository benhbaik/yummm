'use strict';

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var db = mongoose.connection;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var uri = 'mongodb://heroku_jg6jb9n1:88sdm00fcjc5v0ar6kalf8n7cl@ds111441.mlab.com:11441/heroku_jg6jb9n1';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token');
    next();
});

mongoose.Promise = global.Promise;
// 'mongodb://localhost:27017/dev'
mongoose.connect(uri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

app.use(express.static('client'));

app.use('/open', require('./server/routes/openRoutes.js'));
app.use('/secure', require('./server/routes/secureRoutes.js'));

app.listen(port);