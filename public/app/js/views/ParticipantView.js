var ParticipantView = Backbone.View.extend({
    el: '#participantDialog',
	events:{
		'click #deleteParticipant':'deleteParticipant',
		'click #updateUser':'updateUser',
	},
	
    render: function (email) {
        var that = this;
        var users = new Users();
        users.fetch({
			data: $.param({email:email}),
          	success: function (users) {
                var template = _.template($('#display-user-template').html());              
                $("#participantDialog").html(template({user:users.models[0].attributes}));				
            }
        });	    
    },
	
	updateUser:function(ev){
		var userUpdate = new UserUpdate();
		var username = $("#updateusername").html();
		var mobile = $("#updatemobile").html();
		userUpdate.save({id:ev.target.value,username:username,mobile:mobile},{
			success:function(){
			var userListView = new UserListView();
			userListView.render();
			$('#participantDialog').dialog('close');
			}
		});
	},
	
	deleteParticipant: function(ev){
		var participant = new Participant({id:ev.target.value});
		participant.destroy({
			success: function(){
				var userListView = new UserListView();
	            userListView.render(); 
				$('#participantDialog').dialog('close');
			},
		});		
	}
});

