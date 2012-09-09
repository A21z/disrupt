
require('./js.js');
var path = require('path');
var express = require('express');
var app = express();

app.use(app.router);
app.use(express.static(__dirname + '/../client'));

app.get('/main', require('./routes/main.js').jsify());
app.get('/feed', require('./routes/feed.js').jsify());
app.get('/composer', require('./routes/composer.js').jsify());
app.get('/search/:search?', require('./routes/search.js').jsify());
app.get('/add_achievement/:search?', require('./routes/add_achievement.js').jsify());
app.get('/es/indexing', require('./routes/es/indexing.js').jsify());
app.get('/es/test', require('./routes/es/test.js').jsify());

app.listen(1337);
console.log('Server started at :1337');
