define([
    'underscore',
    'backbone',
    'drop',
    'js/collections/communities',
    'js/views/ParticipantsListView',
    'js/views/ParticipantView',
    'js/views/UserAddView',
    'js/views/EventsView',
    'js/collections/EventsC',
    'js/views/eventDialogView'

], function(_, Backbone, Drop, Communities, ParticipantsListView,
    ParticipantView, UserAddView, EventsView, EventsC,
    eventDialogView
) {



    /* Template */
    function loadTemplateCommunity(importID, templateID) {
        var t = document.querySelector(importID),
            t = t.import.querySelector(templateID),
            t = t.content.cloneNode(true);
        return t;
    }

    /*

              

    			<div id="community-chat-popup" class="overlay">
    				<div class="popup">
    					<div id="chat-content" class="content">
    						<a id="close" href="#">×</a>
    					</div>
    				</div>
    			</div>
    	
    			<div id="chatbox">
    				<div class="cchat">
    					<h5>CommunityName </h5>
    					  <a class="close" href="#"> X </a>
    					 
    					<div id="displayconversations"style="width:60px"></div>
    					<div class="chat-text"><textarea style="border-color: blue"></textarea></div>
    				</div>
    				<div id="sendchat"><button>Send</button></div>
    			</div>


    			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
    			  <div class="modal-dialog" role="document">
    			    <div class="modal-content">
    			      <div class="modal-header">
    			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    			        <h4 class="modal-title" id="modalLabel">Community Name	</h4>
    			      </div>
    			      <div class="modal-body">
    			      	<ul id="chat-messages">
    			      	</ul>
    			      	<div id="recipant-status"></div>
    			        <form>
    			          <div class="form-group">
    			            <!-- <label for="message-text" class="control-label">Message:</label> -->
    			            <textarea class="form-control" id="message-text"></textarea>
    			          </div>
    			        </form>
    			      </div>
    			      <div class="modal-footer">
    			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    			        <button type="button" class="btn btn-primary" id= "send_btn">Send message</button>
    			      </div>
    			    </div>
    			  </div>
    			</div>
                
    */

    var CommunityView = Backbone.View.extend({
        el: '.community-show',

        currentConversation: null,

        events: {
            "click .chatbutton": "popupChat",
            "click #message-btn": "chatMessage",
            "click #send_btn": "send_message"
        },

        initialize: function() {
            gFetchedEvents = null;
            this.render();
        },

        send_message: function() {
            var that = this,
                sendmsg = $('textarea#message-text').val();
            sendMessage(this.currentConversation.url, sendmsg, "text/plain")
                .done(function() {
                    that.displayConversations();
                })
            $('textarea#message-text').val("");
        },

        chatMessage: function(ev) {
            $('#modalLabel').html(this.model.get('communityname'));
            $('#myModal').modal('show');
            this.displayConversations();
        },

        displayConversations: function() {
            var that = this;
            var c;
            var participantIds = ["id_1", "id_2"];
            getConversations()
                .done(function(conversations) {
                    c = conversations;
                    //conservations from different communties 100 -10(c90045)

                    if (checkConExist(conversations, "C90045")) { //true
                        communityConversations = _.filter(conversations, function(conversation) {
                            return conversation.metadata.CId === "C90045";
                        });
                        that.currentConversation = conversations[0];
                        getMessages(that.currentConversation.url)
                            .done(function(messages) {
                                var template5 = _.template($("#message-template").html());
                                $('#chat-messages').html(template5({
                                    msgs: messages
                                }));
                            });
                    } else {
                        console.log("conversations" + conversations);
                        createConversation(participantIds)
                            .done(function(conversation) {
                                console.log("conversations" + conversations);
                                debugger;
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
            var that = this;
            //name = this.model.get('communityname');

            $('.community-show').show();
            $('#cbody').hide();


            /* WFB        
                  this.chats = new CommunityChats();
                  this.chats.fetch({
                    success: function(chatlist) {
                      var template4 = _.template($("#chats-template").html());
                      $('#chat-content').html(template4({
                        chats: chatlist.models
                      }));

                      $('#chat-content').html('.close-popup');
                    }
                  });
            */

            $('#showName').html(this.model.get('communityname'));


            communityEvents = new EventsC();

            gEventsView = new EventsView({
                el: $("#calendar"),
                collection: communityEvents
            });


            gEventsView2 = new EventsView({
                el: $("#calendar2"),
                collection: communityEvents
            });


            /* WFB    
            gEventView = new EventView({
                  el: $("#eventView"),
                  // collection: communityEvents
            });
            */
            gTasksView = [];
            gEventsView.render();
            gEventsView2.render();

            gParticipantsListView = new ParticipantsListView();
            participantView = new ParticipantView();
            userAddView = new UserAddView();

            $("body").append($.loadTemplate("#createEventViewTpl"));

            /* evaluating underscore in external templates, 
               remove after it is placed into correct place */

            $.evalUnderscore('#createEventDialog', {
                participants: gParticipants.models
            });

            /* gEventView = new EventView();
            gEventView.render(); */

        }

    });
    return CommunityView;
});