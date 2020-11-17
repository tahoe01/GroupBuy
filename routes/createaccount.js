'use strict';

var express = require('express');

var mysqlConnection = require('../common/mysql-connection.js');
var router = express.Router();

var postHandler = function(req, res) {
  console.log('in create-account postHandler');

  const reqBody = req.body;

  executeTransaction(reqBody, res);
  
}

function executeTransaction(reqBody, res) {
  console.log(reqBody);
  console.log(reqBody.firstName);
  console.log(reqBody.lastName);
  console.log(reqBody.email);
  console.log(reqBody.password);
  console.log(reqBody.phoneNumber);

  mysqlConnection.connection.beginTransaction(function(err) {
    if (err) { 
      throw err; 
    }
    const insertUserQuery = `insert into Users(firstName, lastName, email, password, phoneNumber) values("${reqBody.firstName}", "${reqBody.lastName}", "${reqBody.email}", "${reqBody.password}", "${reqBody.phoneNumber}")`;
    const findUserIdQuery = 'select max(userId) as maxUserId from Users';
    
    mysqlConnection.connection.query(insertUserQuery, function (error, results, fields) {

      if (error) {
        res.status(500).json({ message : "failure"});
        return mysqlConnection.connection.rollback(function() {
          throw error;
        });
      }
      
      mysqlConnection.connection.query(findUserIdQuery, function (error, results, fields) {
        if (error) {
          res.status(500).json({ message : "failure"});
          return mysqlConnection.connection.rollback(function() {
            throw error;
          });
        }
        const maxUserId = results[0]["maxUserId"];

        mysqlConnection.connection.commit(function(err) {
          if (err) {
            res.status(500).json({ message : "failure"});
            return mysqlConnection.connection.rollback(function() {
              throw err;
            });
          }
          res.status(200).json({userId: maxUserId})
        });

      });

    });

  });
};
 
const getHandler = function(req, res) {
  res.render('createaccount');
}

router.post('/', postHandler);
router.get('/', getHandler);

module.exports = router;