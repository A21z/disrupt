/*
     Modules requirements
*/

// Express modules requirements
var express = require('express')
  , http = require('http')
  , path = require('path');


var tools = require('./tools.js');
var _ = require('underscore');
var io = require('socket.io');


// Some tweakering to get ot to work with Express 3 
var app = express();
var server = http.createServer(app);
var io = io.listen(server);
io.set('log level', 1); 

/*
     Express configuration and route(s)
*/

// Basic Express configuration
app.configure(function(){
  app.set('port', process.env.WWW_PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Main route to deliver the static html
app.get('/',function(req, res){
  res.render('index');
});

/* 
    Socket.IO 's logic
*/
// callback for websocket disconnetion
var disconnetion = function() {
  var socket = this;

  tools.log("Lost connection: " + socket.id);
};

// callback for new websocket connection
var connection = function(socket){
  tools.log("new connection: " + socket.id);
  // bind move event
  //socket.on('move', move);

  // bind disconnect event
  socket.on('disconnect', disconnetion);
};

// bind new connection event
io.sockets.on('connection', connection);

// Let's start the server
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
