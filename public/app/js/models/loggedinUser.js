var loggedUser = Backbone.Model.extend({
	urlRoot: 'persons.json',
    defaults:{
		email:'',
		name:'',
		mobile:'',
		profile:'',
		userid:''
	}
});