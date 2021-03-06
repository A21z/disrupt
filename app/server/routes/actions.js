
module.exports.upVote = function(req, res, js) {
  if (req.session.logged) {
    var user = req.session.logged;
    var achievement = req.params.achievementId;
    disruptDB.upvote_achievement(user, achievement);
  }
};

module.exports.backup = function(req, res, js) {
  var user = req.params.userId || '';
  var backuper = req.params.backuperId || '';
  var achievement = req.params.achievementId || '';

  disruptDB.backup_achievement(user, backuper, achievement);
};
