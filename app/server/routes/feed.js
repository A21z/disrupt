
module.exports = function(req, res, js) {
  var feed = <div></div>;

  disruptDB.list_achievement(function (achievements) {
    achievements.forEach(function (achievement) {
      feed.appendChild(<div>{achievement.achievement}</div>);
    });

    js.dom(feed);
    js.call('replace', '#feed', feed);
    js.end();
  });

  return true;
};
