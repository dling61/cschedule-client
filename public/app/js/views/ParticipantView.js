var ParticipantView = Backbone.View.extend({
    el: '#participantDialog',
	events:{
		'click #deleteParticipant':'deleteParticipant',
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

