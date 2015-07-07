var Users = Backbone.Collection.extend({
    url: '/participant',
    parse: function (data) {
        this.page = data.page;
        return data.participant;
    }
});