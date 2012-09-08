function bind_button(button) {
  $(button).click(function () {
    alert('clicked');
  });
}

function replace(a, b) {
  console.log(a, b);
  $(a).replaceWith(b);
}
