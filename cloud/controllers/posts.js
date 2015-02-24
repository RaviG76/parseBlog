var Post = Parse.Object.extend('Post'),
    moment = require('moment'),
    _ = require('underscore');

// Display all posts with Comments.
exports.index = function(req, res) {
  var Post = Parse.Object.extend("Post"); 
  var query = new Parse.Query(Post);
  var allPosts = [];
  query.descending("createdAt");
  query.find().then(function(posts) {
    var cb = _.after(posts.length, function(){
      res.render('posts/index', { 
        posts: allPosts,
        moment: moment
      });
    });
    _.each(posts, function(post) {
       if (post) {
          var Comment = Parse.Object.extend('Comment');
          var commentQuery = new Parse.Query(Comment);
          commentQuery.equalTo('post', post);
          commentQuery.descending('createdAt');
          commentQuery.limit(5);
          commentQuery.find().then(function(comment) { 
            allPosts.push({
              "post" : post,
              "comment": _.sortBy(comment, function(o) { return o.createdAt; })
            });
            cb();
          });
        }
    });
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};

// Display a form for creating a new post.
exports.new = function(req, res) {
  res.render('posts/new', {
    title : "New Post"
  });
};

// Create a new post
exports.create = function(req, res) {
  var post = new Post();
  var data = {
    "title" : req.body.title,
    "body" : req.body.body
  }
  post.save(data)
    .then(function() {
      res.redirect('/');
    },
    function() {
      res.send(500, 'Failed saving post');
    });
};