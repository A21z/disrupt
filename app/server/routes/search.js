var search = require('./es/search.js');

module.exports = function(req, res, js) {
  var results = <div></div>;

  search.search(req.params.search || '', function (res) {
    res.forEach(function (e) {
      results.appendChild(<div>{e}</div>);
    })

    js.dom(results);
    js.call('replace', '#composer_results', results);
    js.end();
  });

  return true;
};
