var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'GroupBuyDB',
    insecureAuth: true
});

module.exports.connection = connection;