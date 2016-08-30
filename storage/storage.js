var mysql = require('mysql');
var config = require('../config/config');

config.mysql.waitForConnections = true;
config.mysql.connectionLimit = 1;
var pool = mysql.createConnection(config.mysql);

pool.on('connection', function (connection) {
    console.log('[Connection] connected!');
});

module.exports = pool;