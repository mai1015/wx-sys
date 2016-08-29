var mysql = require('mysql');
var config = require('../config/config');

exports.connect = function () {
    // TODO: CONNECT DATABASE
    mysql.createConnection(config.mysql);
}