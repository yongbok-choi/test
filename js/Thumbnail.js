const fs  = require('fs');
var thumb = require('node-thumbnail').thumb;

const directoryPath = '../data/';
const thumbnailPath = '../thumbnail/';
// thumb(options, callback);
var files = fs.readdirSync(directoryPath);
var thumbFiles = fs.readdirSync(thumbnailPath);
for(var i=0; i<files.length; i++) {
    var filePath = directoryPath+files[i];
    var thumbFile = thumbnailPath+files[i].split(".")[0]+'_thumb.'+files[i].split(".")[1];

    thumb({
        source: filePath, // could be a filename: dest/path/image.jpg
        destination: thumbnailPath,
        concurrency: 4,
        skip:true
    }, function(files, err, stdout, stderr) {
        console.log('All done!');
    });
    
    
    console.log(thumbnailPath+files[i].split(".")[0]+'_thumb.'+files[i].split(".")[1]);
}
// thumb({
//   source: '../data/20190516_172013.jpg', // could be a filename: dest/path/image.jpg
//   destination: '../data/thumbnail/',
//   concurrency: 4
// }, function(files, err, stdout, stderr) {
//   console.log('All done!');
// });