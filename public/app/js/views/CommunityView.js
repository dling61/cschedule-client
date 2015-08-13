  var CommunityView = Backbone.View.extend({
    el: '.community-show',

    events: {
      "click .chatbutton": "popupChat",
      "click #message-btn": "chatMessage",
      "click #send_btn": "send_message"


    },

    initialize: function() {
      // _.bindAll(this);
      this.render();
    },

    send_message: function() {
      var sendmsg = $('textarea#message-text').html();
      alert(sendmsg);
       debugger;
     },
    chatMessage: function(ev) {
      $('#modalLabel').html(this.model.get('communityname'));
      $('#myModal').modal('show');
      this.displayConversations();
    },

  displayConversations: function(){
    var that = this;
    var c;
    var participantIds = ["id_1", "id_2"];
    getConversations() //ajax call
          .done(function(conversations) {
             c = conversations;
             debugger;
            //conservations from different communties 100 -10(c90045)
            
            if (checkConExist(conversations, "C90045")) { //true
               communityConversations = _.filter(conversations, function(conversation){
                  return conversation.metadata.CId === "C90045";
               });
               var template5 = _.template($("#message-template").html());
               $('#chat-messages').html(template5({msgs: communityConversations}));
                 
                debugger;
                getMessages(conversations[0].url)
                 .done(function (messages) {
                  var recipientStatus = messages[0].recipient_status
                  var template6 = _.template($("#recipent-status-template").html());
                 $('#recipant-status').html(template6({stats: recipientStatus}));
                 });
                 debugger;

            } else {
                console.log("conversations"+ conversations);
                createConversation(participantIds)
                    .done(function(conversation) {
                      console.log("conversations"+ conversations);
                      setConversationMetadata(c[0].url, name, "C" + 90045)
                          .done(function(arguments) {
                            that.displayConversations();
                    });
                });

            }

        });

    },

    popupChat: function() {
      $('#community-chat-popup').show();
    },

    render: function() {

        $('.community-show').show();
        $('#cbody').hide();
        var that = this,
          name = this.model.get('communityname');
        this.chats = new CommunityChats();
        this.chats.fetch({
          success: function(chatlist) {
            var template4 = _.template($("#chats-template").html());
            $('#chat-content').html(template4
              ({chats: chatlist.models} ));
              
            $('#chat-content').html('.close-popup');
          }


        });
        

      $('#showName').html(this.model.get('communityname'));

    }

  });