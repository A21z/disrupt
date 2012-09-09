function composer_bind_input(input) {
  $(input).keyup(function () {
    include('/search/' + $(input).val());
  });
}

function replace(a, b) {
  console.log(a, b);
  var elem = $(a)[0];
  elem.innerHTML = '';
  elem.appendChild(b);
}
