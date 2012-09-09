
require('./js.js');
var path = require('path');
var express = require('express');
var app = express();

var client = new Db('disrupt', new Server('127.0.0.1', 27017, {}));

client.open(function (err, p_client) {
  app.use(app.router);
  app.use(express.static(__dirname + '/../client'));

  app.get('/main', require('./routes/main.js').jsify());
  app.get('/feed', require('./routes/feed.js').jsify());
  app.get('/composer', require('./routes/composer.js').jsify());
  app.get('/search/:search?', require('./routes/search.js').jsify());

  app.listen(1337);
  console.log('Server started at :1337');
});
