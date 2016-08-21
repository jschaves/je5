var mysql = require('mysql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/play', function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'admin_je5_cap',
		password : '9243aabb',
		database : 'admin_je5_capture'
	});
	connection.connect();
	var queryString = "SELECT * FROM `streaming` WHERE ID = 1";
	connection.query(queryString, function(err, dates) {
		if (err) {
			console.log(err);
		} else {
			var array_imgs = new Array(dates[0].rec.substr(1));			
			res.send('<!DOCTYPE html>'
					+'<html>'
					+'<head>'
					+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'
					+'<script src="http://je5.es/js/plugin-jquery/plugin-jquery-je5-beta.0.2.1.js"></script>'
					+'<title>View captures images db whith "Media capture"</title>'
					+'<meta charset="utf8">'					
					+'</head>'
					+'<body>'
					+'<h1 style="font-family: Verdana; color: #fff; background-color: rgba(0, 0, 0, 0.3); padding-right: 10px; padding-left: 10px; font-size: 3.4em; margin-top: 0.5%;"> Play capture je5 save_cam_captures</h1>'
					+'<script>'
					+'$("html").je5({'
					+'sort:"background",'
					+'attrs:{'
					+'type:"css",'
					+'src:[' + array_imgs + '],'
					+'change:{'
					+'time:160,'
					+'rerun:100'
					+'}'
					+'}'
					+'})'
					+'</script>'
					+'</body>'
					+'</html>'
			);	
			connection.end();
		}
	});
});
console.log('server start');
app.listen(8001);