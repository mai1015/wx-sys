/**
 * Created by michaelmai on 2016-09-01.
 */
var db = require('../services/database');

exports.getUser = function getUser(name, callback) {
    db.get(function (err, connection) {
        connection.query('SELECT * FROM `wx_user` WHERE `userName`=\'' + name + '\'', function (err, result) {
            if (err) {
                return callback(err);
            }

            console.log(result);

            if (result.length > 0) {
                console.log('id:' + result[0].id);
                callback(null, result[0]);
                connection.release();
                return;
            }
            callback(null, null);
            connection.release();
        });
    });
}

exports.createUser = function createUser(name, callback) {
    db.fixtures({tables: {
        wx_user: [{
            userName: name,
        }],
    }}, function (err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}