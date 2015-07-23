var User = Backbone.Model.extend({ 
urlRoot: 'creator?action=invite&',
	defaults:{
		email:'',
		name:'',
		mobile:''
	}
});	
