$(document).ready(function() {

  //Hard code that Bill is the current user to search/creat a conversation,
  //since layer needs a userId to authenticate and then use their API
  layersample.config.userId = 'Bill';

  //This title_exist variable is just defined for test. You can delete it when using this file
  var title_exist;

  $("#submit_title").click(function(){

    var search_title = $("#con_title").val();

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

          return getConversations();
      })

      .then(function(conversations) {
        if(checkConExist(conversations, search_title)) {
          title_exist = true;
          console.log(title_exist);
          alert("The conversation has existed. Just join it");
        }
        else {
          title_exist = false;
          console.log(title_exist);

          //Hard code to create a conversation 
          createConversation(['Kalyani', 'Tony', 'Bruce', 'Charles', 'Jian'])
            .then(function(conversation) {
              layersample.conversationUrl = conversation.url;

              //Hard code to set the CId for the conversation
              setConversationMetadata(conversation.url, search_title, 'C001');
            });
          alert("New conversation " + search_title + " has been created for you");
        }
      })
  });
});