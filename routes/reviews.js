'use strict';

var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();

var getHandler = function(req, res) {
  const queryObj = url.parse(req.url, true).query;
  const userId = queryObj['userId'];

  if (queryObj['action'] === 'submitReview') {
    const teamId = queryObj['teamId'];
    const reviewerId = queryObj['reviewerId'];
    const userId = queryObj['userId'];
    const rating = queryObj['rating'];
    const review = queryObj['review'];
    const productId = queryObj['productId']

    var update = `INSERT INTO Reviews(reviewerId, userId, teamId, productId, rating, description) VALUES(${reviewerId}, ${userId}, ${teamId}, ${productId}, ${rating}, '${review}')`;
    mysqlConnection.connection.query(update, function (error, data, fields) {
      if (error) 
        throw error;
    });

    var getTeamSizes = `SELECT teamId, count(*) as teamSize FROM UserInTeam WHERE teamId = ${teamId} GROUP BY teamId`
    var getTeamData = `SELECT * FROM Teams NATURAL JOIN (${getTeamSizes}) teamSizes WHERE teamId = ${teamId};`

    mysqlConnection.connection.query(getTeamData, function (error, teamData, fields) {
      if (error) 
        throw error;

      var userIds = `SELECT userId FROM UserInTeam WHERE teamId = ${teamId}`
      var getUserData = `SELECT * FROM Users WHERE userId in (${userIds});`
      mysqlConnection.connection.query(getUserData, function (error, userData, fields) {
        if (error) 
          throw error;

        var initiatorId = teamData[0].initiatorId
        var getTeamLeaderData = `SELECT * FROM Users WHERE userId = ${initiatorId};`
        mysqlConnection.connection.query(getTeamLeaderData, function (error, leaderData, fields) {
          if (error) 
            throw error;

        res.render('modifyteam', {teamData: teamData, userData: userData, leaderData: leaderData, userId: userId, teamId: teamId, productId: productId});
        });
      });
    });
    return;
  }

  var getReviews = `SELECT * FROM Reviews WHERE userId = ${userId}`

  mysqlConnection.connection.query(getReviews, function (error, reviewData, fields) {
    if (error) 
      throw error;
    res.render('reviews', {reviewData: reviewData, userId: userId});
  });
  
}

/* GET home page. */
router.get('/', getHandler);

module.exports = router;
