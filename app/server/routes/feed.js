var search = require('./es/search.js');

module.exports = function(req, res, js) {
  var feed = <div></div>;
  
  if (req.params.search) {
    search.search(req.params.search, callback);
  } else {
    disruptDB.list_achievement(callback);
  }

  function callback(achievements) {
    var n = achievements.length;
    if (achievements.length === 0) {
      feed.appendChild(
        <div class="achievement none">
          <div class="name">{req.params.search}</div>
          <div class="subtitle">Press enter to create</div>
        </div>
      );
      js.dom(feed);
      js.call('replace', '#feed', feed);
      js.end();
    }
    achievements.forEach(function (achievement) {
      disruptDB.count_upvote(achievement._id, function(c) {
        var number = <span>{c}</span>;
        var upVote = <a class="action upVote"><i class=" icon-thumbs-up"></i>This is cool ({number})</a>;
        var didIt = <a class="action didIt"><i class=" icon-check"></i>I did it!</a>;
        var chicken = <a class="action chicken"><i class=" icon-bullhorn"></i>Chicken someone!</a>;
        var goal = <a class="action goal"><i class=" icon-heart"></i>I{"'"}d love it!</a>;
        js.call('upVote', upVote, number, achievement._id);
        js.call('didIt', didIt, achievement._id);
        js.call('chicken', chicken, achievement._id);
        js.call('goal', goal, achievement._id);

        feed.appendChild(
          <div class="achievement">
            <div class="name">{achievement.achievement}</div>
            {upVote}
            {didIt}
            {chicken}
            {goal}
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
