
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user').user;
var sessions = require('./routes/sessions').sessions;
var db = require('./config/db');
var http = require('http');
var path = require('path');
var app = express();
var helpers = require('./helpers/helpers');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(helpers(app));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

db.init();

app.get('/', routes.index);
app.get('/signup', sessions.signup);
app.post('/signup', user.create);
app.get('/signin', sessions.signin);
app.post('/signin', sessions.new);
app.get('/logout', sessions.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
