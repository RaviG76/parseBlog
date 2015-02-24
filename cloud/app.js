var express = require('express');

// Controller code in separate files.
var postsController = require('cloud/controllers/posts.js');
var commentsController = require('cloud/controllers/comments.js');

var app = express();

// Global app configuration section
app.set('views', 'cloud/views');
app.set('view engine', 'ejs'); 
app.use(express.bodyParser());
app.use(express.methodOverride());

// Show all posts on homepage
app.get('/', postsController.index);

// RESTful routes for the blog post object.
app.get('/posts/new', postsController.new);
app.post('/posts', postsController.create);
app.post('/posts/comments', commentsController.create);

// Required for initializing Express app in Cloud Code.
app.listen();
