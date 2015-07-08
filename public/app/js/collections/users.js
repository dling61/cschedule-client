var Users = Backbone.Collection.extend({
    url: 'community/30001/participant',
    parse: function (data) {
        this.page = data.page;
        return data.participant;
    }
});