/*    
window.JST['user/edit'] = _.template(

);


    <script type="text/template" id="display-user-template">
        <img src = '<%= user.profile %>'>
        <h2 id= 'updateusername' contenteditable="true" contenteditable="true"><%= user.username %></h2>
        <p>Email: <%= user.email %></span></p>
        Mobile:<span id='updatemobile' contenteditable="true"><%= user.mobile %></span>
        <hr />
        <button id ="deleteParticipant" value=<%= user.id %> >Remove</button>
        <button id ="updateUser" value=<%= user.id %> >Update</button>
    </script>

    <script type="text/template" id="messageBox-template">
    ID:<%= id%>
    <br>
    Name:<%= name %>
    <br>
    <input type = text ></input>

    <div id="con_history"></div>


    </script>
*/

var ParticipantView = Backbone.View.extend({
    el: '#participantDialog',
	events:{
		'click #deleteParticipant':'deleteParticipant',
		'click #updateUser':'updateUser',
	},
	
    render: function (email) {
        var that = this;
        var users = new Users();
        users.fetch({
			data: $.param({email:email}),
          	success: function (users) {
                var template = _.template($('#display-user-template').html());              
                $("#participantDialog").html(template({user:users.models[0].attributes}));				
            }
        });	    
    },
	
	updateUser:function(ev){
		var userUpdate = new UserUpdate();
		var username = $("#updateusername").html();
		var mobile = $("#updatemobile").html();
		userUpdate.save({id:ev.target.value,username:username,mobile:mobile},{
			success:function(){
			var userListView = new UserListView();
			userListView.render();
			$('#participantDialog').dialog('close');
			}
		});
	},
	
	deleteParticipant: function(ev){
		var participant = new Participant({id:ev.target.value});
		participant.destroy({
			success: function(){
				var userListView = new UserListView();
	            userListView.render(); 
				$('#participantDialog').dialog('close');
			},
		});		
	}
});

