
var UserEditView = Backbone.View.extend({
    el: '.page',
    events: {
        'submit .edit-user-form': 'saveUser',
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
    render: function (options) {
        var that = this;
        if (options.id) {
            that.user = new User({ id: options.id });
            that.user.fetch({
                success: function (user) {
                    var template = _.template($('#edit-user-template').html(), { user: user });
                    that.$el.html(template);
                }
            })
        } else {
            var template = _.template($('#edit-user-template').html(), { user: null });
            that.$el.html(template);
        }
    }
});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};