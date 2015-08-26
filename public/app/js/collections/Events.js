var EventM = Backbone.Model.extend();

var EventsC = Backbone.Collection.extend({

    model: EventM,

    url: 'community/30001/event',

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
        //debugger;
        return resp.event["30001"]; //[evAry[0]]  ;
    }    //parse end


});