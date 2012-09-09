
module.exports.upVote = function(req, res, js) {
  var name = req.params.search || '';

  disruptDB.insert_achievement(name, function(saved) {
    require('./es/indexing.js').indexAchievementIncr(saved);
  });
  js.call('include', '/feed');
};

module.exports.backup = function(req, res, js) {
  var name = req.params.search || '';

  disruptDB.insert_achievement(name, function(saved) {
    require('./es/indexing.js').indexAchievementIncr(saved);
  });
  js.call('include', '/feed');
};
