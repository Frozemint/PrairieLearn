var ERR = require('async-stacktrace');
var _ = require('underscore');
var path = require('path');
var logger = require('../logger');
var sqldb = require('../sqldb');
var sqlLoader = require('../sql-loader');

var sql = sqlLoader.load(path.join(__dirname, 'courseList.sql'));

module.exports = function(req, res, next) {
    var params = [req.authUID];
    sqldb.query(sql.all, params, function(err, result) {
        if (ERR(err, next)) return;
        req.locals = _.extend({
            courseList: result.rows,
        }, req.locals);
        next();
    });
};
