var mongoose = require('mongoose');

var state = {
    db: null,
}

function getURI(config) {
    var str = 'mongodb://';
    if (config.user)
        str = str + config.user + ':' + config.passwd + '@';

    if (config.host)
        str = str + config.host;
    else
        str = str + 'localhost';

    if (config.port)
        str = str + ':' + config.port;

    str = str + '/' + config.database;

    return str;
}

exports.connect = function(config, done) {
    if (state.db) return done();

    mongoose.connect(getURI(config), {server:{auto_reconnect:true}});
    var db = mongoose.connection;

    //db.on('error', console.error.bind(console, 'connection error:'));

    db.on('error', function (err) {
        console.log(err.message);
        mongoose.disconnect();
    });
    db.on('close', function () {
        mongoose.connect(config, {server:{auto_reconnect:true}});
    });
    db.once('open', function() {
        console.log('Mongodb connected');
    });
}

exports.get = function() {
    return state.db;
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function (err) {
            state.db = null;
            done(err);
        });
    }
}

/*
var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

exports.connect = function(url, done) {
    if (state.db) return done();

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err);
        state.db = db;
        done();
    })
}

exports.get = function() {
    return state.db;
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}*/
