/**
 * Created by liviu.purjea on 10/15/2015.
 */

var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    MongoServer = require('mongodb').Server,
    MongoDatabase = require('mongodb').Db;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoClient = new MongoClient(new MongoServer('localhost', 27017, { 'native_parser' : true }));
var db = new MongoDatabase('course', new MongoServer('localhost', 27017, { 'native_parser' : true }));

app.get('/', function(req, res) {
    db.open(function(err, x) {
        x.collection('hello_mongo_express').findOne({}, function(err, doc) {
            res.render('Hello', doc);
        });
    });
});

app.get('*', function(req, res) {
    res.status(404).send('Page not found');
});

app.listen(8080);
console.log('listening on port 8080');
