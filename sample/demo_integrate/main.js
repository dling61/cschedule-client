$(document).ready(function() {

  /* websocket code */
  (function() {

      // If this throws an error, then you have not loaded the rest sample yet.
      var layersample = window.layersample;
      var serverUrl = layersample.config.serverUrl.replace(/^https/, "wss");


      // Cache of all objects received via the websocket
      var objectCache = {};

      // Global for demonstration/debugging
      var currentMessage;

      var parser = new layer.js.LayerPatchParser({
          getObjectCallback: function(id) {
              return objectCache[id]
          },
          changeCallbacks: {
              Message: {
                  all: function(object, newValue, oldValue, paths) {
                    var prop = paths[0].replace(/^([^\.]*).*$/, "$1");
                    newValue = typeof newValue != "object" ? newValue : js_beautify(JSON.stringify(newValue));

                  }
              },
              Conversation: {
                  all: function(object, newValue, oldValue, paths) {
                    var prop = paths[0].replace(/^([^\.]*).*$/, "$1");
                    newValue = typeof newValue != "object" ? newValue : js_beautify(JSON.stringify(newValue));
                  }
              }
          }
      });


      function onMessage(evt) {
          var msg = JSON.parse(evt.data);

          switch(msg.type + "." + msg.operation) {

            // On receiving a create event, notify the app
            // of the new object, and cache the object
            case "change.create":
                objectCache[msg.object.id] = msg.data;


                if(msg.data.conversation.url == layersample.conversationUrl) {
                  //Use websocket to display real-time message for the current conversation
                  getOneConversation(msg.data.conversation.url)
                    .then(function(conversation) {
                      $("#con_history").prepend("<p>" + msg.data.sender.user_id + ": " + msg.data.parts[0].body + "</p>");
                    })
                }
                else {
                  //When there are new messages from other conversations, use notification or other methods to remind the user 
                  //Code needed here

                }

                //msg.data.parts[0].body , msg.data.sent_at, msg.data.conversation.url
          }
      }


      layersample.onSessionStart = function(token) {
          var socket = new WebSocket( serverUrl + "/websocket?session_token=" + token,
                                      "com.layer.notifications-1.0");
          console.log("WebSocket is open");
          socket.addEventListener("message", onMessage);
      };

      layersample.onSessionEnd = function() {
          console.log("WEBSOCKET END STATE:");
          for (var id in objectCache) {
              var o = objectCache[id];
              if (id.match(/conversations/)) {
                  console.log("&nbsp;&nbsp;&nbsp;" + id + ": " + o.participants + "; " + JSON.stringify(o.metadata));
              } else if (id.match(/messages/)) {
                  console.log("&nbsp;&nbsp;&nbsp;" + id + ": " + JSON.stringify(o.parts));
              }
          }
      };
  })();


  //Hard code that users join the conversation "demo_conversation"
  layersample.conversationUrl = "https://api.layer.com/conversations/10494954-a2a4-42c0-80e8-b532ba0069f2";

  $("#name_confirm").click(function() {

    var userId = $( "#name_list option:selected" ).val();

    alert("Welcome, " + userId);
    
    layersample.config.userId = userId;

    getNonce()

    .then(function(nonce) {
        return getIdentityToken(nonce);
    })

    .then(function(identityToken) {
        return getSession(identityToken);
    })

    .then(function(sessionToken) {
        layersample.headers.Authorization =
            'Layer session-token="' + sessionToken + '"';

        layersample.onSessionStart(sessionToken);

        return getOneConversation(layersample.conversationUrl);
    })
      
  });

  $("#add_confirm").click(function() {
    var userId = $('#add_user').val();
    $('#add_user').val('');
      getOneConversation(layersample.conversationUrl)
          
        .then(function(conversation) {
          addParticipant(conversation.url, userId);
          alert("You add " + userId + " to the conversation");
        });
  });


  $("#send_msg").click(function(){
    var msg = $('#msg_content').val();
    $('#msg_content').val('');
    

    getConversations()
      .then(function(conversations) {
        return getOneConversation(layersample.conversationUrl);
      })

      .then(function(conversation) {
          return sendMessage(conversation.url, msg, "text/plain");
      });
  });

  loadMessages();
  setInterval(loadMessages, 5000);
  
});


function loadMessages(){
    if(layersample.config.userId) {
      
      getOneConversation(layersample.conversationUrl)
 
        .then(function(conversation) {
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

            var msg_time = new Date(messages[i].sent_at);
            var msg_timeString = msg_time.toTimeString().split(' ')[0];
            var msg_dateString = msg_time.toDateString();

            if(layersample.config.userId == messages[i].sender.user_id) {
              $("#con_history").append("<p>" + messages[i].sender.user_id + ": " + messages[i].parts[0].body + " (" + unread_count + "/" + unread_total + ")" + "</br>" + msg_timeString + " " + msg_dateString + "</p>");
            }
            else {
              $("#con_history").append("<p>" + messages[i].sender.user_id + ": " + messages[i].parts[0].body + "</br>" + msg_timeString + " " + msg_dateString +  "</p>");
            }            
          }
        });
    }
    
}