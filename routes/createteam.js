'use strict';

var express = require('express');
var mysqlConnection = require('../common/mysql-connection.js');

var router = express.Router();

var postHandler = function(req, res) {
  console.log('in postHandler');

  const reqBody = req.body;

  executeTransaction(reqBody, res);
  
}

function executeTransaction(reqBody, res) {
  mysqlConnection.connection.beginTransaction(function(err) {
    if (err) { 
      throw err; 
    }
    console.log("INFO I GET");
    console.log(reqBody.userId);
    console.log(reqBody.productId);
    console.log(reqBody.maxGroupSize);
    const insertTeamQuery = `insert into Teams(status, maxGroupSize, initiatorId) values("active", ${reqBody.maxGroupSize}, ${reqBody.userId});`;
    const findTeamIdQuery = 'select max(teamId) as maxTeamId from Teams;';
    
    mysqlConnection.connection.query(insertTeamQuery, function (error, results, fields) {

      if (error) {
        res.status(500).json({ message : "failure"});
        return mysqlConnection.connection.rollback(function() {
          throw error;
        });
      }
      
      mysqlConnection.connection.query(findTeamIdQuery, function (error, results, fields) {
        if (error) {
          res.status(500).json({ message : "failure"});
          return mysqlConnection.connection.rollback(function() {
            throw error;
          });
        }
        const maxTeamId = results[0]["maxTeamId"];
        const insertUserInTeamQuery = `insert into UserInTeam(userId, teamId) values (${reqBody.userId}, ${maxTeamId});`;
        console.log('maxTeamId:' + maxTeamId);

        mysqlConnection.connection.query(insertUserInTeamQuery, function (error, results, fields) {
          if (error) {
            res.status(500).json({ message : "failure"});
            return mysqlConnection.connection.rollback(function() {
              throw error;
            });
          }
          let purchaseDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
          const insertTeamPurchaseQuery = `insert into TeamPurchase(teamId, productId, purchaseDate) values (${maxTeamId}, ${reqBody.productId}, '${purchaseDate}');`;
          
          mysqlConnection.connection.query(insertTeamPurchaseQuery, function (error, results, fields) {
            if (error) {
              res.status(500).json({ message : "failure"});
              return mysqlConnection.connection.rollback(function() {
                throw error;
              });
            }

            mysqlConnection.connection.commit(function(err) {
              if (err) {
                res.status(500).json({ message : "failure"});
                return mysqlConnection.connection.rollback(function() {
                  throw err;
                });
              }
              console.log("redirect");
              res.redirect(`/teamprofile?userId=${reqBody.userId}`);
            });

          });

        });

      });
    });
  });

}

router.post('/', postHandler);
module.exports = router;