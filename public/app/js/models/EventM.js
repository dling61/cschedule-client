define([
	'underscore', 
	'backbone'
], function(_, Backbone){
	var EventM = Backbone.Model.extend({
	  urlRoot: 'event',
	  // save: function(attrs, options) {
	  //   options.patch = true;
	  //   Backbone.Model.prototype.save.call(this, attrs, options);
	  // }   
	});

	return EventM;
});