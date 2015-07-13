var UserListView = Backbone.View.extend({
    el: '.MemberList',
	events: {
		'click #SearchForMember': 'SearchForMember',
		'click #newMember' : 'showForm',
//		 'submit .edit-user-form': 'saveUser',
		
  //      'click .delete': 'deleteUser'
    },
	
	
	SearchForMember: function(){
		var userDetails = $('#email').val();
		var user = new User();
		
		user.set({email: userDetails});
	user.save();
		
	},
	
	showForm : function(){
		$('#edit-user-form').show();
	},
	
	
	saveUser: function (ev) {
        var userDetails = $(ev.currentTarget).serializeObject();
        var user = new User();
        user.save(userDetails, {
            success: function (user) {

                router.navigate('', { trigger: true });
            }
        });
        return false;
    },
	
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function (users) {
                var template = _.template($('#user-list-template').html());
                //WFB that.$el.html(template({users: users.models}));
                $(".MemberList").html(template({users: users.models}));
            }
        })
		
    }

});
