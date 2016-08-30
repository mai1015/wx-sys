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
User.createUser = function createUser(name) {
    pool.query('INSERT INTO wx_user(userName) VALUES(' + name + ')', function (err, result) {
        if (err) {
            handleError(err);
            return false;
        }
        console.log(result);
        return true;
    });
    return false;
}

/**
 * Get user id
 * @param {string} name of the user
 * @return {Number|Boolean} if user exist, return id. else return false
 */
User.getUserId = function getUserId(name) {
    pool.query('SELECT * FROM wx_user WHERE userName=\'' + name + '\'', function (err, result) {
        if (err) {
            handleError(err);
            return false;
        }

        console.log(result);

        return result ? result[0].id : false;
    });
    return false;
}