var logger = require('../../utils/logger.js');
var request = require('request');

module.exports = function(req, res, js) {
  logger.debug('Test');
  var search = require('./search.js');
  search.search('hack', function(results) {
    logger.inspect(results);
    logger.debug('end.');
  });
};
