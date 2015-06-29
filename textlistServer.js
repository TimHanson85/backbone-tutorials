
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

var texts = [];

app.get('/texts/:id', function (req, res) {
    var id = req.params.id;
    res.send(JSON.stringify({value : texts[id]}));
    console.log('texts');
    console.log(texts);
});

app.put('/texts/:id', function (req, res) {
    var id = req.params.id;
    texts[id] = req.body.value;
    res.end(JSON.stringify({id:id}));
});

app.get('/texts', function (req, res) {
    var textsAndIDs = texts.map(function (v, i) {
        return {id : i, value : v};
    });
    res.send(textsAndIDs);
});

app.listen(3000);
console.log('listening on port 3000');