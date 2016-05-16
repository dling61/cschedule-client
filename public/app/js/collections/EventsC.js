define([
	'underscore', 
	'backbone',
    'js/models/EventM'

], function(_, Backbone, EventM){
    
    /*
	var EventM = Backbone.Model.extend({
	  urlRoot: 'event',
	  // save: function(attrs, options) {
	  //   options.patch = true;
	  //   Backbone.Model.prototype.save.call(this, attrs, options);
	  // }   
	});
    */

	var EventsC = Backbone.Collection.extend({
		model: EventM,
	  
		// TBD: replace 30001 with accurate community id
		url: 'community/30001/event?start="2016:0501"&num=4',

		// **parse** converts a response into a list of models to be added to the
		// collection. The default implementation is just to pass it through.
		parse: function(resp, xhr) {
			//debugger;
			// console.log(resp.event);
			return resp.event["30001"]; //[evAry[0]]  ;
		}    //parse end
	});
	return EventsC;
});