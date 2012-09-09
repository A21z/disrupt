var logger = require('../../utils/logger.js');
var request = require('request');

var esAchievementSearch = function(input, callback) {
  var q = {};
  q.query = {};
  q.query.prefix = {};
  q.query.prefix.name = input;
  var options =
  {
    uri: 'http://fooo.fr:9200/achievements/achievement/_search',
    body: JSON.stringify(q)
  };
  logger.inspect(options);
  request.get(options, function requestCallback(error, response, body) {
    if (!response || response.statusCode !== 200) {
      logger.debug('Error calling elasticsearch')
      logger.debug('Status code: ' + response.statusCode);
      return;
    }
    var parsedBody = JSON.parse(body);
    var results = [];
    parsedBody.hits.hits.forEach(function(o) {
      results.push(o._source.name);
    });
    callback(results);
  });
}

module.exports.search = function(input, callback) {
  esAchievementSearch(input, function(results) {
    callback(results);
  });
};
