// Execcute code in strict mode. With strict mode, you cannot use undeclared variables.
'use strict';

// const variables
const port = 8080;

// Dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

// Router
var indexRouter = require('./routes/index');
var createTeamRouter = require('./routes/createteam');
var teamProfileRouter = require('./routes/teamprofile');
var reviewsRouter = require('./routes/reviews');

// MySQL Connection
var mysqlConnection = require('./common/mysql-connection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API path registration
app.use('/', indexRouter);
app.use('/teamprofile', teamProfileRouter);
app.use('/createteam', createTeamRouter);
app.use('/reviews', reviewsRouter);

// Connect to MySQL
mysqlConnection.connection.connect();

module.exports = app;

var server = http.createServer(app);
server.listen(8080, function() {
  console.log('Gryffindor is listening on port 8080');
});

// TODO: close MySQL connection