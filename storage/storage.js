var mysql = require('mysql');
var config = require('../config/config');

config.mysql.waitForConnections = true;
config.mysql.connectionLimit = 1;

var pool = mysql.createPool(config.mysql);

pool.on('connection', function (connection) {
    console.log('[Connection] connected!');
});

exports.query = function query(sql, cb) {
    pool.getConnection(function (err, connection) {
        function end(err, connections) {
            process.nextTick(cb, err, connections);
        }

        if (err) {
            return end(err);
        }

        connection.query(sql, function (err, result) {
            if (err)
                return end(err);

            end(null, result);
            connection.release();
        });
    });
}