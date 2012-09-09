
module.exports = function(req, res, js) {
  var feed = <div></div>;

  disruptDB.list_achievement(function (achievements) {
    var n = achievements.length;
    achievements.forEach(function (achievement) {
      disruptDB.count_upvote(achievement._id, function(c) {
        var upVote = <div class="action upVote">This is cool ({c})</div>;
        js.call('upVote', upVote, achievement._id);
        feed.appendChild(
          <div class="achievement">
            <div class="name">{achievement.achievement}</div>
            {upVote} 
          </div>
        );

        if (--n === 0) {
          js.dom(feed);
          js.call('replace', '#feed', feed);
          js.end();
        }
      });
    });

  });

  return true;
};
