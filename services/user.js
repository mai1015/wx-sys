var pool = require('../storage/storage');

module.exports = User;
function User() {
}
function handleError(err) {
    console.log('Error:' + err.message);
}
/**
 * Create a new user.
 * @param {string} user id
 * @return {Boolean|Number} if user created
 * @public
 */
User.createUser = function createUser(name, cb) {
    pool.query('INSERT INTO `wx_user`(`userName`) VALUES (\'' + name + '\')', function (err, result) {
        if (err) {
            handleError(err);
            return cb(err);
        }
        console.log(result);
        return cb(null, result.insertId);
    });
    return false;
}

/**
 * Get user id
 * @param {string} name of the user
 * @return {Number|Boolean} if user exist, return id. else return false
 */
User.getUserId = function getUserId(name, cb) {
    pool.query('SELECT * FROM `wx_user` WHERE `userName`=\'' + name + '\'', function (err, rows) {
        if (err) {
            handleError(err);
            cb(id);
        }

        console.log(rows);

        if (rows.length > 0) {
            console.log('id:' + rows[0].id);
            return rows[0].id;
            cb(null, id);
        }
    });
}