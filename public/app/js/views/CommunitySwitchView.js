define([
    'underscore', 
    'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
    'js/collections/communities',
    'js/views/CommunityListView',

], function(_, Backbone, jquery, jqueryui, Drop, Task, Communities, CommunityListView){
    
var Community = Backbone.Model.extend({
    //url: 'schedules/1070068/onduty/1070000'
    urlRoot: 'assignmentpool'
});

/*var Communities = Backbone.Collection.extend({

    model: Community,
    url: 'taskhelper',  // 'schedules/1070068/onduty/1070000',

    parse: function(resp, xhr) {
        return resp.apgroup[0].member;
    }
});*/
    
/*
Base Class of a Backbone View
*/

var CommunitySwitchView = Backbone.View.extend({
    
    addHelper: function () {
        alert('Added helper');
    },
    
    el: "dropdown-community",
    
    collection: Communities,

    initialize: function() {
                
    },

    events : {
        
    },
    
    /*renderHelperMenu : function() {

    },*/
       
    render: function() {

        var dropContent = '',
            communitynamesArray,
            that = this;

        /* initializes this view's collection to "Communities" (from js/collections/communities)
           then fetches data from localstorage and updates/populates the collection */
        this.collection = new Communities(); 
        this.collection.fetch({

            data: $.param({
                ownerid: gLoginUser.ownerid //user id 
            }),

            success: function(communityList) {

                communitynamesArray = that.collection.pluck("communityname");

                var arrayLength = communitynamesArray.length;

                for (var i = 0; i < arrayLength; i++){
                    dropContent += '<ul>' + communitynamesArray[i] + '</ul>';
                }

                var targets = $('.dropdown-community')[0];

                this.dropElm = new Drop({
                    target: targets,
                    content: dropContent,
                    position: 'bottom center',
                    openOn: 'click',
                    classes: 'drop-theme-arrows-bounce-dark',
                });
                
            }
            
        });        
        
    }
});

return CommunitySwitchView;

});