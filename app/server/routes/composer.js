
module.exports = function(req, res, js) {
  var input = <input type="text" placeholder="Achieve something"></input>;
  js.call('composer_bind_input', input);

  var composer = 
    <div>
      {input}
      <div id="composer_results"></div>
    </div>;

  js.dom(composer);
  js.call('replace', '#composer', composer);
};
