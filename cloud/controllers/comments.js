var Comment = Parse.Object.extend('Comment');

// Create a new comment.
exports.create = function(req, res) {
  var comment = new Comment();
  var Post = Parse.Object.extend('Post');
  var post = new Post();
  post.id = req.body.post_id;
  comment.set('post', post);
  var data = {
    "comment":req.body.comment
  };
  comment.save(data).then(function() {
    res.redirect('/');
  },
  function() {
    res.send(500, 'Failed saving comment');
  });
};