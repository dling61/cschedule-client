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

                if(msg.data.conversation) {
                  var open_index = layersample.openConversationUrlList.indexOf(msg.data.conversation.url);

                  //Directly attach new messages to the open conversations
                  if(open_index != -1) {
                    //Use websocket to display real-time messages for the current open conversations
                    getOneConversation(msg.data.conversation.url)
                      .then(function(conversation) {
                        $('#conHistory_' + layersample.openConversationUrlIndexList[open_index]).prepend("<p>" + msg.data.sender.user_id + ": " + msg.data.parts[0].body + "</p>");
                      })
                  }

                  //Alert the user when new messages come from unopen conversations
                  for(var j=0; j<layersample.conversationList.length; j++) {
                    if(msg.data.conversation.url == layersample.conversationList[j].url && open_index == -1) {
                      getOneConversation(msg.data.conversation.url)
                        .then(function(conversation){
                          alert("You got new message! '" + msg.data.parts[0].body + "' from " + msg.data.sender.user_id + " in Conversation: " + conversation.metadata.title);
                        });    
                    }
                  }
                }
              
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

  /* Confirm userId and list his existed conversations */
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

        return getConversations();
    })

    .then(function(conversations){
      layersample.conversationList = conversations;
      // console.log(conversations);
      if(conversations.length) {
        alert("You have some existed conversations");
        $("#existed_cons").append('<p>Choose one from your existed conversations</p>')
        for(var i=0; i<conversations.length; i++) {
          $("#existed_cons").append('<p><button id="con_' + i + '" class="chat_opts">' + conversations[i].metadata.title + '</button></p>');
          $("#existed_cons").append('<p><button id="del_' + i + '" class="del_opts">Delete</button></p>');
        }        
      }
    });
      
  });

  /* watch the selection on existed conversation and create the selected conversation box */
  $("#existed_cons").on('click', '.chat_opts', function(){   
    var con_num = $(this).attr("id");
    var con_index = con_num.split('_')[1];

  
    //Every time click an existed conversation button, add the conversation url to the list and show its box
    if(layersample.openConversationUrlList.indexOf(layersample.conversationList[con_index].url) == -1) {
      alert("You join the conversation: " + $(this).html());
      layersample.openConversationUrlList.push(layersample.conversationList[con_index].url);
      layersample.openConversationUrlIndexList.push(con_index);
      $("#all_cons").append('<div class="chat_box"><h3>' + $(this).html()
                          + '</h3><p id="people_' + con_index + '">Participants: ' + layersample.conversationList[con_index].participants 
                          + '</p><p>Add a participant: </p><input type="text" id="addUser_' + con_index 
                          + '"><button class="add_user" id="add_' + con_index 
                          + '">Add</button><p>Remove a participant: </p><input type="text" id="removeUser_' + con_index 
                          + '"><button class="remove_user" id="remove_' + con_index 
                          + '">Remove</button><p>Send Messages: </p><input type="text" id="msg_' + con_index 
                          + '"><button class="send_msg" id="send_' + con_index 
                          + '">Send</button><div id="conHistory_' + con_index 
                          + '"></div></div>');
    }
    else {
      alert("You've already joined the conversation: " + $(this).html());
    }
    
  });

  /* watch the deletion on existed conversations and update the global layersample var and page after deletion */
  $("#existed_cons").on('click', '.del_opts', function(){   
    var del_num = $(this).attr("id");
    var del_index = del_num.split('_')[1];
    var con_id = "con_" + del_index;


    var delUrl = layersample.conversationList[del_index].url;
    deleteResource(delUrl);

    //?update conversations, openConversationUrlList, openConversationUrlList lists
    // layersample.conversationList.splice(del_index, 1);
    // var open_index = layersample.openConversationUrlList.indexOf(delUrl);
    // if(open_index != -1) {
    //   layersample.openConversationUrlList.splice(open_index, 1);
    //   layersample.openConversationUrlIndexList.splice(open_index, 1);
    // }


    alert("You delete a conversation");

    $('#' + con_id).remove();
    $(this).remove();
  });

  /* Create new conversation and update the existed conversations section */
  $("#confirm_invite").click(function() {

    var person_list = [layersample.config.userId];

    var res = $('#invite_person').val().split(" ");

    person_list = person_list.concat(res);

    var title = $('#con_name').val();
    var con_id = $('#con_id').val();

    createConversation(person_list)  
  
      .then(function(conversation) {
        setConversationMetadata(conversation.url, title, con_id);
        layersample.conversationList.push(conversation);
        var index = layersample.conversationList.length - 1;
        $("#existed_cons").append('<p><button id="con_' + index + '" class="chat_opts">' + title + '</button></p>');
        $("#existed_cons").append('<p><button id="del_' + index + '" class="del_opts">Delete</button></p>');
      });
    
    alert("You create a conversation named " + title + " with " + person_list.slice(1, person_list.length));
    
    $('#invite_person').val('');
    $('#con_name').val('');
    $('#con_id').val('');    
  });

  /* watch the add participant behavior and update the <p> after confirmation */
  $("#all_cons").on('click', '.add_user', function() {
    var con_index = $(this).attr("id").split('_')[1];
    var userId = $('#addUser_' + con_index).val();
    $('#addUser_' + con_index).val('');

    addParticipant(layersample.conversationList[con_index].url, userId)
      .then(function(){
        var preText = $("#people_" + con_index).text();
        var newText = preText + "," + userId;
        $("#people_" + con_index).text(newText);
        alert("You add " + userId + " to the conversation");
      })
  });

  /* watch the remove participant behavior and update the <p> after confirmation */
  $("#all_cons").on('click', '.remove_user', function() {
    var con_index = $(this).attr("id").split('_')[1];
    var userId = $('#removeUser_' + con_index).val();
    $('#removeUser_' + con_index).val('');
    
    removeParticipant(layersample.conversationList[con_index].url, userId)
      .then(function(){
        var prePeople = $("#people_" + con_index).text().split(':')[1].split(',');
        var remove_index = prePeople.indexOf(userId);
        prePeople.splice(remove_index, 1);
        var newPeople = "Participants: " + prePeople.join(',');
        $("#people_" + con_index).text(newPeople);
        alert("You remove " + userId + " from the conversation");
      })
  });

  /* watch send msg behavior */
  $("#all_cons").on('click', '.send_msg', function() {
    var con_index = $(this).attr("id").split('_')[1];
    var msg = $('#msg_' + con_index).val();
    $('#msg_' + con_index).val('');

    sendMessage(layersample.conversationList[con_index].url, msg, "text/plain");   

  });

  setInterval(function(){
    if(layersample.openConversationUrlList.length) {
      loadMessages();
    }
  }, 5000);
  
  
});



function loadMessages(){
    
    for(var i=0; i<layersample.openConversationUrlList.length; i++) {

      (function(i){
        getMessages(layersample.openConversationUrlList[i])

          .then(function(messages) {
            if(layersample.msgNumList[i] == undefined) {
              for(var j=0; j<messages.length; j++) {
                if(!messages[j].is_unread) {
                  layersample.msgNumList[i] = messages.length - j;
                  return;
                }
                else {
                  layersample.msgNumList[i] = 0;
                  return;
                }
              }            
            }

            if(messages.length > layersample.msgNumList[i]) {
              var diff = messages.length - layersample.msgNumList[i];
              for(var j=0; j<diff; j++) {
                markAsRead(messages[j].url);
              }
              layersample.msgNumList[i] = messages.length;
            }
            
            $('#conHistory_' + layersample.openConversationUrlIndexList[i]).empty();

            for(var k=0; k<messages.length; k++) {
              var read_count = 0;
              var unread_total = Object.keys(messages[k].recipient_status).length - 1;
              for(var key in messages[k].recipient_status) {
                if(messages[k].recipient_status[key] == "read") {
                  read_count++;
                }
              }
              read_count = read_count - 1;

              var msg_time = new Date(messages[k].sent_at);
              var msg_timeString = msg_time.toTimeString().split(' ')[0];
              var msg_dateString = msg_time.toDateString();

              if(layersample.config.userId == messages[k].sender.user_id) {
                $('#conHistory_' + layersample.openConversationUrlIndexList[i]).append("<p>" + messages[k].sender.user_id + ": " + messages[k].parts[0].body 
                                          + " (" + read_count + "/" + unread_total + ")" + "</br>" + msg_dateString + " " + msg_timeString + "</p>");
              }
              else {
                $('#conHistory_' + layersample.openConversationUrlIndexList[i]).append("<p>" + messages[k].sender.user_id + ": " + messages[k].parts[0].body 
                                          + "</br>" + msg_dateString + " " + msg_timeString +  "</p>");
              }            
            }
          });
      })(i);
      
    }

    
}