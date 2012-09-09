
module.exports = function(req, res, js) {
  var name = req.params.search || '';

  disruptDB.insert_achievement(name);
  js.call('include', '/feed');
};
