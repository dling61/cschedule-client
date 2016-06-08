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
			gLatestBEventId      = gLoginUser.baseeventid;
			gLatestRScheduleId   = gLoginUser.repeatscheduleid;
			gLatestTaskId        = gLoginUser.taskid;
			gLatestTaskHelperId  = gLoginUser.taskhelperid;
			gLatestParticipantId = gLoginUser.participantid;
			gLoginUserName       = gLoginUser.username;
			
 /* Example:           
 {"email":"123@yahoo.com","password":"123","ownerid":"123","username":"Cyndi",
 "profile":"http://test.cschedule.com/profile/123.png\t",
 "mobile":"122123456","communityid":"0",
 "taskid":"0","eventid":"0","taskhelperid":"0","baseeventid":"0",
 "participantgroupid":"0","repeatscheduleid":"0","participantid":"0"}
 */
			
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