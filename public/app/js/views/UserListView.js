var UserListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function (users) {
                var template = _.template($('#user-list-template').html());
                //WFB that.$el.html(template({users: users.models}));
                $(".page").html(template({users: users.models}));
            }
        })

    }

});
