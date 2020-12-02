'use strict';

var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();
var queryResult;
var userId;
var isLogin;


var getHandler = function (req, res) {
  isLogin = false;
  const queryObj = url.parse(req.url, true).query;
  const validKeyArr = ["company", "tag", "productName"];
  var query = '';

  if (Object.keys(queryObj).length === 0 || Object.keys(queryObj)[0] == "userId") {
    query = 'select * from Products;';
  } else {
    const searchKey = Object.keys(queryObj)[0];
    const searchValue = queryObj[searchKey];
    const limit = 'limit' in queryObj ? queryObj['limit'] : 30;
    const offset = 'offset' in queryObj ? queryObj['offset'] : 0;

    if (searchKey == "all") {
      query = `select * from Products where productName="${searchValue}" or tag="${searchValue}" or company="${searchValue}";`
      // query = `select * from Products where edth(productName,"${searchValue}",2) or edth(tag,"${searchValue}", 3) or edth(company, "${searchValue}", 3);`
    } else if (validKeyArr.includes(searchKey)) {
      query = `select * from Products where ${searchKey}="${searchValue}" limit ${offset}, ${limit}`;
      // query = `select * from Products where edth(${searchKey},"${searchValue}",2) limit ${offset}, ${limit}`;
    }
  }

  if (Object.keys(queryObj)[0] == 'userId' || Object.keys(queryObj)[1] == 'userId') {
    userId = queryObj['userId'];
    isLogin = true;
  }

  // console.log('query:' + query);
  if (query == '') {
    res.render('404');
    return;
  }

  var rankingTags = ["Music", "Video", "Office"];
  var queryRanking_0 = `SELECT productId, productName, COUNT(teamId) AS numPurchase FROM TeamPurchase NATURAL JOIN Products WHERE tag LIKE "%${rankingTags[0]}%" GROUP BY productId ORDER BY numPurchase DESC, productName ASC LIMIT 3;`;
  var queryRanking_1 = `SELECT productId, productName, COUNT(teamId) AS numPurchase FROM TeamPurchase NATURAL JOIN Products WHERE tag LIKE "%${rankingTags[1]}%" GROUP BY productId ORDER BY numPurchase DESC, productName ASC LIMIT 3;`;
  var queryRanking_2 = `SELECT productId, productName, COUNT(teamId) AS numPurchase FROM TeamPurchase NATURAL JOIN Products WHERE tag LIKE "%${rankingTags[2]}%" GROUP BY productId ORDER BY numPurchase DESC, productName ASC LIMIT 3;`;

  mysqlConnection.connection.query(queryRanking_0, function (error, ranking_0, fields) {
    if (error)
      throw error;
    console.log(ranking_0);

    mysqlConnection.connection.query(queryRanking_1, function (error, ranking_1, fields) {
      if (error)
        throw error;
      console.log(ranking_1);

      mysqlConnection.connection.query(queryRanking_2, function (error, ranking_2, fields) {
        if (error)
          throw error;
        console.log(ranking_2);

        mysqlConnection.connection.query(query, function (error, results, fields) {
          if (error)
            throw error;

          // console.log(results);
          if (isLogin) {
            console.log("current User Id: " + userId);
            res.render('index', { rankingResult_0: ranking_0, rankingResult_1: ranking_1, rankingResult_2: ranking_2, retrieveResult: results, userId: userId });
          } else { // User not log in
            res.redirect('/');
          }
        });
      });
    });
  });
}

/* GET home page. */
router.get('/', getHandler);

module.exports = router;
