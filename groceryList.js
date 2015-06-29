var GroceryListItem = Backbone.Model.extend({
    defaults : {
        "name" : "",
        "price" : "",
        "quantity" : ""
    },
    initialize : function () {
        this.fetch();
    },
    replaceName : function(str){
        this.set('name', str);
        this.save();
        console.log('replacing name')
    },
    replacePrice : function(str){
        this.set('price', str);
        this.save();
    },
    del: function(){
    this.destroy({success: function(){
        }})
    }

});


    GroceryListItem.prototype.inc = function(){
        var qty = this.get('quantity');
        this.set('quantity', qty+1);
        this.save();
    },

    GroceryListItem.prototype.dec = function(){
        var qty = this.get('quantity');
        this.set('quantity', qty-1);
        this.save();
    }



var GroceryListItemView = Backbone.View.extend({
    render : function () {
        var itemName = this.model.get("name");
        var itemPrice = this.model.get("price");
        var quantity = this.model.get('quantity')
        var incBtn = "<button id=incBtn>Increase Qty</button>";
        var decBtn = "<button id=decBtn>Decrease Qty</button>";
        var delBtn = "<button id=delBtn>Delete</button>";
        var nameInput = '<input id=nameInput type="text" value="' + itemName + '" />';
        var priceInput = '<input id=priceInput type="text" value="' + itemPrice + '" />';
        this.$el.html("<div>" + nameInput + priceInput + quantity + incBtn + decBtn + delBtn + "</div>");
    },
    initialize : function () {
        this.model.on('change', this.render, this);

    },
    events : {
        "click #incBtn"   : "increment",
        "click #decBtn"   : "decrement",
        "keypress #priceInput" : "updateOnEnter",
        "keypress #nameInput" : "updateOnEnter"
    },
    increment : function(){
        this.model.inc();
    },
    decrement : function(){
        this.model.dec();
    },
    delete : function(){
        this.model.del();
    },

    updateOnEnter : function (e) {
        if(e.keyCode == 13) {
            this.replaceName();
            this.replacePrice();
        }
    },
    replaceName : function(){
        var str = this.$el.find("#nameInput").val();
        this.model.replaceName(str);
    },
     replacePrice : function(){
        var str = this.$el.find("#priceInput").val();
        this.model.replacePrice(str);
    },
    //other methods
});


var GroceryCollection = Backbone.Collection.extend({
    model      : GroceryListItem,
    url        : "/groceryList",
    initialize : function () {
        this.fetch();
        // console.log('fetching GroceryCollection')
    }
});

// var idCount = 0

var GroceryCollectionView = Backbone.View.extend({
    render : function () {
        var addBtn = '<button id="addbutton">Add Item</button>';
        var div = '<div id="item-list"></div>';
        this.$el.html(div + addBtn);
    },
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addOne)
    },
    events : {
        "click #addbutton" : "addCollection"
    },
    addOne : function (model) {
        model.set({name: "Enter item here", price: "Enter price", quantity: 0});
        var view = new GroceryListItemView({model:model});
        view.render()
        this.$("#item-list").append(view.$el);
        // idCount++

    },
    addCollection : function () {
        this.collection.create({})
    }

    // other methods
})

var groceryCollection, groceryCollectionView;

$(document).ready( function () {

    var groceryCollection = new GroceryCollection();
    var groceryCollectionView = new GroceryCollectionView({collection : groceryCollection});
    groceryCollectionView.render();

    $("#listdiv").append(groceryCollectionView.$el);

})