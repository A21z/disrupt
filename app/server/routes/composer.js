
module.exports = function(req, res, js) {
  var composer =
    <div id="composer">
      <input type="text"></input>
    </div>;
  js.dom(composer);
  js.call('replace', '#composer', composer);
};
