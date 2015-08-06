  var CommunityView = Backbone.View.extend({
  	el: '.community-show',

  	events: {
  		"click .chatbutton": "popupChat"
  	},

  	initialize: function() {
  		// _.bindAll(this);
  		this.render();
  	},


  	popupChat: function() {
  		$('#community-chat-popup').show();
  	},

  	render: function(){

  		$('.community-show').show();
        $('#cbody').hide();
		var that = this;
		this.chats = new CommunityChats();
		this.chats.fetch({
			success: function(chatlist) {
				var template4 = _.template($("#chats-template").html());
				debugger;
				$('#chat-content').html(template4({chats: chatlist.models
				}));
				$('#chat-content').html('.close-popup');
			}


		});

        $('#showName').html(this.model.get('communityname'));

  	}

  });