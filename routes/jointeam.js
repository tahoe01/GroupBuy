'use strict';

var express = require('express');
const { join } = require('path');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();

var getHandler = function(req, res) {
    console.log("------in jointeam-------");
    
    const queryObj = url.parse(req.url, true).query;

    if (queryObj['productId'] != null) { //localhost:8080/jointeam?userId=1&productId=1
        const productId = queryObj["productId"];
        const userId = queryObj['userId'];

        console.log("pid ", productId);
        var query = `select T.teamId, T.maxGroupSize, U.userId, U.firstName, U.lastName, U.email from TeamPurchase as TP natural join Teams as T join Users as U on T.initiatorId = U.userId where TP.productId=${productId} and T.status = "active";`;
        console.log("query ", query);
        sendQuery(query, res, userId, "find");

    } else if (queryObj['action'] == 'joinTeam') { //localhost:8080/jointeam?action=joinTeam&userId=2&teamId=4
        const teamId = queryObj['teamId'];
        const userId = queryObj['userId'];
        console.log(userId);
        console.log(teamId);
        
        const joinTeamQuery = `insert into UserInTeam(userId, teamId) values(${userId}, ${teamId});`;
        console.log(joinTeamQuery);
        sendQuery(joinTeamQuery, res, userId, queryObj['action']);
    }
}

function sendQuery(query, res, userId, action) {

  mysqlConnection.connection.query(query, function (error, results, fields) {
    if (error) 
      throw error;

    console.log(results);
    if (action == 'find') {
      res.render('teamlist', {retrieveResult: results, userId: userId});
    } else {
      res.redirect('/teamprofile?userId=' + userId);
    }
    
  });
}

/* GET jointeam page. */
router.get('/', getHandler);

module.exports = router;
