
module.exports = function(req, res, js){
  js.dom(<div id="composer"></div>);
  js.call('include', '/composer');

  js.dom(<div id="feed"></div>);
  js.call('include', '/feed');
};
