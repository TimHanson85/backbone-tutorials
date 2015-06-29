var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

var groceryList = [];

app.get('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    res.send(JSON.stringify({value : groceryList[id]}));
    console.log('groceryList');
    console.log(groceryList);
});

app.put('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    groceryList[id] = req.body.value;
    res.end(JSON.stringify({id:id}));
});

app.get('/groceryList', function (req, res) {
    var groceryListAndIDs = groceryList.map(function (v, i) {
        return {id : i, value : v};
    });
    res.send(groceryListAndIDs);
});

app.listen(3000);
console.log('listening on port 3000');