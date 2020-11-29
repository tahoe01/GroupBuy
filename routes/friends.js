'use strict';

var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();

var getHandler = function (req, res) {
    const queryObj = url.parse(req.url, true).query;
    const userId = queryObj['userId'];

    var db = req.db;
    var collection = db.get('followCollection');
    collection.find({}, {}, function (e, docs) {
        res.render('friends', {
            "friends": docs,
            "userId": userId
        });
    });

    //   var getReviews = `SELECT * FROM Reviews WHERE userId = ${userId}`

    //   mysqlConnection.connection.query(getReviews, function (error, reviewData, fields) {
    //     if (error) 
    //       throw error;
    //     res.render('reviews', {reviewData: reviewData, userId: userId});
    //   });

}

/* GET home page. */
router.get('/', getHandler);

module.exports = router;
