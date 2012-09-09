
var get_results = function (search, callback) {
  callback(search.split(''));
}

module.exports = function(req, res, js) {
  var results = <div></div>;

  get_results(req.params.search || '', function (res) {
    res.forEach(function (e) {
      results.appendChild(<div>{e}</div>);
    })

    js.dom(results);
    js.call('replace', '#composer_results', results);
    js.end();
  });

  return true;
};
