define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
    'js/collections/PoolHelpers',

], function(_, Backbone, jquery, jqueryui, Drop, Task, PoolHelpers){
    
var Profile = Backbone.Model.extend({
    //url: 'schedules/1070068/onduty/1070000'
    urlRoot: 'assignmentpool'
});

var Profiles = Backbone.Collection.extend({

    model: Profile,
    //url: 'taskhelper',  // 'schedules/1070068/onduty/1070000',

    parse: function(resp, xhr) {
        return resp.apgroup[0].member;
    }
});
    
/*
Base Class of a Backbone View
*/

var ProfileView = Backbone.View.extend({
    
    addHelper: function () {
        alert('Added helper');
    },
    
    // profile-pic class 
    el: ".profile-pic",
    
    collection: Profiles,

    initialize: function() {
        
        /*
        _.bindAll(this);
        this.helpersPoolView = new HelpersPoolView();
        */
    },

    events : {
        
    },
    
    // display of dropdown menu 
    renderHelperMenu : function() {
        
        var profile = "<div>Settings</div>";
    
        return profile; 
    },
       
    render: function() {
        
        // needs to connect to the server
        $(this.el).append("<a id= 'curUser'> Samuel Breck </a>");
        
        var targets = $('#curUser')[0];
        
        this.dropElm = new Drop({
            target: targets,
            content: this.renderHelperMenu,
            position: 'bottom center',
            openOn: 'click',
            classes: 'drop-theme-arrows-bounce-dark',		
        });
        
        
        }
});

return ProfileView;    
});