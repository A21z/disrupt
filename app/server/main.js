
require('./js.js');
var path = require('path');
var express = require('express');
var app = express();
app.use(app.router);
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res, js){
  var head = <head><title>Disrupt</title></head>;
  js.call('replace', 'head', head);
  js.dom(head);

  var button = <button>Click me!</button>;
  js.call('bind_button', button);
  var body = <body>{button}</body>;
  js.dom(body);
}.jsify());

app.listen(1337);
