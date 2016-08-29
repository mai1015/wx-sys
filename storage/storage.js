var mysql = require('mysql');
var config = require('../config/config');

exports.connect = function connect() {
    // TODO: CONNECT DATABASE
    exports.connection = mysql.createConnection(config.mysql);
    exports.connection.connect();
}