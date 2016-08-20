var mysql = require('mysql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/capture', function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'pru_je5_stream'
	});
	connection.connect();
	if(req.body.img != 'data:,' && req.body.img != '') {
		var rec = ",\""+req.body.img+"\"";
		var queryString = "UPDATE `streaming` SET `img` = '"+req.body.img+"', `rec` = CONCAT('"+rec+"', `rec`) WHERE ID = 1";
		connection.query(queryString, function(err, rows) {
			if(err) {
				console.log(err);
			} else {
				console.log('OK');
			}
			connection.end();
		});
	}
});
console.log('server start');
app.listen(8000);