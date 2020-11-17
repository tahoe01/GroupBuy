'use strict';

var express = require('express');

const url = require('url');

var router = express.Router();

var getHandler = function(req, res) {
    res.render('login');
}

/* GET login page. */
router.get('/', getHandler);

module.exports = router;
