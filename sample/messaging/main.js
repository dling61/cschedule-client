$(document).ready(function() {
  $("#submit_name").click(function() {
    layersample.config.userId = $('#user_name').val();
    alert("Welcome to the chatroom, " +  $('#user_name').val());
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
        if(conversations.length) {
          alert("You have some existed chats");
          for(var i=0; i<conversations.length; i++) {
            $("#existed_cons").append('<p><button id="con_' + i + '" class="chat_opts">' + conversations[i].metadata.title + '</button></p>');
          }          
        }
      });
      
  });


  $("#existed_cons").on('click', '.chat_opts', function(){   
    var con_num = $(this).attr("id");
    var con_index = con_num.split('_')[1];

    layersample.conversationIndex = con_index;

    alert("You join the chat with " + $(this).html());
  });

  $("#send_msg").click(function(){
    var msg = $('#msg_content').val();
    $('#msg_content').val('');

    getConversations()
      .then(function(conversations) {
        if(layersample.conversationUrl == null) {
          layersample.conversationUrl = conversations[layersample.conversationIndex].url;
        }        
        return getOneConversation(layersample.conversationUrl);
      })

      // getOneConversation returns a conversation identical to sampleConversation
      .then(function(conversation) {

          // Lets send a message on that conversation
          return sendMessage(conversation.url, msg, "text/plain");
      });
  });



  $("#confirm_invite").click(function() {

    var person_list = [layersample.config.userId];

    var res = $('#invite_person').val().split(" ");

    person_list = person_list.concat(res);

    var title = $('#con_name').val();
    var con_id = $('#con_id').val();

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
        return createConversation(person_list);     
      })

      .then(function(conversation) {
        layersample.conversationUrl = conversation.url;
        setConversationMetadata(conversation.url, title, con_id);
      });
    
    alert("You've added " + person_list.slice(1, person_list.length) + " to the chat");
  });


  loadMessages();
  setInterval(loadMessages, 5000);
  
});


function loadMessages(){
    if(layersample.conversationUrl || layersample.conversationIndex) {
      getConversations()
        .then(function(conversations) {
          if(layersample.conversationUrl == null) {
            layersample.conversationUrl = conversations[layersample.conversationIndex].url;
            return getOneConversation(conversations[layersample.conversationIndex].url);
          } else {
            return getOneConversation(layersample.conversationUrl);
          }
          
        })

        // getOneConversation returns a conversation identical to sampleConversation
        .then(function(conversation) {

            // Lets send a message on that conversation
            return getMessages(conversation.url);
        })
        .then(function(messages) {
          if(layersample.msgNum == null) {
            for(var i=0; i<messages.length; i++) {
              if(!messages[i].is_unread) {
                layersample.msgNum = messages.length - i;
                return;
              }
            }            
          }
          
          if(messages.length > layersample.msgNum) {
            var diff = messages.length - layersample.msgNum;
            for(var i=0; i<diff; i++) {
              markAsRead(messages[i].url);
            }
            layersample.msgNum = messages.length;
          }

          $("#con_history").empty();
          for(var i=0; i<messages.length; i++) {
            var unread_count = 0;
            var unread_total = Object.keys(messages[i].recipient_status).length - 1;
            for(var key in messages[i].recipient_status) {
              if(messages[i].recipient_status[key] == "read") {
                unread_count++;
              }
            }
            unread_count = unread_count - 1;
            if(layersample.config.userId == messages[i].sender.user_id) {
              $("#con_history").append("<p>" + messages[i].sender.user_id + ": " + messages[i].parts[0].body + " (" + unread_count + "/" + unread_total + ")" +"</p>");
            }
            else {
              $("#con_history").append("<p>" + messages[i].sender.user_id + ": " + messages[i].parts[0].body + "</p>");
            }            
          }
        });
    }
    
}