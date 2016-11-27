// install sequelize
// package json: npm init
// require
// connect to database
// initialize sequelize with database url
// set up initial table
// then sync
// add, retrieve, etc.
// schema in sqlite3 shows what it's doing behind the scenes

var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser'); // plugin; standard to make sure youre able to use body parser and be able to use post requests
var path = require("path");
var port = process.env.PORT || 3000;

var sequelize = new Sequelize(process.env.DATABASE_URL); 


var Post = sequelize.define('Post', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT,
	date: Sequelize.DATE

})

var app = express();
app.set('view engine', 'ejs'); // tells express to use a "view" folder

app.use(express.static("public")); // tells express to use static folder called "public"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/posts.json', function(req, res) {

	Post.findAll().then(function(posts) {
 		res.json(posts);
	});

});


// route to accept input by author

app.post('/posts', function(req, res) {
	
	var newTitle = req.body.title;

	var newBody = req.body.body;

	var newDate = new Date();

	var newPost = {
		title: newTitle,
		body: newBody,
		date: newDate 
	}

	Post.create(newPost).then(function() {
		res.redirect("/posts");
	});	

});

// create a list of posts

app.get('/posts', function(req, res) { 
	Post.findAll().then(function(posts) {
 		res.render("blog", {posts: posts});
	});
});

// always required at bottom of the page:

sequelize.sync().then(function() {
	console.log("Synced");

	app.listen(app.get('port'), function() {
  	console.log('Node app is running on port', app.get('port'));
	});
});

