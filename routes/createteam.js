'use strict';

var express = require('express');
var mysqlConnection = require('../common/mysql-connection.js');
var router = express.Router();
var queryResult;
const url = require('url');

var getHandler = function(req, res, next) {
  console.log('createteam api');
  // mysqlConnection.connection.query('SELECT * from movies', function (error, results, fields) {
  //   if (error) 
  //     throw error;
  //   console.log('The result is: ', results);
  // });
  res.render('createteam');
}


/* GET createteam page. */
router.get('/', getHandler);

module.exports = router;
