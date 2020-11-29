'use strict';

const { count } = require('console');
var express = require('express');

const url = require('url');

var mysqlConnection = require('./../common/mysql-connection.js');
var router = express.Router();

var getHandler = function(req, res) {
  const queryObj = url.parse(req.url, true).query;
  var currentUserId = queryObj['userId'];

  if (queryObj['action'] === 'modifyTeam') {
    const teamId = queryObj['teamId'];
    const userId = queryObj['userId'];
    const productId = queryObj['productId'];
    
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

  if (queryObj['action'] === 'submitTeamModification') {
    const teamId = queryObj['teamId'];
    const userId = queryObj['userId'];
    const updatedTeamCapacity = queryObj['updatedTeamCapacity'];

    var update = `UPDATE Teams SET maxGroupSize = ${updatedTeamCapacity} WHERE teamId = ${teamId}`;
    mysqlConnection.connection.query(update, function (error, data, fields) {
      if (error) 
        throw error;
    });
  }

  if (queryObj['action'] === 'activate' || queryObj['action'] === 'deactivate') {
    const teamId = queryObj['teamId'];
    const userId = queryObj['userId'];
    const productId = queryObj['productId']

    var initiatorQuery = `SELECT initiatorId FROM Teams WHERE teamId = ${teamId}`;

    mysqlConnection.connection.query(initiatorQuery, function (error, initiatorId, fields) {
      if (error) 
        throw error;
  
      // if (initiatorId !== userId)
    });
    
    var query = '';
    if (queryObj['action'] === 'activate')
      var query = `UPDATE Teams SET status = 'active' WHERE teamId = ${teamId}`;
    else if (queryObj['action'] === 'deactivate')
      var query = `UPDATE Teams SET status = 'inactive' WHERE teamId = ${teamId}`;

    mysqlConnection.connection.query(query, function (error, teamData, fields) {
      if (error) 
        throw error;
    });
  }

  if (queryObj['action'] === 'leaveTeam') {
    const teamId = queryObj['teamId'];
    const userId = queryObj['userId'];
    
    var deleteQuery = `DELETE FROM UserInTeam WHERE teamId = ${teamId} AND userId = ${userId}`;

    mysqlConnection.connection.query(deleteQuery, function (error, teamData, fields) {
      if (error) 
        throw error;
    });
  }
  
  
  var getTeamSizes = `SELECT teamId, count(*) as teamSize FROM UserInTeam GROUP BY teamId`
  var getUsersTeamData = `SELECT * FROM Teams NATURAL JOIN TeamPurchase NATURAL JOIN Products NATURAL JOIN (${getTeamSizes}) teamSizes WHERE teamId IN (SELECT teamId FROM UserInTeam WHERE userId=${currentUserId}) ORDER BY teamId ASC;`
  console.log(getUsersTeamData);

  mysqlConnection.connection.query(getUsersTeamData, function (error, teamData, fields) {
    if (error) 
      throw error;
    console.log(teamData);
    res.render('teamprofile', {teamData: teamData, userId: currentUserId});
  });
}

/* GET teamprofile page. */
router.get('/', getHandler);

module.exports = router;
