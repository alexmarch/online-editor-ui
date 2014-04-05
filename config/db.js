/**
 * Created by mas_bk on 4/4/14.
 */
var mysql = require('mysql');
var Q = require('q');

var flash = require('./global')

var db = {
    dev: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'app_development'
    },
    prod: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'app_prod'
    },
    test: {
        host: 'localhost',
        user: 'root',
        password: '',
        data: 'app_test'
    }
};
db.q = function (query, params) {
    var deffered = Q.defer();
    this.connection.query(query, params, function (err, result) {
        if (err) {
            deffered.reject(new Error(err));
            console.log("erro", err);
        } else {
            deffered.resolve(result);
        }
    });
    return deffered.promise;
}
db.init = function () {
    if (process.env.NODE_ENV == "development") {
        this.connection = mysql.createConnection(this.dev)

    } else if (process.env.NODE_ENV == "prod") {
        this.connection = mysql.createConnection(this.prod)
    } else {
        this.connection = mysql.createConnection(this.test)
    }

};

module.exports = db;
