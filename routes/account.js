'use strict';

var express = require('express');

const url = require('url');

var router = express.Router();


var getHandler = function(req, res) {

    res.render('createaccount');
  
}


/* GET home page. */
router.get('/', getHandler);

module.exports = router;
