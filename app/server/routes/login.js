
module.exports = function(req, res, js) {
  disruptDB.user_login(req.params.username, req.params.password, function(logged) {
    if (logged) {
      var div = <div>You are now logged</div>;
      req.session.logged = logged;
    } else {
      var div = <div>Try again{Math.random()}</div>;
    }
    js.dom(div);
    js.call('replace', "#login_message", div);
    js.end();
  });
  return true;
};
