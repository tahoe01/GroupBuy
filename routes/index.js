'use strict';

var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();
var queryResult;


var getHandler = function(req, res) {
  const queryObj = url.parse(req.url, true).query;
  const validKeyArr = ["company", "tag", "productName"];
  var query = '';
  
  if (Object.keys(queryObj).length === 0) {
    query = 'select * from Products;';
  } else {
    const searchKey = Object.keys(queryObj)[0];
    const searchValue = queryObj[searchKey];
    const limit = 'limit' in queryObj ? queryObj['limit'] : 30;
    const offset = 'offset' in queryObj ? queryObj['offset'] : 0;
    
    if (searchKey == "all") {
      query = `select * from Products where productName="${searchValue}" or tag="${searchValue}" or company="${searchValue}";`
    } else if (validKeyArr.includes(searchKey)){
      query = `select * from Products where ${searchKey}="${searchValue}" limit ${offset}, ${limit}`;
    }
  }

  // console.log('query:' + query);
  if (query != '') {
    sendQuery(query, res);
  } else {
    res.render('404');
  }
  
}

function sendQuery(query, res) {

  mysqlConnection.connection.query(query, function (error, results, fields) {
    if (error) 
      throw error;

    // console.log(results);
    res.render('index', {retrieveResult: results});
    // console.log(results);
    // if (query.endsWith("from Products;")) {
    //   res.render('index', {retrieveResult: results});
    // } else {
    //   console.log("send data");
    //   res.send({retrieveResult: results});
    // }
  });
}

/* GET home page. */
router.get('/', getHandler);

module.exports = router;
