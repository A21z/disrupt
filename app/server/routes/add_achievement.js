
module.exports = function(req, res, js) {
  console.log('pas chicken!');

  var name = req.params.search || '';

  disruptDB.insert_achievement(name, function(saved) {
    require('./es/indexing.js').indexAchievementIncr(saved);
  });
  js.call('include', '/feed');
};

module.exports.chicken = function(req, res, js) {
  console.log('chicken!');

  var name = req.params.search || '';

  disruptDB.insert_achievement(name, function(saved) {
    require('./es/indexing.js').indexAchievementIncr(saved);
    twilio(name);
  });
  js.call('include', '/feed');
};

var twilio = function(name) {
  console.log('twilio!');

  var request = require('request');
  var options =
  {
    uri: 'https://AC8cb40268daa13d2be625d60e2840133c:4f8370c722d5eaaf47909af5857150a7@api.twilio.com/2010-04-01/Accounts/AC8cb40268daa13d2be625d60e2840133c/SMS/Messages',
    form: 'To=+1413501481&From=+1413501481&Body='+name
  };
  logger.inspect(options);
  request.get(options, function(err, res, body) {
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
