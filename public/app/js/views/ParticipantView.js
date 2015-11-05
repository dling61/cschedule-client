
    /*
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
	
	//Initializes variables
	initImageAreas: function(){
		var cvsUpld = document.getElementById("uploadImg"),
			ctxUpld = cvsUpld.getContext("2d"),
			cvsSave = document.getElementById("saveImg"),
			ctxSave = cvsSave.getContext("2d"),
			img 	= document.createElement("img"),
			zoom 	= 1,
			maxZoom	= 0,
			zoomSpd = .3;
			stop 	= false;
		
		//Prevents browser from taking the picture link and displaying it
		$("#createEventView").on("dragover", function(e) {
			e.preventDefault();
		}, false);

		//Enables drag and drop
		cvsUpld.addEventListener("dragover", function(e) {
			e.preventDefault();
		}, false);
		
		//Waits for image to be dropped and then load
		img.addEventListener("load", function() {
			ctxUpld.drawImage(img, 0, 0, cvsUpld.width, cvsUpld.height);
		}, false);
		
		//Handles dropped image (currently reading all drops in entire body)
		//Can use jquery to get drop zone instead of document.getElementById("body")
		var loadImage = function(e) {
			var files = e.target.files;			//For input
			if (typeof files == "undefined") {
				files = e.dataTransfer.files;	//For drag and drop
			}
			if (files.length > 0) {
				var file = files[0];
				if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
					var reader = new FileReader();
					reader.onload = function (e) {
						img.src = e.target.result;
					};
					reader.readAsDataURL(file);
				}
			}
			e.preventDefault();
		};
		$("#createEventView").on("drop", loadImage, false);
		document.getElementById("uploadBtn").addEventListener("change", loadImage, false);

		//Follows the mouse on the upload canvas and displays in the save canvas
		//Uses other form in order to use when zooming in
		var selectImg = function(e) {
			if (!stop) {
				//Determines origin and transformation locations and sizes
				var rect = cvsUpld.getBoundingClientRect(),
					originX = (e.clientX-rect.left) * (img.width/cvsUpld.width) - (cvsSave.width*zoom/2),
					originY = (e.clientY-rect.top) * (img.height/cvsUpld.height) - (cvsSave.height*zoom/2),
					originW = cvsSave.width * zoom,
					originH = cvsSave.height * zoom,
					transfX = 0,
					transfY = 0,
					transfW = cvsSave.width,
					transfH = cvsSave.height;
				//If it goes out of bounds because the area of the saveImage canvas is too big
				if (originX < 0) {
					//transfX = -originX/zoom; //Show whitespace, comment out to stop at edge
					originX = 0;
				}
				if (originY < 0) {
					//transfY = -originY/zoom; //Show whitespace, comment out to stop at edge
					originY = 0;
				}
				if (img.width < originX + originW) {
					//transfW = (img.width - originX)/zoom;	//Show whitespace
					originX = img.width - originW;		//Switch code to stop at edge
				}
				if (img.height < originY + originH) {
					//transfH = (img.height - originY)/zoom;	//Show whitespace
					originY = img.height - originH;		//Switch code to stop at edge
				}
				//Clears the saveImage canvas
				ctxSave.clearRect(0, 0, cvsSave.width, cvsSave.height);
				//Draws onto the saveImage canvas
				ctxSave.drawImage(img, originX, originY, originW, originH, transfX, transfY, transfW, transfH);
			}
		};
		cvsUpld.addEventListener("mousemove", selectImg);	
		
		//Sets the upper boundary of zoom for Firefox's sake AFTER image loads
		img.addEventListener("load", function(){
			zoom = 1;
			maxZoom = img.width/cvsSave.width;
			if (maxZoom > img.height/cvsSave.height) {
				maxZoom = img.height/cvsSave.height;
			}
		}, false);
			
		//Zooms in and out, boundaries are for firefox
		cvsUpld.addEventListener("wheel", function(e) {
			if (e.deltaY < 0){
				if (zoom + zoomSpd < maxZoom) {
					zoom += zoomSpd;  
				}
			} else {
				if (zoom > zoomSpd){
					zoom -= zoomSpd;
				}
			};
			//Rounds the number
			zoom = Math.round(zoom * 100) / 100; 
			//Updates the picture after zooming
			selectImg(e); 
		}, false);

		//Stops the save canvas from following the mouse
		cvsUpld.addEventListener("click", function() {
			stop = !stop;
		}, false);

		//Saves the image as a quadrilateral png
		$("#saveButton").click(function() {
			var data = cvsSave.toDataURL("image/png");
			var image = data.replace('data:image/png;base64,', '');
			var imgJSON = '{"data":"' + image + '","extension":"png","ownerid":"' + gLoginUserId + '"}';
			$.ajax({
				type: 'POST',
				url: 'creator/upload?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.2.0&',
				data: imgJSON,
				contentType: 'application/json',
				dataType: 'json',
				complete: function(xhr) {
					alert(xhr.status);
				}
			});
		});
	},
	
    render: function (email) {
		var user = gParticipants.findWhere({id: gLoginUserId}); 
		var template = _.template($('#editParticipantDialog').html());    
		$("#participant-show").html(template({user: user.attributes}));
		//$("#participant-show").show();
		this.initImageAreas();
		/*
        var that = this;
        var users = new Users();
        users.fetch({
			data: $.param({email:email}),
          	success: function (users) {
                var template = _.template($('#display-user-template').html());    
                $("#participantDialog").html(template({user:users.models[0].attributes}));	
				this.initImageAreas();
            }
        });	    
		*/
		//createEventdialogueview
    },
	
	updateUser:function(ev){
		var userUpdate = new UserUpdate();
		var username = $("#updateusername").html();
		var mobile = $("#updatemobile").html();
		var profilePic = gLoginUserId + ".png";
		userUpdate.save({id:ev.target.value,username:username,mobile:mobile,profile:profilePic},{
			success:function(){
				var participantsListView = new ParticipantsListView();
				participantsListView.render();
				$('#participantDialog').dialog('close');
			}
		});
	},
	
	deleteParticipant: function(ev){
		var participant = new Participant({id:ev.target.value});
		participant.destroy({
			success: function(){
				var participantsListView = new ParticipantsListView();
	            participantsListView.render(); 
				$('#participantDialog').dialog('close');
			},
		});		
	}
});


