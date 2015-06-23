
var Counter = Backbone.Model.extend({
    defaults : {"value" : 0}
});

var CounterView = Backbone.View.extend({
///new stuff down+++++++++++

    initialize: function(){
        var myself = this;
        this.$el.on("click","button", function(){
            var mod = myself.model;
            var currVal = mod.get('value');
            mod.set('value', currVal+1);
        })
            this.model.on("change", function () {
                myself.render();

            });
            this.render();
        
    }
// new stuff up+++++++++++=
    render: function () {
        var val = this.model.get("value");
        var btn = '<button class="bUp">Increment</button>';
        var dbtn = '<button class="bDown">Decrement</button>';
        var reset = '<button class="rst">Reset</button>'
        this.$el.html('<p>'+val+'</p>' + btn + dbtn + reset);
    }
});


var counterModel, counterView;

$(document).ready( function () {

    counterModel = new Counter();

    counterView = new CounterView({model : counterModel});
    counterView.render();

    // counterModel.on("change", function () {
    //     counterView.render();

    // });

    // counterView.$el.on("click",".bUp", function () {
    //     var mod = counterView.model;
    //     var currVal = mod.get("value");
    //     mod.set("value",currVal+1);
    // });

    counterView.$el.on("click",".bDown", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        // mod.set("value",currVal-1);
        if (currVal === 0 ){
            return
        }else{
            mod.set("value",currVal-1);
        }
    });

    counterView.$el.on("click",".rst", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        mod.set("value",0);
    });


//+++++++counter +^^^^
    
    $("#counterdiv").append(counterView.$el);
});

