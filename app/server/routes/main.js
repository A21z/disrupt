
module.exports = function(req, res, js){

  var login_message = <div id="login_message"></div>;
  var composer = <div id="composer"></div>;
  var header = <div id="header"><h1><i class="icon-check"></i>Achieved</h1>{composer}</div>;
  var feed = <div id="feed"></div>;
  var register_username = <input type="text"></input>;
  var register_password = <input type="password"></input>;
  var login_username = <input type="text"></input>;

  var login_password = <input type="password"></input>;

  var body = <div>{header}{feed} Register: {register_username}{register_password}<p>Login: {login_username}{login_password}</p>{login_message}</div>;
  js.dom(body);

  js.call('bind_username', register_username, register_password);
  js.call('bind_login', login_username, login_password);
  js.call('replace', 'body', body);
  js.call('include', '/composer');
  js.call('include', '/feed/');
};
