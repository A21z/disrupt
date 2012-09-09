var logger = require('../../utils/logger.js');
var request = require('request');

module.exports = function(req, res, js) {
  disruptDB.list_achievement(function(achievements) {
    createIndex(function() {
      indexAchievementFull(achievements);
    });
  })
};

var indexAchievementFull = function(achievements) {
  achievements.forEach(function(o) {

    var struct = {};
    struct.name = o.achievement;

    var opt =
    {
      uri: 'http://fooo.fr:9200/achievements/achievement/' + o._id,
      body: JSON.stringify(struct)
    };
    logger.debug('Indexing achievement #' + o._id);
    logger.inspect(opt);
    request.put(opt, function(err, res, body) {
      logger.inspect('Error: ' + err);
      logger.inspect('Response: ' + res);
      logger.inspect('Body: ' + body);
    });
  });
}

module.exports.indexAchievementIncr = function(achievement) {
  var struct = {};
  struct.name = achievement.achievement;

  var opt =
  {
    uri: 'http://fooo.fr:9200/achievements/achievement/' + achievement._id,
    body: JSON.stringify(struct)
  };
  logger.debug('Indexing achievement #' + achievement._id);
  logger.inspect(opt);
  request.put(opt, function(err, res, body) {
    logger.inspect('Error: ' + err);
    logger.inspect('Response: ' + res);
    logger.inspect('Body: ' + body);
  });
}

var createIndex = function(callback) {
  // Delete existing index
  var opt = {
    uri: 'http://fooo.fr:9200/achievements/'
  };
  request.del(opt, function(err, res, body) {
    logger.inspect('Error: ' + err);
    logger.inspect('Response: ' + res);
    logger.inspect('Body: ' + body);

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
      callback();
    });
  });
}
