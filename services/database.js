var mysql = require('mysql');
/**
 * Register database
 * @param app Express app
 */
exports.register = function (app) {
    var config = app.get('config');
    config.mysql.waitForConnections = true;
    config.mysql.connectionLimit = 1;

    var pool = mysql.createPool(config.mysql);
    pool.on('connection', function (connection) {
        console.log('[Connection] connected!');
    });

    app.set('db', pool);
}