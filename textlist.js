
$(document).ready( function () {

var TextModel = Backbone.Model.extend({
    defaults : {"value" : ""},
    replace : function (str) {
      this.set("value", str);
    }
});

var TextView = Backbone.View.extend({
    render: function () {
        var textVal = this.model.get("value");
        var btn = '<button>Clear</button>';
        var input = '<input type="text" value="' + textVal + '" />';
        this.$el.html(textVal+"<br><div>" + input + btn +  "</div>");
    },
    initialize: function () {
        this.model.on("change", this.render, this);
        // last argument 'this' ensures that render's
        // 'this' means the view, not the model
    },
    events : {
        "click button" : "clear",
        "keypress input" : "updateOnEnter"
    },
    replace : function () {
        var str = this.$el.find("input").val();
        this.model.replace(str);
    },
    clear: function () {
        this.model.replace("");
    },
    updateOnEnter: function (e){
        if(e.keyCode == 13) {
            this.replace();
        }
    }
});

var TextCollection = Backbone.Collection.extend({
    model : TextModel
});

var TextCollectionView = Backbone.View.extend({

    render : function () {
        var btn = '<button id="addbutton">Add Text</button>';
        var div = '<div id="text-list"></div>';
        var del = '<button id="delbutton">Delete</button>';//delete button
        this.$el.html(div + btn + del);
    },
    initialize : function () {
        this.allViews = [];
        this.listenTo(this.collection, 'add', this.addView);
        this.listenTo(this.collection, 'remove', this.removeView)//eventually remove view
    },
    events : {
        "click #addbutton" : "addModel",
        "click #delbutton" : "removeModel"  //remove button
    },
    addModel : function () {
        this.collection.add({});
        // collection adds a model, fires add event, then listener calls this.addView(model)
    },
    removeModel : function(){//remove button functionality
        this.collection.pop();
    },
    addView : function (newModel) {
        newModel.set("value","Enter something here...");
        var view = new TextView({model : newModel});
        view.render();
        this.$("#text-list").append(view.$el);
        this.allViews.push(view);
    },
    removeView : function(){ //removing the view
        var view = this.allViews.pop(); 
        view.remove()
    },
});

var textCollection = new TextCollection();

var textCollectionView = new TextCollectionView({ collection : textCollection});

textCollectionView.render();

$("#listdiv").append(textCollectionView.$el);

});
