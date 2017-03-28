var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var db = mongoose.connection;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var apiRoutes = require('./server/routes/userRoutes.js')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dev');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

app.use(express.static('client'));

app.use('/api', apiRoutes);

app.listen(port);
