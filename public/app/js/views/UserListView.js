var UserListView = Backbone.View.extend({
    el: '.MemberList',
	events:{
		'dblclick #userPanel':'showDetails',
	},
	
	showDetails:function(){
		$('#userDetails').dialog();
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

