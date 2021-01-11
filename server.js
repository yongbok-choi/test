const express = require('express');
const app = express();
var cors = require('cors');
const fs  = require('fs');
const PORT = 5000;
var server = require('http').createServer(app);
const path = require('path');
const os = require('os');
const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;
var thumb = require('node-thumbnail').thumb;


const directoryPath = './data/';
const thumbnailPath = './thumbnail/';

var photosJson = Array();
var files = fs.readdirSync(directoryPath);
for(var i=0; i<files.length; i++) {
	var filePath = directoryPath+files[i];
    var data = fs.readFileSync(filePath);
	var tags = ExifReader.load(data, {expanded: true});
	if (tags.gps) {		
		var lat = tags.gps.Latitude;
		var lng = tags.gps.Longitude;
		var obj = new Object();
		obj.lat = lat;
		obj.lng = lng;
		thumb({
			source: filePath, // could be a filename: dest/path/image.jpg
			destination: thumbnailPath,
			concurrency: 4,
			skip: true
		  }, function(files, err, stdout, stderr) {
			console.log('All done!');
		  });
		obj.thumbnail = thumbnailPath+files[i].split(".")[0]+'_thumb.'+files[i].split(".")[1];
		obj.url= filePath;
		obj.video="";
		obj.caption="";            
		var obj_s = JSON.stringify(obj);
		photosJson.push(obj_s);
	}
}
console.log("thumbnail");

app.use(cors());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
	// fs.readFile('index.html', function (error, data) {
	// 	res.writeHead(200, { 'Content-Type': 'text/html' });
	// 	res.end(data);
	// });
	
    res.render(__dirname + '/index.html', {
        data: photosJson
    }, (err, file) => {
        if (err) console.log(err);
        res.send(file);
    });
});
app.use('/', express.static('./'));
function handleListening(){
    console.log('Listening on: http://localhost:'+PORT);
};

server.listen(PORT, handleListening);

// function handleHome(req,res){
//     res.send("hello");
// }
// app.get("/",handleHome);