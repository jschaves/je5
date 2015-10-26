var mysql = require('mysql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/view', function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'pru_je5_stream',
	});
	connection.connect();
	var queryString = "SELECT * FROM `streaming` WHERE ID = 1";
	connection.query(queryString, function(err, dates) {
		if (err) {
			console.log(err);
		} else {
			var array_imgs = dates[0].rec; 			
			res.send('<!DOCTYPE html>'
					+'<html>'
					+'<head>'
					+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'
					+'<title>View captures images db whith "Media capture"</title>'
					+'<meta charset="utf8">'
					+'</head>'
					+'<body>'
					+'<table>'
					+'<tr>'
					+'<td><h1>View captures images db whith "Media capture"</h1></td>'
					+'</tr>'
					+'</table>'
					+'<div id="output"></div>'
					+'<script>'
					+'var array_imgs  = new Array('+array_imgs.substr(1)+');'
					+'for(a = 0; a < array_imgs.length; a++) {'
					+'$(\'#output\').append(\'<img src="\'+array_imgs[a]+\'" />\');'
					+'}'
					+'</script>'
					+'</body>'
					+'</html>'
			);	
			connection.end();
		}
	});
});
console.log('server start');
app.listen(8000);