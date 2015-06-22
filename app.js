var Concat = Backbone.Model.extend({
    defaults : {"value" : ""}
});

var ConcatView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var input = "<input class='words' type='text' placeholder='typee'></input>"
        var addCat = "<button class ='add'>weiner</button>"
        var reset = '<button class="rst">Reset</button>'
        this.$el.html('<p>'+val+'</p>' + input + addCat +reset);
    }
});


var concatModel, concatView;

$(document).ready( function () {

    concatModel = new Concat();

    concatView = new ConcatView({model : concatModel});
    concatView.render();

    concatModel.on("change", function () {
        concatView.render();

    });


    concatView.$el.on("click",".add", function () {
        var mod = concatView.model;
        var currVal = mod.get("value");
        var input = $(".words")[0].value;
        mod.set("value", currVal + " " + input)
    });

    concatView.$el.on("click",".rst", function () {
        var mod = concatView.model;
        var currVal = mod.get("value");
        mod.set("value", "");
    });


//+++++++counter +^^^^
    
    $("#counterdiv").append(concatView.$el);
});
