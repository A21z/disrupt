
module.exports = function(req, res, js) {
  var feed = <div></div>;

  disruptDB.list_achievement(function (achievements) {
    achievements.forEach(function (achievement) {
      var upVote = <div class="action upVote">This is cool</div>;
      var backup = <div class="action backup">This is legit</div>;
      console.log(req.session.logged);
      if (req.session.logged) {
        var user = req.session.logged;
        js.call('upVote', upVote, user, achievement._id);
        js.call('backup', backup, user, achievement._id);
      }
      feed.appendChild(
        <div class="achievement">
          <div class="name">{achievement.achievement}</div>
          {upVote}
          {backup}
        </div>
      );
    });

    js.dom(feed);
    js.call('replace', '#feed', feed);
    js.end();
  });

  return true;
};
