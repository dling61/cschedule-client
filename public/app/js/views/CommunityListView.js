    var CommunityListView = Backbone.View.extend({


      el: '.community-list-view',

      events: {
       "dblclick .community": 'deleteCommunity' , 
       "click .community": 'viewCommunity' ,  
       "click .community-name": 'onEditCommunity',
       "click .create-btn": 'showCreateCommunity',
       "click .btn-create": 'createNewCommunity',
       "click .btn-edit-cancel": "hideEditCommunity",
       "click .cancel-create": "hideCreate",
       "click .personDetails": "listUsers"
     },

     initialize: function() {
           // _.bindAll(this);
           this.render();
         },
         listUsers: function () {
          var loggedusers = new loggedInUsers();
          console.log("in view");

          $.getJSON("persons.json", function(data, status) {



            console.log("Name: " + data + "\nStatus: " + status);

          });



        },
        deleteCommunity: function(ev) {


          var that =this;
          alert("Are you sure you want to deleteCommunity");

          var communityId = ev.target.getAttribute('data-id');
          communities = that.collection.where({"id": communityId}); 
          console.info(that.collection.toJSON());
          communities[0].destroy({
            success : function () {
              alert("you have  deleted community");

            },
            error: function(model, response){

              alert("Error in deleting Community "+ response.statusText);
            }

          });
          var deletedcommunity = that.collection.remove(communities[0]);

          console.info(this.collection.toJSON());
          alert('you have deleted '+ name);
          this.render();

        },


        
        viewCommunity: function(ev) {



         var communityId = ev.target.getAttribute('data-id');
         var communities = this.collection.where({"id": communityId}); 

         var name = communities[0].get('communityname');

         alert("Welcome to "+ name);


       },

       createNewCommunity: function() {
         var communitynamesArray =  this.collection.pluck("communityname"),
         communityName =  $('#input').val(),
         community;

         if( _.contains(communitynamesArray,communityName)){
          alert("Enter valid community name,Community name already Exists");
        } else {
          community = new Community({
            ownerid: 2,
            communityname: $('#input').val(),

            desp: "test communityname",
            communityid: 90042

          });

          community.save({},{ 
            success : function () {
              alert("you have successfully created community");
              $('.createCommunity').hide();
            },
            error: function(model, response){

              alert("Error in creatiing Community "+ response.statusText);
            }
          });
        }
        $('.createCommunity').hide();
      },
      hideCreate: function() {
       $('.createCommunity').hide();
       $('.create-btn').show();

     },

     showCreateCommunity: function(ev) {

      $('.createCommunity').show();
      $('.create-btn').hide();
    },

    onEditCommunity: function(ev){

     ev.stopPropagation();
     var communitynamesArray =  this.collection.pluck("communityname");
     var communityId = ev.target.parentElement.getAttribute('data-id');
     communities = this.collection.where({"id": communityId}); 

     var communityEditView = new CommunityEditView({ model : communities[0]});

     communityEditView.render(communitynamesArray);
   },
   hideEditCommunity: function(){
    $('.editCommunity').hide();

  },

  render: function () {

    var that = this;
    this.users = new loggedInUsers();
    this.users.fetch(
    {
      success: function (users) {
        var template3 = _.template($("#users-dropdown-template").html());
        $("#users-drop-down").html(template3({loggedInUsers: users.models}));
      }
    });

    this.collection = new Communities();

    this.collection.fetch(
    {

      data: $.param({ownerid:3}),
      success: function (communityList) {

        var template1 = _.template($('#community-list-template').html());
        var template2 = _.template($("#community-dropdown-template").html());

        $(".nav-body").html(template1({communities: that.collection.models}));
        $("#community-drop-down").html(template2({communities: that.collection.models}));

      }
    })
  },


});