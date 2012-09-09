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
    if (achievements.length === 0) {
      js.dom(feed);
      js.call('replace', '#feed', feed);
      js.end();
    }
    achievements.forEach(function (achievement) {
      disruptDB.count_upvote(achievement._id, function(c) {
        var number = <span>{c}</span>;
        var upVote = <a class="action upVote">This is cool ({number})</a>;
        var didIt = <a class="action didIt">I did it!</a>;
        var chicken = <a class="action chicken">Chicken someone!</a>;
        var goal = <a class="action goal">I{"'"}d love it!</a>;
        js.call('upVote', upVote, number, achievement.achievement);
        js.call('didIt', didIt, achievement.achievement);
        js.call('chicken', chicken, achievement.achievement);
        js.call('goal', goal, achievement.achievement);
        feed.appendChild(
          <div class="achievement">
            <div class="name">{achievement.achievement}</div>
            {upVote} | 
            {didIt} | 
            {chicken} | 
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
