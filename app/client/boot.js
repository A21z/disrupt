function include(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.head.appendChild(script);
}

js_call = function (dom, calls) {
  var all = document.createElement('div');
  dom.forEach(function (element) {
    var div = document.createElement('div');
    div.innerHTML = element;
    all.appendChild(div);
  });


  calls.forEach(function (call) {
    var name = call[0];
    var args = call[1].map(function (e) {
      if (e.hasOwnProperty('__node')) {
        return all.querySelector('#' + e.__node);
      }
      return e;
    });

    console.log(name, args);

    if (!window.hasOwnProperty(name)) {
      throw 'Undefined function `' + name + '`';
    }
    window[name].apply(this, args);
  });
};
