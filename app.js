var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var wechat = require('./routes/wechat');

var app = express();

var config;
// config
if (app.get('env') === 'development') {
    config = require('./config/config.dev');
} else {
    config = require('./config/config');
}
app.set('config', config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//session
var mongo = require('./services/mongodb');
mongo.connect(config.mongodb);
var mongoose = require('mongoose');
app.use(session({
    secret: 'mai1015wx',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/wechat', wechat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//require('./services/database');
var db = require('./services/database');
db.connect(app.get('config').mysql, function () {
    console.log('Successfully connect to mysql ');
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
