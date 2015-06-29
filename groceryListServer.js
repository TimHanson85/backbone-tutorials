var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

var groceryList = [];

app.get('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    res.send(JSON.stringify({
        name: groceryList[id].name,
        price: groceryList[id].price,
        quantity: groceryList[id].quantity
    }));
});

app.put('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    groceryList[id] = {
        id:id, 
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity 
    }
    res.end(JSON.stringify({
        id:id, 
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity 

    }));

});

app.get('/groceryList', function (req, res) {
    var groceryListAndIDs = groceryList.map(function (v, i) {
        return {
            id : i,
            name: v.name,
            price: v.price,
            quantity: v.quantity
        };

    });
    res.send(groceryListAndIDs);
});

app.listen(3000);
console.log('listening on port 3000');