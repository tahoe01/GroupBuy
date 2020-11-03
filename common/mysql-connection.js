var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'moviedb',
    insecureAuth: true
});

module.exports.connection = connection;