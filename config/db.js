/**
 * Created by mas_bk on 4/4/14.
 */
var mysql = require('mysql');
var db = {
    dev: {
        host: 'localhost',
        user: 'root',
        password: ''
    },
    prod: {
        host: 'localhost',
        user: 'root',
        password: ''
    },
    prod: {
        host: 'localhost',
        user: 'root',
        password: ''
    }
};

db.init = function () {
    if (process.env.NODE_ENV == "development") {
        this.connection = mysql.createConnection(this.dev)
    } else if (process.env.NODE_ENV == "prod") {
        this.connection = mysql.createConnection(this.prod)
    } else {
        this.connection = mysql.createConnection(this.test)
    }

};

exports.db = db;