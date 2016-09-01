var mysql = require('mysql'),
    async = require('async');

var static = {
    pool : null
}


exports.connect = function connect(config, done) {
    config.waitForConnections = true;
    config.connectionLimit = 1;
    static.pool = mysql.createPool(config);
    static.pool.on('connection', function (connection) {
        console.log('[Connection] connected!');
    });

    done();
}

exports.get = function get(done) {
    var pool = static.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    pool.getConnection(function (err, connection) {
        if (err) return done(err);
        return done(null, connection);
    });
}

exports.fixtures = function(data, done) {
    var pool = static.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var names = Object.keys(data.tables);
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            var keys = Object.keys(row)
                , values = keys.map(function(key) { return "'" + row[key] + "'" })

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb);
    }, done);
}

exports.drop = function(tables, done) {
    var pool = static.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb);
    }, done);
}

/*
var mysql = require('mysql');
/!**
 * Register database
 * @param app Express app
 *!/
exports.register = function (app) {
    var config = app.get('config');
    config.mysql.waitForConnections = true;
    config.mysql.connectionLimit = 1;

    var pool = mysql.createPool(config.mysql);
    pool.on('connection', function (connection) {
        console.log('[Connection] connected!');
    });

    app.set('db', pool);
}*/
