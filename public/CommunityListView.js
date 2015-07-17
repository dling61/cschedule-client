var CommunityListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var communities = new Communities();
        communities.fetch({
            success: function (communityList) {
                debugger;
                var template1 = _.template($('#community-list-template').html());
                var template2 = _.template($("#community-dropdown-template").html());
                debugger;
                $(".nav-body").html(template1({communities: communities.models}));
                $("#community-drop-down").html(template2({communities:communities.models}));
            }
        })

    }

});
