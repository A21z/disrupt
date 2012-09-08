
module.exports = function(req, res, js) {
  var feed = <div id="feed"></div>;
  for (var i = 0; i < 30; ++i) {
    var name = 'vjeux' + ~~(Math.random() * 100);
    feed.appendChild(<div>{name}</div>);
  }
  js.dom(feed);
  js.call('replace', '#feed', feed);
};
