'use strict';

const { formatPrefix } = require('d3');
var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();

var getHandler = function (req, res) {
    const queryObj = url.parse(req.url, true).query;
    const userId = queryObj['userId'];

    var db = req.db;
    var collection = db.get('followCollection');

    if (queryObj['action'] === 'followUser') {
        const userId = queryObj['userId'];
        const followedUserId = queryObj['followedUserId'];

        //update user
        const query = {"userId": userId}
        collection.find(query, {}, function (e, result) {
            console.log(result)
            console.log(Object.keys(result).length)
            if (Object.keys(result).length == 0) {
                const obj = [
                    {"userId": userId, "following": [followedUserId], "followers": []}
                ]
                collection.insert(obj)
            } else {
                collection.update(
                    {
                        "userId": userId
                    },
                    {
                        $push: {
                            "following": followedUserId
                        }
                    }
                )
            }
        });

        //update followed user
        const query2 = {"userId": followedUserId}
        collection.find(query2, {}, function (e, result) {
            console.log(result)
            console.log(Object.keys(result).length)
            if (Object.keys(result).length == 0) {
                const obj = [
                    {"userId": followedUserId, "following": [], "followers": [userId]}
                ]
                collection.insert(obj)
            } else {
                collection.update(
                    {
                        "userId": followedUserId
                    },
                    {
                        $push: {
                            "followers": userId
                        }
                    }
                )
            }
        });

    }


    collection.find({}, {}, function (e, docs) {
        console.log(docs)
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
