
module.exports = function(req, res, js){
  var composer = <div id="composer"></div>;
  var feed = <div id="feed"></div>;
  var body = <div>{composer}{feed}</div>;
  js.dom(body);

  js.call('replace', 'body', body);
  js.call('include', '/composer');
  js.call('include', '/feed');
};
