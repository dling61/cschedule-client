define([
	'underscore', 
	'backbone',
    //'moment',
    //'javascripts/fullcalendar.js',
	//'js/collections/EventsC', 
	'js/views/CommunityListView',
	'js/views/eventDialogView'
], function(_, Backbone,  CommunityListView, eventDialogView){

	return Backbone.View.extend({
		initialize: function () {
			gLoginUser			 = JSON.parse(localStorage.getItem("login_user"));
			gLoginUserId         = gLoginUser.ownerid;
			gLatestCommunityId   = gLoginUser.communityid;
			gLatestEventId       = gLoginUser.eventid;
			gLatestTaskId        = gLoginUser.taskid;
			gLatestTaskHelperId  = gLoginUser.taskhelperid;
			gLatestParticipantId = gLoginUser.participantid;
			gLoginUserName       = gLoginUser.username;
			
			
			//communityEvents   = new EventsC();
			communityListView = new CommunityListView();
			//communityListView.render();
			
			
			
			
			var createEvent = new eventDialogView();
			createEvent.render();

            /*
			layersample.config.userId = gLoginUser.username; //"kalyani";
			layersample.config.userId = "kalyani";
			*/
			
			/* Load Profile Image */
			//$('#editProfileImage').css('background-image','url(' + gLoginUser.profile + ')');
		}
	});
});