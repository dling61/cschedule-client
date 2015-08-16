var UserListView = Backbone.View.extend({
    el: '.MemberList',
	events:{
		'dblclick .participant'   : 'showDetails',
		'click .participant':'messageBox'
	},
	
	
	messageBox:function(ev){
		var participant =$(ev.target).closest('li');
		var id = $(participant[0]).data('id');
		var name = $(participant[0]).data('name');
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
          layersample.headers.Authorization =
              'Layer session-token="' + sessionToken + '"';

          // Now we can do stuff, like get a list of conversations
          return getConversations();
      })

      .then(function(conversations){
        return createConversation(["123",id]);     
      })

      .then(function(conversation) {
        layersample.conversationUrl = conversation.url;
     
      });
		
		
		
		
		
		
		
	},
	
	
	showDetails:function(ev){
		var participant =$(ev.target).closest('li');
		var email = $(participant[0]).data('email'); 		
		var participantView = new ParticipantView();
		participantView.render(email);
		$('#participantDialog').dialog();
        //ev.preventDefault();
	},
		
	
    render: function () {
        var that = this;
        gParticipants = new Participants();
        gParticipants.fetch({
            success: function (gParticipants) {
                var template = _.template($('#user-list-template').html());              
                $(".MemberList").html(template({participants: gParticipants.models}));
            }
        })
    }
});

