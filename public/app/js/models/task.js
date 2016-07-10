define([
	'underscore', 
	'backbone'
], function(_, Backbone){

    return Backbone.Model.extend ({
        //urlRoot :'community/30001/event'
        urlRoot :'task'

    });
});