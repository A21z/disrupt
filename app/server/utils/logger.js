// Some useful modules
var util = require('util');

/*
    A wrapper function arround console.log to get a much nicer output
  
  console.log does nothing exiting but a toString().
  util.inspect is a wonderfull tool, it had type highlighting.
  hidden to true will show hidden attributes
  level set the level of recursion
*/
exports.inspect = function(obj, hidden, level) {
  var l = level ? level : 1;
  var h = hidden ? hidden : false;

  util.debug(util.inspect(obj, false, level, true));
}

exports.error = function(s) {
  util.error(s);
}

exports.debug = function(s) {
  util.debug(s);
}