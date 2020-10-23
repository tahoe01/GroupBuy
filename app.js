// Execcute code in strict mode. With strict mode, you cannot use undeclared variables.
'use strict';

// const variables
const port = 8080;

// Global variables
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`GroupBuy listening at http://localhost:${port}`);
})
