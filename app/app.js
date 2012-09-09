var mongodb = require('mongodb');
Db = mongodb.Db;
Server = mongodb.Server;
disruptDB = require('./server/db.js');

disruptDB.getDb(function () {
  require('./server/js.js');

  require('xml-literals').register('js');
  var SimpleHTMLDOMXMLEnvironment = require('xml-literals/simple-html-dom');
  XMLEnvironment.set(new SimpleHTMLDOMXMLEnvironment);
  require('./server/main');
});
