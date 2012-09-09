var logger = require('../../utils/logger.js');
var request = require('request');

module.exports = function(req, res, js) {
  logger.debug('Indexing...');
  var achievement = {};
  achievement.id = 1;
  achievement.name = 'I hacked all night long';
  indexAchievement(achievement);
};

var indexAchievement = function(achievement) {
  var opt =
  {
    uri: 'http://fooo.fr:9200/achievements/achievement/' + achievement.id,
    body: JSON.stringify(achievement)
  };
  logger.debug('Indexing achievement #' + achievement.id);
  request.put(opt);
}
