var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var engines = require('consolidate')
var handlebars = require('handlebars');
var bibtexParse = require('bibtex-parse-js');

var env = process.env.NODE_ENV || 'development';
var config = require('./etc/config')[env];

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + config.database.user + ':' + config.database.pass + '@' + config.database.host + ':' + config.database.port + '/' + config.database.db + '?authSource=admin';
var dbName = 'unboundedpress';
var assert = require('assert');

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
  var pubdata = fs.readFileSync( path.join(__dirname, 'public/bibtex/bibtex.bib'), 'utf8');
  var pubs = bibtexParse.toJSON(pubdata);
  //pubs.sort(function(a, b){return a.entryTags.year-b.EntryTags.year})

  // Create the collection
  db.collection('publications').remove();
  db.collection('publications').insert(pubs);

  // The connection is kept open here. The client could connect to the db on every call (in the routes as well)
  // Perhaps a TODO
  //client.close();
});

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("view options", { layout: true });
app.engine('.template', engines.handlebars);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', routes);

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
