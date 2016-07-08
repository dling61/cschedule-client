define([
	'underscore', 
	'backbone'
], function(_, Backbone){
	var Participants = Backbone.Collection.extend({		
	   url: 'community/30001/participant',
	});
	return Participants;
});