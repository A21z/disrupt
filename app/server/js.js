function JS(res) {
  this.res = res;
  this.calls = [];
  this.doms = [];
}

JS.unique_id = 0;
JS.get_unique_id = function () {
  return 'elem' + (++JS.unique_id);
};

JS.prototype.dom = function (dom) {
  this.doms.push(dom);
};

JS.prototype.call = function (name) {
  var args = Array.prototype.slice.call(arguments, 1)
    .map(function (a) {
      if (XMLEnvironment.get().isNode(a)) {
        if (!a.getAttribute('id')) {
          a.setAttribute('id', JS.get_unique_id());
        }
        return {'__node': a.getAttribute('id')};
      }
      return a;
    });
  this.calls.push([name, args]);
};

JS.prototype.end = function(res) {
  this.res.writeHead(200, {'Content-Type': 'text/html'});
  this.res.end('js_call(' +
    JSON.stringify(this.doms.map(function (e) { return e.toString(); })) + ', ' +
    JSON.stringify(this.calls) +
  ');');
};

Function.prototype.jsify = function() {
  var f = this;
  return function (req, res) {
    var js = new JS(res);
    if (!f(req, res, js)) {
      js.end();
    }
  };
}

module.exports = JS;
