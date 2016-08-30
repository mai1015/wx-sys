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
 * @return {Boolean} if user created
 * @public
 */
User.prototype.createUser = function createUser(name) {
    pool.getConnection(function (err, connection) {
        if (err)
            handleError(err);

        connection.query('INSERT INTO wx_user(userName) VALUES(' + name + ')', function (err, result) {
            if (err) {
                handleError(err);
                return false;
            }
            console.log(result);
            connection.release();
            return true;
        });
    });
}

/**
 * Get user id
 * @param name name of the user
 * @return {Number|Boolean} if user exist, return id. else return false
 */
User.prototype.getUserId = function getUserId(name) {
    pool.getConnection(function (err, connection) {
        if (err)
            handleError(err);

        connection.query('SELECT * FROM wx_user WHERE userName=\'' + name + '\'', function (err, result) {
            if (err) {
                handleError(err);
                return false;
            }

            console.log(result);
            connection.release();
            return result[0].id;
        });
    });
}