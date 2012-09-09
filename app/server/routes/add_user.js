
module.exports = function(req, res, js) {
  disruptDB.insert_user(req.params.username, req.params.password);
};
