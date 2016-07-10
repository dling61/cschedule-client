define([
	'underscore', 
	'backbone'
], function(_, Backbone){
    var Tasks = Backbone.Collection.extend({
        url: 'task',
	});

	return Tasks;
});