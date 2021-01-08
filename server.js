const express = require('express');
const app = express();
var cors = require('cors');
const fs  = require('fs');
const PORT = 5000;
var server = require('http').createServer(app);

app.use(cors());

app.get('/', function (req, res) {
	fs.readFile('index.html', function (error, data) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
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