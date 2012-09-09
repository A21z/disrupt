function composer_bind_input(input) {
  $(input).keyup(function (event) {
    if (event.keyCode === 13) {
      include('/add_achievement/' + $(input).val());
    } else {
      include('/feed/' + $(input).val());
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

var upvotes = {};
function upVote(elt, number, id) {
  $(elt).click(function() {
    include('/actions/upVote/'+id);
    if (!upvotes[id]) {
      $(number).text(+$(number).text() + 1);
      upvotes[id] = true;
      // Big hack, please remove when going to prof
    }
  });
}

function backup(elt, user, backuper, id) {
  $(elt).click(function() {
    alert('User ' + backuper + ' is backuping achivement #' + id + 'of user ' + user);
  });
}

function didIt(elt, id) {
  $(elt).click(function() {
    include('/add_achievement/' + $(input).val());
  });
}

function chicken(elt, id) {
  $(elt).click(function() {
    include('/add_achievement/' + $(input).val());
  });
}

function goal(elt, id) {
  $(elt).click(function() {
    include('/add_achievement/' + $(input).val());
  });
}