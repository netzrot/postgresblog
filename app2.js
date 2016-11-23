var Sequelize = require('sequelize');
var databaseURL = 'sqlite://dev.sqlite3'; //creates the db-file for me
var sequelize = new Sequelize(databaseURL); // lines to connect to local sql database;

var Post = sequelize.define('Post', { // should go in separate js file 
	title: Sequelize.STRING,
	body: Sequelize.TEXT
})


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
app.use(bodyParser.json());


app.get('/post.json', function(req, res) { // post.json is the route name
	
	Post.findAll().then(function(posts) {
		res.json(posts); // data is given as json
	})
})


app.get('/post', function(req, res) { // post.json is the route name
	
	Post.findAll().then(function(posts) {
		res.render("blog", {"hats": hats}); // "hats" = property; just hats would be an array and ejs needs an object, thats why array is bundled up in an object
	})
})


app.post('/post', function(req, res) {

	
		/*var data = {
			title: "Second Post",
			body: "This is the second post"
		};*/

	Post.create(req.body).then(function() {
		res.redirect("/posts");
	});

});


sequelize.sync().then(function() {
	console.log("Synced");

	app.listen(3000, function() {
		console.log("Server started on port 3000");
	})
})



