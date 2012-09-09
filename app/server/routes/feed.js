
module.exports = function(req, res, js) {
  var feed = <div></div>;

  disruptDB.list_achievement(function (achievements) {
    achievements.forEach(function (achievement) {
      var nbVote = 0;
      var upVote = <div class="action upVote">This is cool ({nbVote})</div>;
      //var backup = <div class="action backup">This is legit</div>;
      console.log(req.session.logged);
      if (req.session.logged) {
        var backuper = req.session.logged;
        var user = req.session.logged;
        //var achievementOwner = ?;
        js.call('upVote', upVote, user, achievement._id);
        //js.call('backup', backup, achievementOwner, backuper, achievement._id);
      }
      feed.appendChild(
        <div class="achievement">
          <div class="name">{achievement.achievement}</div>
          {upVote} 
        </div>
      );
    });

    js.dom(feed);
    js.call('replace', '#feed', feed);
    js.end();
  });

  return true;
};
