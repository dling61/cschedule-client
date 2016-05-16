define([
	'js/collections/Participants',
	'drop',
	'backbone',
], function(Participants,Drop){
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
			$('body').on('click','#parListHideBtn', function() { 
				$('#ParticipantListDiv').css("visibility","hidden") ;
				$('#parListHideBtn').attr('id', 'parListShowBtn');
				
			});
			$('body').on('click','#parListShowBtn', function() {
				$('#ParticipantListDiv').css("visibility","visible") ;
				$('#parListShowBtn').attr('id', 'parListHideBtn');
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
		
/* evaluating underscore in external templates, remove after it is placed into correct place */
		evalUnderscore: function(evalSelector, jsonReplace) {
			var template = _.template($(evalSelector).html());    
			$(evalSelector).html(template(jsonReplace));
			$(evalSelector + " script").replaceWith($(evalSelector + " script").html());
		},
		
		/* render what we want displayed */
		render: function () {
			var that = this;
			gParticipants.fetch({
				success: function (gParticipants) {
					$("#ParticipantListDiv").css("display", "block");
					that.evalUnderscore('#parList', {participants: gParticipants.models});
					
					/*Flyouts configured for multiple elements*/
					var flyouts = document.getElementsByClassName('pListProfileFlyout'), 
						i, 
						newDiv;
					for (i = 0; i < flyouts.length; ++i) {
						newDiv = '<img src=' +gParticipants.models[i].get("profile")+ '>';
						window["pListProfileDrop" + i] = new Drop({
							target: flyouts[i],
							content: newDiv,
							position: 'bottom left',
							openOn: 'click',
							classes: 'drop-theme-arrows-bounce-dark',		
						});
					}
					flyouts = document.getElementsByClassName('pListIcon1Flyout');
					for (i = 0; i < flyouts.length; ++i) {
						newDiv = '<form>' +
							'Name <input type="text" name="name" value="'+gParticipants.models[i].get("name")+'"><br>' +
							'Position <input type="text" name="position" value="'+gParticipants.models[i].get("position")+'"><br>' +
							'Title <input type="text" name="title" value="'+gParticipants.models[i].get("title")+'"><br>' +
							'Phone <input type="text" name="phone" value="'+gParticipants.models[i].get("phone")+'"><br>' +
							'Email <input type="text" name="email" value="'+gParticipants.models[i].get("email")+'"><br>' +
							'<input type="submit" value="Submit">' +
						'</form>';
						window["pListIcon1Drop" + i] = new Drop({
							target: flyouts[i],
							content: newDiv,
							position: 'bottom right',
							openOn: 'click',
							classes: 'drop-theme-arrows-bounce-dark',		
						});
					}
					$("#AddParticipantDiv").css("display", "block");
					newDiv = document.getElementById("AddParticipantDiv");
					flyouts = document.querySelector('.addParticipantFlyout');
					var addPartDrop = new Drop({
						target: flyouts,
						content: newDiv,
						position: 'bottom right',
						openOn: 'click',
						classes: 'drop-theme-arrows-bounce-dark',	
						beforeClose: myConfirmCloseFunc
					});
					function myConfirmCloseFunc() {
						return false;
					}
				}
			}); 
			this.addEvent();
		}
	});
	return ParticipantsListView;
});
