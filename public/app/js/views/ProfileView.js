define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
    'js/collections/PoolHelpers',
    'js/models/participant'

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
        
        // needs to connect to the server
        var profilePic = $("<img src="+gProfilePicture+">");
        $(this.el).prepend(profilePic);
        
        // takes the current user
        $(this.el).append("<span id='curUser'>" + gLoginUserName + "</span>");
    },

    events : {
        
    },
    
    // display of dropdown menu 
    renderHelperMenu : function() {
        
        var user = gParticipants.findWhere({userid: gLoginUserId}); 
        
        // logout has not been implemented
        
        // when switching the community, need to make to reset gCommunityID to NULL
        
        if (gSelectedCommunityId != null) {
            
            var profile = '<form>' +
							'<i class="fa fa-user" aria-hidden="true"></i> <input type="text" name="name" value="'+ user.get("name")+'"><br>' +
							'<i class="fa fa-wrench" aria-hidden="true"></i> <input type="text" name="role" value="'+user.get("userrole") +'"><br>' +
							'<i class="fa fa-gavel" aria-hidden="true"></i> <input type="text" name="title" value="'+user.get("title")+'"><br>' +
							'<i class="fa fa-phone" aria-hidden="true"></i> <input type="text" name="phone" value="'+user.get("mobile")+'"><br>' +
							'<i class="fa fa-envelope-o" aria-hidden="true"></i> <input type="text" name="email" value="'+user.get("email")+'"><br>' +
							'<input type="submit" value="Logout">' +
						'</form>';
        }
        else {
            
            var profile = '<form>' +
							'<i class="fa fa-user" aria-hidden="true"></i> <input type="text" name="name" value="'+ user.get("name")+'"><br>' +
							'<i class="fa fa-gavel" aria-hidden="true"></i> <input type="text" name="title" value="'+user.get("title")+'"><br>' +
							'<i class="fa fa-phone" aria-hidden="true"></i> <input type="text" name="phone" value="'+user.get("mobile")+'"><br>' +
							'<i class="fa fa-envelope-o" aria-hidden="true"></i> <input type="text" name="email" value="'+user.get("email")+'"><br>' +
							'<input type="submit" value="Logout">' +
						'</form>';
        }
    
        return profile; 
    },
       
    render: function() {
        
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