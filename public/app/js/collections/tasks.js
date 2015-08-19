var Tasks = Backbone.Collection.extend({
    url: 'community/3001',
    parse: function (data) {
    	this.page = data.page;
        return data;
    }
});