var CommunityEditView = Backbone.View.extend({
    el: '.edit-community-div',

    events: {
    	'click .btn-edit-save': 'updateCommunity',
    	"click .btn-edit-cancel": 'cancelEditCommunity'
    },

    initialize: function() {
        var handler = _.bind(this.render, this);

        
    },
	
    updateCommunity: function(){
    	
    	var name = $('.editCommunity input')[0].value
        	//get innput name from the uder
    	this.model.set('communityname', name);
    	this.model.save();
    	alert("you have successfully edited Community");
    	$('.editCommunity').hide();
    },

    cancelEditCommunity:function() {
         $('.editCommunity').hide();
    },

    render: function(){
    	//var name= this.model.get(communityname);
    	//alert(name);
    	$('.editCommunity input')[0].value = this.model.get("communityname")
    	$('.editCommunity').show();
		$('.createCommunity').hide();
    	
    	
    	
    }

});