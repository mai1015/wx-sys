var mysql = require('mysql');
var config = require('../config/config');

config.mysql.waitForConnections = true;
config.mysql.connectionLimit = 1;

module.exports = mysql.createPool(config.mysql).on('connection', function (connection) {
    console.log('[Connection] connected!');
});