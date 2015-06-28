//REST API Connection

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = 'http://apitest1.servicescheduler.net/community/30001' +
        options.url + '?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.4.0&';
});


var userListView = new UserListView();
var userEditView = new UserEditView();
var router = new Router;
router.on('route:home', function () {
    // render user list
    userListView.render();
})
router.on('route:edit', function (id) {
    userEditView.render({ id: id });
})
Backbone.history.start();