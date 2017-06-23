var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

// Cross-origin resource sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 
  next();
});

var servicio = { url: '/personas', fich: __dirname + '/data/personas.json'};

app.get(servicio.url, function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});
app.get(servicio.url + '/:id', function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        var lst = JSON.parse( data );
        var ele = lst.find(ele => ele.id == req.params.id);
        console.log( ele );
        res.end( JSON.stringify(ele));
    });
});
app.post(servicio.url, function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        var lst = JSON.parse( data );
        var ele = req.body;
        lst.push(ele);
        console.log( lst );
        fs.writeFile(servicio.fich, JSON.stringify(lst), 'utf8', function(err) {
            res.status(500).end();
        });
        res.status(200).end( JSON.stringify(lst));
    });
});
app.put(servicio.url, function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        var lst = JSON.parse( data );
        var ele = req.body;
        var ind = lst.findIndex(row => row.id == ele.id);
        lst[ind] = ele;
        console.log( lst );
        fs.writeFile(servicio.fich, JSON.stringify(lst), 'utf8', function(err) {
            res.status(500).end();
        });
        res.status(200).end( JSON.stringify(lst));
    });
});
app.put(servicio.url + '/:id', function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        var lst = JSON.parse( data );
        var ele = req.body;
        var ind = lst.findIndex(row => row.id == req.params.id);
        lst[ind] = ele;
        console.log( lst );
        fs.writeFile(servicio.fich, JSON.stringify(lst), 'utf8', function(err) {
            res.status(500).end();
        });
        res.status(200).end( JSON.stringify(lst));
    });
});
app.delete(servicio.url + '/:id', function (req, res) {
    fs.readFile(servicio.fich, 'utf8', function (err, data) {
        var lst = JSON.parse( data );
        var ind = lst.findIndex(row => row.id == req.params.id);
        lst.splice(ind, 1);
        console.log( lst );
        fs.writeFile(servicio.fich, JSON.stringify(lst), 'utf8', function(err) {
            res.status(500).end();
        });
        res.status(200).end( JSON.stringify(lst));
    });
});

var server = app.listen(4321, function () {

  var host = server.address().address;
  if(host=='::') host = "localhost";
  var port = server.address().port;

    console.log("Servicio REST http://%s:%s%s", host, port, servicio.url);
});