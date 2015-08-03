    var CommunityListView = Backbone.View.extend({
        
        
        el: '.community-list-view',

        events: {
         "dblclick .community": 'onEditCommunity',
         "click .create-btn": 'showCreateCommunity',
         "click .btn-create": 'createNewCommunity',
         "click .btn-edit-cancel": "hideEditCommunity"
         },

        initialize: function() {
           // _.bindAll(this);
        },

        createNewCommunity: function() {
           var communitynamesArray =  this.collection.pluck("communityname"),
               communityName =  $('#input').val(),
               community;
             
           if( _.contains(communitynamesArray,communityName)){
              alert("Enter valid community name Community name already Exists");

            } else {
                community = new Community({
                    ownerid: 9,
                    communityname: $('#input').val(),

                    desp: "test communityname",
                    communityid: 90039

                });
                
                community.save({},{ 
                    success : function () {
                        alert("you have successfully created community");
                         $('.createCommunity').hide();
                    },
                    error: function(model, response){
                        alert("Error in creatiing community:: "+ response.statusText);
                    }
                 });
           }
        },
        
        showCreateCommunity: function(ev) {
            
            $('.createCommunity').show();
            $('.create-btn').hide();
        },

        onEditCommunity: function(ev){
            debugger;
            var communityId = ev.target.getAttribute('data-id');
            communities = this.collection.where({"id": communityId}); 
            debugger;
            
            
            var communityEditView = new CommunityEditView({ model : communities[0]});
            
            communityEditView.render();
        },
        hideEditCommunity: function(){
            $('.editCommunity').hide();

        },

        render: function () {
            var that = this;
            this.collection = new Communities();
            //communities.fetch({
            this.collection.fetch(
            {
                data: $.param({ownerid:3}),
                success: function (communityList) {
                    
                    var template1 = _.template($('#community-list-template').html());
                    var template2 = _.template($("#community-dropdown-template").html());
                    //debugger;
                    //apply data to template to get html
                    //that.$el.html(template1({communities: communities.models}));
                    $(".nav-body").html(template1({communities: that.collection.models}));
                    $("#community-drop-down").html(template2({communities: that.collection.models}));
                }
            })

        },

               
    });