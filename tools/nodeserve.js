var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    //res.sendFile(path.resolve(__dirname + 'index.html', '../'))
    //console.log(__dirname)
    //res.write(path.resolve(__dirname+".../"))
    var p = __dirname.replace("/tools","");
    res.sendFile(req.originalUrl, {"root": p});

    // res.write(req.originalUrl)
});

app.listen(8080);