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
var databaseURL = 'sqlite://dev.sqlite3'; //creates the db-file for me
var sequelize = new Sequelize(databaseURL); // lines to connect to local sql database;

var Post = sequelize.define('Post', {
	title: Sequelize.STRING,
	body: Sequelize.TEXT
})

// contrived example: you usually dont insert and extrat data in one shot

// insert data: 

sequelize.sync()
.then(function() {

	var postData = {
		title: 'First Post',
		body: 'This is the first post',
	};

	Post.create(postData);
})


// retrieve data:

sequelize.sync().then(function() {

	return Post.findAll({
		where: {					// where
			title: "First Post"		// or {like: "First"} to have it start with "First"
		}
	});

}).then(function(rows) {
		console.log(`We found: ${rows.length} post(s).`);

		if (rows.length > 0) {
			var hat = rows[0].dataValues; // dataValues is the actual data object
			console.log(Post.title);

		}

	})