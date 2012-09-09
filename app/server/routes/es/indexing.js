var logger = require('../../utils/logger.js');
var request = require('request');

module.exports = function(req, res, js) {
  var achievement = {};
  achievement.id = 1;
  achievement.name = 'I hacked all night long';
  indexAchievement(achievement);
};

var indexAchievement = function(achievement) {
  // Delete existing index
  var opt = {
    uri: 'http://fooo.fr:9200/achievements/'
  };
  request.del(opt, function(err, res, body) {
    logger.inspect('Error: ' + err);
    logger.inspect('Response: ' + res);
    logger.inspect('Body: ' + body);
  });

  // Create index + mapping
  var mapping = JSON.parse(require('fs').readFileSync('../elasticsearch/mapping.json'));
  //var index = require('fs').readFileSync('../elasticsearch/elasticsearch.yml', 'utf8');
  var config = {};
  //config.index = index;
  config.mappings = mapping;
  config = JSON.stringify(config);
  logger.inspect(config);
  opt =
  {
    uri: 'http://fooo.fr:9200/achievements/',
    body: config
  };
  logger.debug('Creating index achievements...');
  request.put(opt, function(err, res, body) {
    logger.inspect('Error: ' + err);
    logger.inspect('Response: ' + res);
    logger.inspect('Body: ' + body);

    // Index data
    var opt =
    {
      uri: 'http://fooo.fr:9200/achievements/achievement/' + achievement.id,
      body: JSON.stringify(achievement)
    };
    logger.debug('Indexing achievement #' + achievement.id);
    request.put(opt);
  });

  
}
