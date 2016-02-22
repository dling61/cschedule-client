define([
	'underscore', 
	'backbone',
	'js/collections/Participants'
], function(_, Backbone, Participants){
	var ParticipantsListView = Backbone.View.extend({
		el: '#parList',

		initialize: function () {
			gParticipants = new Participants();
			this.render();
		},
		
		events: {
			/*'dblclick .participant' : 'showDetails',
			'click .participant' : 'messageBox'*/
		},
		
		addEvent: function(){
			var parListWidth;
			$('body').on('click','#parListHideBtn', function() {
				parListWidth = $('#ParticipantListDiv').width(); 
				$('#ParticipantListDiv').animate({width: 0}, 'slow');
				$('#parListHideBtn').attr('id', 'parListShowBtn');
				$("#parListTopBar").toggle();
				$("#parList").toggle();
			});
			$('body').on('click','#parListShowBtn', function() {
				$('#ParticipantListDiv').animate({width: '+=' + parListWidth}, 'slow');
				$('#parListShowBtn').attr('id', 'parListHideBtn');
				$("#parListTopBar").toggle();
				$("#parList").toggle();
			});
		},
		
		/*
		messageBox: function(ev) {
			alert("Yes message box");
			var participant = $(ev.target).closest('li'),
				id = $(participant[0]).data('id'),
				name = $(participant[0]).data('name');
			//$('#messageDialog').attr("title", "Chat with " + name);	
					
			var dialogView = new DialogView();
			
			dialogView.render(id,name);
			$('#messageDialog').dialog({
				title: "Chat with " + name
			});
			
			
			getNonce()

			// Use the nonce to get an identity token
			.then(function(nonce) {
				return getIdentityToken(nonce);
			})

			// Use the identity token to get a session
			.then(function(identityToken) {
				return getSession(identityToken);
			})

			// Store the sessionToken so we can use it in the header for our requests
			.then(function(sessionToken) {
				layersample.headers.Authorization = 'Layer session-token="' + sessionToken + '"';
				// Now we can do stuff, like get a list of conversations
				return getConversations();
			})

			.then(function(conversations){
				return createConversation(["123",id]);     
			})

			.then(function(conversation) {
				layersample.conversationUrl = conversation.url;
			});
		},*/
		
		/*
		showDetails: function(ev) {
			alert("Yes show details");
			var participant =$(ev.target).closest('li');
			var email = $(participant[0]).data('email'); 		
			var participantView = new ParticipantView();
			participantView.render(email);
			$('#participantDialog').dialog();
			//ev.preventDefault();
		}, */
		
			/* evaluating underscore in external templates */
	evalUnderscore: function(evalSelector, jsonReplace) {
		var template = _.template($(evalSelector).html());    
		$(evalSelector).html(template(jsonReplace));
		$(evalSelector + " script").replaceWith($(evalSelector + " script").html());
	},
		
		render: function () {
			var that = this;
			gParticipants.fetch({
				success: function (gParticipants) {
					$("#ParticipantListDiv").css("display", "block");
					that.evalUnderscore('#parList', {participants: gParticipants.models});
				}
			}); 
			this.addEvent();
		}
	});
	return ParticipantsListView;
});
