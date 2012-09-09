
require('./js.js');
var path = require('path');
var express = require('express');
var app = express();


app.configure(function(){
  app.set('port', process.env.PORT_NODEJS || 1337);
  app.use(express.cookieParser());
  app.use(express.session({ secret:'yodawgyo' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/../client'));
});

app.get('/', function(req, res) {
    res.sendfile('client/main.html');
});


app.get('/main', require('./routes/main.js').jsify());
app.get('/feed', require('./routes/feed.js').jsify());
app.get('/composer', require('./routes/composer.js').jsify());
app.get('/search/:search?', require('./routes/search.js').jsify());
app.get('/add_achievement/:search?', require('./routes/add_achievement.js').jsify());
app.get('/add_user/:username/:password', require('./routes/add_user.js').jsify());
app.get('/login/:username/:password', require('./routes/login.js').jsify());
app.get('/es/indexing', require('./routes/es/indexing.js').jsify());
app.get('/es/test', require('./routes/es/test.js').jsify());
app.get('/actions/upVote/:achievementId', require('./routes/actions.js').upVote.jsify());
app.get('/actions/backup/:userId/:achievementId', require('./routes/actions.js').backup.jsify());


app.listen(app.get('port'));
console.log('Server started at ' + app.get('port'));

