ContactManager.Collections.Contacts = Backbone.Collection.extend({
  model: ContactManager.Models.Contact,
    
  url: 'http://apitest1.servicescheduler.net/community/30001/participant?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.4.0&',
    
    
    parse: function(data) {
        //this.page=data.page;
        return data.participant;
    }
    
});
