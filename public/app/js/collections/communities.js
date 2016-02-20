define([
	'underscore', 
	'backbone'
], function(_, Backbone){

	var Communities = Backbone.Collection.extend({
		url: 'community',
		parse: function (data) {
			this.page = data.page;
			return data;
		}
	});
	return Communities;
});