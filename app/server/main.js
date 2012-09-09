
require('./js.js');
var path = require('path');
var express = require('express');
var app = express();
app.use(app.router);
app.use(express.static(__dirname + '/../client'));

app.get('/main', require('./routes/main.js').jsify());
app.get('/feed', require('./routes/feed.js').jsify());
app.get('/composer', require('./routes/composer.js').jsify());
app.get('/es/indexing', require('./routes/es/indexing.js').jsify());
app.get('/es/test', require('./routes/es/test.js').jsify());

app.listen(1337);
