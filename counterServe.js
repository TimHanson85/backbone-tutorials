
$(document).ready( function () {

    var Counter = Backbone.Model.extend({
        defaults : {"value" : 0},
        urlRoot : "/counter"
    });
    
    var counterModel1 = new Counter({id : 1});
    var counterModel2 = new Counter({id : 2});//added this server id 

    Counter.prototype.inc = function () {
        var val = this.get("value");
        this.set("value", val+1);
        this.save();
    }  
    Counter.prototype.dec = function () {
        var val = this.get("value");
        this.set("value", val-1);
        this.save();
    }     
    
    counterModel1.fetch();

var CounterView = Backbone.View.extend({
        render: function () {
            var val = this.model.get("value");
            var incBtn = '<button id="bUp">Increment</button>';
            var decBtn = '<button id="bDown">Decrement</button>'
            var par = '<p>HELLO</p>'
            this.$el.html('<p>'+val+'</p>' + incBtn + decBtn + par);
        },
        initialize: function () {
            this.model.on("change", this.render, this);
            this.model.on('sync', this.updatePar, this);
        },
        events : {
            'click #bUp' : 'increment',
            'click #bDown' : 'decrement'
        },
        increment : function () {
            this.model.inc();
        },
        decrement : function(){
            this.model.dec();
        },
        updatePar: function(){
            var par = 'Butt'
            this.$el.append('<p>' + par + '</p>')
            console.log(par)

        },

    });
    
    var counterView1 = new CounterView({model : counterModel1});
    
    counterView1.render();
    
    $("#counterdiv").append(counterView1.$el);
    
});
