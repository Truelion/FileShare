//NPM Seamless Plugin

var compressor = require('node-minify');
var fs = require("fs");

var args = process.argv.slice(2);
var exec = require('child_process').exec;
dir = args[0] ?  args[0] : __dirname;

var child = exec('java -jar tools/js.jar tools/concat.js ' + dir,
  function (error, stdout, stderr){
    console.log('Output -> ' + stdout);
    compressor.minify({
  	  compressor: 'gcc',
  	  input: dir + '/index.src.js',
  	  output: dir + '/index.min.js',
  	  callback: function (err, min) {
  	  	console.log("minified >> index.min.js to: " + getFileSize(dir + '/index.min.js'))
  	  }
  	});
    if(error !== null){
      console.log("Error -> "+error);
    }
});
 

 function getFileSize(filePath) {
  var stats = fs.statSync(filePath);
  // console.log('stats', stats);
  var size = stats["size"];
  // convert it to humanly readable format.
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}


module.exports = child;