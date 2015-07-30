var UserListView = Backbone.View.extend({
    el: '.MemberList',
	events:{
		'dblclick .participant'   : 'showDetails'
	},
	
	showDetails:function(ev){
		var participant =$(ev.target).closest('li');
		var email = $(participant[0]).data('email'); 		
		var participantView = new ParticipantView();
		participantView.render(email);
		$('#participantDialog').dialog();
        //ev.preventDefault();
	},
	
    render: function () {
        var that = this;
        var participants = new Participants();
        participants.fetch({
            success: function (participants) {
                var template = _.template($('#user-list-template').html());              
                $(".MemberList").html(template({participants: participants.models}));
            }
        })
    }
});

