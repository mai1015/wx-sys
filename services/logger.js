var log4js = require('log4js');

/**
 * Register logger
 * @param app Express app
 */
exports.register = function (app) {
    log4js.loadAppender('baev3-log');
    var config = app.get('config');

    log4js.addAppender(log4js.appenders['baev3-log'](config.logger));

    var logger = log4js.getLogger('node-log-sdk');
    logger.setLevel('debug');
    app.set('log', logger);

    app.use(log4js.connectLogger(logger, {level:'debug', format:':method :url'}));
}