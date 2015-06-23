ContactManager.Models.Contact = Backbone.Model.extend({
    
  idAttribute: "id",
  defaults: {
    name: null,
    tel: null,
    email: null,
    avatar: null,
      profile: null
  },

  initialize: function() {
    this.set('avatar', _.random(1, 15) + '.jpg');
  }
});
