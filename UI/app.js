/**
 * Module dependencies.
 */

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var http = require('http');
var path = require('path');

var routes = require('./routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}
app.use(stylus.middleware({
    src:path.join(__dirname, 'public')
    , compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(minify());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Routes
app.get('/', routes.index);
app.get('/users/32/views', routes.userViews);
app.get('/users/32/widgets', routes.userWidgets);
app.get('/users/32/sources/1/data', routes.userData);

app.get('/sampler', routes.sampler);

//Server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});