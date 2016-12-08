var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	author:String,
	title: String,
	url: String
});

mongoose.model('Blog', BlogSchema);

var app = express();

var Blog = mongoose.model('Blog');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// ROUTES
app.get('/api/blogs', function(req, res) {
	Blog.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log(item._id)
		});
		res.send(docs);
	});
});

app.post('/api/blogs', function(req, res) {
	console.log('receive a post request');
	var blog = new Blog(req.body);
	blog.save(function(err, doc) {

		res.send(doc);
	})
});

app.delete('/api/blogs/:id', function(req, res) {
	Blog.remove({_id: req.params.id}, function(err) {
		res.send({_id: req.params.id});
	});
});
var port = 3000;
app.listen(port);
console.log('server on ' + port);