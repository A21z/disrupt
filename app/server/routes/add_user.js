
module.exports = function(req, res, js) {
  disruptDB.insert_user(req.param('username'), req.param('password'));
};
