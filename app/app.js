var mongodb = require('mongodb');
Db = mongodb.Db;
Server = mongodb.Server;
ObjectId = mongodb.ObjectID;
disruptDB = require('./server/db.js');

disruptDB.getDb(function () {
  require('./server/js.js');

  require('xml-literals').register('js');
  var SimpleHTMLDOMXMLEnvironment = require('xml-literals/simple-html-dom');
  XMLEnvironment.set(new SimpleHTMLDOMXMLEnvironment);
  require('./server/main');
});

console.log();
if (require('os').platform() != 'win32' && typeof process != 'undefined') {
  process.on('SIGINT', function() {
    console.log('Quit');
    disruptDB.close();
    process.exit(0);
  });
}
