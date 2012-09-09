var search = require('./es/search.js');

module.exports = function(req, res, js) {
  var feed = <div></div>;
  
  if (req.params.search) {
    console.log(req.params.search);
    search.search(req.params.search, callback);
  } else {
    disruptDB.list_achievement(callback);
  }

  function callback(achievements) {
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

  }

  return true;
};
