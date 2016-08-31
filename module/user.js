
module.exports = User;

function User(app) {
    this.app = app;
}

/**
 * Create new user
 * @param name name of the user
 * @param cb
 */
User.prototype.createUser = function createUser(name, cb) {
    var db = app.get('db');
    db.getConnection(function (err, connection) {
        if (err) {
            return cb(err);
        }

        connection.query('INSERT INTO `wx_user`(`userName`) VALUES (\'' + name + '\')', function (err, result) {
            if (err)
                return cb(err);

            cb(null, result.insertId);
            connection.release();
            return;
        });
    });
}

/**
 * Get user id
 * @param {string} name of the user
 * @return {Number|Boolean} if user exist, return id. else return false
 */
User.prototype.getUserId = function getUserId(name, cb) {
    var db = app.get('db');
    db.getConnection(function (err, connection) {
        if (err) {
            return cb(err);
        }

        connection.query('SELECT * FROM `wx_user` WHERE `userName`=\'' + name + '\'', function (err, result) {
            if (err) {
                return cb(err);
            }

            console.log(result);

            if (result.length > 0) {
                console.log('id:' + result[0].id);
                cb(null, result[0].id);
                connection.release();
                return;
            }
        });
    });
}