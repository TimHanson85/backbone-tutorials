var express = require('express');
var bodyParser = require('body-parser');
var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

// app.set('database', knex);
// database= app.get('database');
// database('groceryList')

var groceryList = [];

app.get('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    knex('grocerylist').where({id:id}).select().then(function(retrivedListItems){
        res.send(JSON.stringify({
            name    : retrivedListItems.name,
            price   : retrivedListItems.price,
            quantity: retrivedListItems.quantity
        }));
    });
});

app.post('/groceryList', function(req, res){
    console.log('POSTING ITEM')
    var id = req.params.id;
    knex('grocerylist').returning('id').insert({
        name    : req.body.name,
        price   : req.body.price,
        quantity: req.body.quantity 
    }).then(function(result){
        console.log(result)
        res.end(JSON.stringify({
            id      : result[0], 
            name    : req.body.name,
            price   : req.body.price,
            quantity: req.body.quantity 

        }));
    })
})

app.put('/groceryList/:id', function (req, res) {
    console.log('putting item')
    var id = req.params.id;
    // knex('groceryList').where({id:id}).select().then(function(retrivedListItems){})
    knex('grocerylist').where({id: id}).update ({
        // id      : id, 
        name    : req.body.name,
        price   : req.body.price,
        quantity: req.body.quantity 
    }).then(function(){
        res.end(JSON.stringify({
            id      : id, 
            name    : req.body.name,
            price   : req.body.price,
            quantity: req.body.quantity 

        }));
    });
});



app.get('/groceryList', function (req, res) {
    knex('grocerylist').select().then(function(retrivedList){
        res.send(retrivedList);
            console.log(retrivedList);
            console.log("retrivedList:");
    });

});


app.listen(3000);
console.log('listening on port 3000');