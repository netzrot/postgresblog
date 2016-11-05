var express = require('express');
var app = express();

var port = 3000;

var path = require("path");



var blogPosts = [];

var bodyParser = require('body-parser'); // plugin; standard to make sure youre able to use body parser and be able to use post requests
app.use(
	bodyParser.urlencoded({ extended: true })
);
app.use(express.static("public")); // tell express to use static folder called "public"
app.set('view engine', 'ejs'); // tell express to use a "view" folder
app.set('views', path.join(__dirname, './views')); // to tell express where the file is





// route to accept input by author

app.post('/blog', function(req, res) {
	
	var newTitle = req.body.title;

	var newBody = req.body.body;

	var newDate = new Date();

	var newPost = {
		title: newTitle,
		body: newBody,
		date: newDate
	}

	blogPosts.push(newPost);
	console.log(blogPosts); // print out array to have a log

	res.redirect('/blog'); // sends back to the empty form; to blank the form each time, go from one route to another
});


// create a list of posts

app.get('/blog', function(req, res) { // blog is the route
	res.render('blog', { blogPosts }); // data that gets rendered 'blog' = name of the ejs file
});

app.get('/blogview', function(req, res) { // blog is the route
	res.render('blogview', { blogPosts }); // data that gets rendered 'blog' = name of the ejs file
});

// always required at bottom of the page:

app.listen(port, function() {
	console.log("Express started on port" + port);
}); 