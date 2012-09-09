var logger = require('../utils/logger.js');

module.exports = function(req, res, js) {

  var name = req.params.search || '';

  disruptDB.insert_achievement(name, function(saved) {
    require('./es/indexing.js').indexAchievementIncr(saved);
    js.call('include', '/feed/' + name);
    js.end();
  });
  return true;
};

module.exports.chicken = function(req, res, js) {
  var id = req.params.achievementId;
  var elem_id = req.params.elemId;
  disruptDB.get_achievement_from_id(id, function(achievement) {
    twilio(achievement.achievement);
  });

  var text = <span>Chickened!</span>;
  js.dom(text);
  js.call('replace', '#' + elem_id, text);
};

var twilio = function(name) {

  var request = require('request');
  
  var options =
  {
    uri: 'https://AC8cb40268daa13d2be625d60e2840133c:4f8370c722d5eaaf47909af5857150a7@api.twilio.com/2010-04-01/Accounts/AC8cb40268daa13d2be625d60e2840133c/SMS/Messages',
    form: {'From': '+14158304379', 'To': '+16504929469', 'Body': name}
  };
  logger.inspect(options);
  request.post(options, function(err, res, body) {
    logger.inspect('Error: ' + err);
    logger.inspect('Response: ' + res);
    logger.inspect('Body: ' + body);
  });
  /*curl -X POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SMS/Messages \ 
  --data-urlencode "To=+14155551212" \ 
  --data-urlencode "From=+14158675309" \ 
  --data-urlencode "Body="Hello world!" \ 
  -u {AccountSid}:{AuthToken}*/
}
