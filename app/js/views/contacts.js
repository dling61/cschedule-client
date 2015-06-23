ContactManager.Views.Contacts = Backbone.View.extend({
  template: _.template($('#tpl-contacts').html()),

  
    
  initialize: function(){
    this.collection.bind('sync', this.render, this);
  },
    
    
  renderOne: function(contact) {
    var itemView = new ContactManager.Views.Contact({model: contact});
    this.$('.contacts-container').append(itemView.render().$el);
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);

    this.collection.each(this.renderOne, this);

    return this;
  }
});
