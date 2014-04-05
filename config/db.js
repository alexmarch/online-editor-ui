/**
 * Created by mas_bk on 4/4/14.
 */
var mysql = require('mysql');
var Q = require('q');
var deffered = Q.defer();
var flash = require('./global')

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
db.q = function(query,params){
    console.log("query",err);
    this.connection.query(query,params,function(err,rows, fields){

        if(err){
            deffered.reject(new Error(err));
        }else{
            deffered.resolve(rows);
        }
        return deffered.promise;
    })
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

exports.db = db;