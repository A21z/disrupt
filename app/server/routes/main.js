
module.exports = function(req, res, js){

  var login_message = <div id="login_message"></div>;
  var composer = <div id="composer"></div>;
  var header = <div id="header"><h1><i class="icon-check"></i>Achieved</h1>{composer}</div>;
  var feed = <div id="feed"></div>;
  var register_username = <input type="text"></input>;
  var register_password = <input type="password"></input>;
  var login_username = <input type="text"></input>;

  var login_password = <input type="password"></input>;

  var footer_left = 
    <ul>
      <li>Register:</li>
      <li>{register_username}</li>
      <li>{register_password}</li>
    </ul>;

  var footer_right =
    <ul>
      <li>Login:</li>
      <li>{login_username}</li>
      <li>{login_password}</li>
      <li>{login_message}</li>
    </ul>;

  var footer =
    <div id="footer">
      <div class="left">{footer_left}</div>
      <div class="right">{footer_right}</div>
    </div>;

  var body =
    <div>
      {header}
      {feed}
      {footer}
    </div>;

  js.dom(body);

  js.call('bind_username', register_username, register_password);
  js.call('bind_login', login_username, login_password);
  js.call('replace', 'body', body);
  js.call('include', '/composer');
  js.call('include', '/feed/');
};
