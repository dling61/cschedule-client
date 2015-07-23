var UserAddView = Backbone.View.extend({
    el: '.MemberList',
    events: {
		'click #searchForMember': 'searchForMember',
		'click #deleteParticipant':'deleteParticipant',
		'click #addMember':'addMember',
//		 'submit .edit-user-form': 'saveUser',
		
  //      'click .delete': 'deleteUser'
    },
	
	searchForMember: function(){
	var userDetails = $('#email').val();		
	var users = new Users();		
	users.fetch({
		data: $.param({email: userDetails}),		
		error:function(){
			$('#edit-user-form').show();
			$('#inputEmail').val(userDetails);
		},
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
    
	addMember: function(){
		var name = $('#inputName').val();
		var email = $('#inputEmail').val();
		var mobile = $('#inoutMobile').val();
		var user = new User();
		user.set({
			name: name,
			email:email,
			mobile:mobile
		});
		user.save();
	},
	
	
	deleteParticipant: function(ev){
		var participant = new Participant({id:ev.target.value});
		participant.destroy();
		var userListView = new UserListView();
	    userListView.render(); 
	},
   
});
 
