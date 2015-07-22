var UserAddView = Backbone.View.extend({
    el: '.MemberList',
    events: {
		'click #SearchForMember': 'SearchForMember',
		'click #newMember' : 'showForm',
		'click #deleteParticipant':'deleteParticipant',
//		 'submit .edit-user-form': 'saveUser',
		
  //      'click .delete': 'deleteUser'
    },
	
	SearchForMember: function(){
	var userDetails = $('#email').val();		
	var users = new Users();		
	users.fetch({
		data: $.param({email: userDetails}),				
		success: function(data){
			var participant = new Participant();
			participant.set({
				userid:users.models[0].attributes.id,
			    name:users.models[0].attributes.username,
				email:users.models[0].attributes.email,
				mobile:users.models[0].attributes.mobile				
			});	
			var participants = new Participants();
	        participants.create(participant);
	        var userListView = new UserListView();
	        userListView.render();   
	   }				
    });	
    },
    
	deleteParticipant: function(ev){
	},
   

    showForm : function(){
	   $('#edit-user-form').show();
	
    },
});
 
