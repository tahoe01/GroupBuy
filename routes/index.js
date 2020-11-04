'use strict';

var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();
var queryResult;


var getHandler = function(req, res) {
  const queryObj = url.parse(req.url, true).query;
  var query = '';
  
  if (Object.keys(queryObj).length === 0) {
    query = 'select * from Products;';
  } else {
    const searchKey = Object.keys(queryObj)[0];
    const searchValue = queryObj[searchKey];
    const limit = 'limit' in queryObj ? queryObj['limit'] : 30;
    const offset = 'offset' in queryObj ? queryObj['offset'] : 0;
    
    query = `select * from Products where ${searchKey}="${searchValue}" limit ${offset}, ${limit}`;
  }

  console.log('query:' + query);
  if (query != '') {
    sendQuery(query, res);
  } else {
    res.render('index');
  }
}

function sendQuery(query, res) {

  mysqlConnection.connection.query(query, function (error, results, fields) {
    if (error) 
      throw error;

    console.log(results);
    res.status(200).json({data: results});
  });
}

/* GET home page. */
router.get('/', getHandler);

module.exports = router;
