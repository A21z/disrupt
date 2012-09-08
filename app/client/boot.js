function include(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
}
include('/');

js_call = function (dom, calls) {
  dom.forEach(function (element) {
    var div = document.createElement('div');
    div.innerHTML = element;
    document.body.appendChild(div);
  });

  calls.forEach(function (call) {
    var name = call[0];
    var args = call[1].map(function (e) {
      if (e.hasOwnProperty('__node')) {
        return document.getElementById(e.__node);
      }
      return e;
    });

    if (!window.hasOwnProperty(name)) {
      throw 'Undefined function `' + name + '`';
    }
    window[name].apply(this, args);
  });
};
