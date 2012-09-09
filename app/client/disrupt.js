function composer_bind_input(input) {
  $(input).keyup(function (event) {
    if (event.keyCode === 13) {
      include('/add_achievement/' + $(input).val());
    } else {
      include('/search/' + $(input).val());
    }
  });
}

function bind_username(username, password) {
  $(password).keyup(function (event) {
    if (event.keyCode === 13) {
      include('/add_user', {
        username: $(username).val(),
        password: $(password).val()
      });
    }
  });
}

function bind_login(username, password) {
  $(password).keyup(function (event) {
    if (event.keyCode === 13) {
      include('/login', {
        username: $(username).val(),
        password: $(password).val()
      });
    }
  });
}

function replace(a, b) {
  console.log(a, b);
  var elem = $(a)[0];
  elem.innerHTML = '';
  elem.appendChild(b);
}
