var express = require('./config/express');
var mongodb = require('./config/mongoose');

var db = mongodb();
var app = express();


module.exports = app;