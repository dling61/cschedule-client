define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
], function(_, Backbone, jquery, jqueryui, Drop, Task){



var PoolMember = Backbone.Model.extend();

var PoolMembers = Backbone.Collection.extend({

    model: PoolMember,

    url: 'task/30001/assignmentpool',


    parse: function(resp, xhr) {
        return resp.apgroup[0].member;
    }
});





var HelpersPoolView = Backbone.View.extend({

    //el: "#floatDiv",
    //el: "#helperpool",
    collection: PoolMembers,

    initialize: function() {

        /*
        _.bindAll(this);
        this.helpersPoolView = new HelpersPoolView();
        */
    },

    events : {
        //'click #closeHelpers' : 'closeHelpersBox'
    },

    closeHelpersBox: function(ev) {
        var helpersDiv = $("#floatDiv").hide();
        helpersDiv.find(".helperPoolLI").remove();

    },

    render: function() {
        
      //$('#taskHelperLabel').html('Kitchen'); //WFB this.model.get('communityname'));
      //$('#helperpool').modal('show');
        
        
        
      
        
        // var poolID = $(jsEvent.toElement).closest(".poolIcon").attr('task-id');

        var pool = new PoolMembers();
        pool.fetch({ //EventList().fetch({
            /*
            data: {
              from: start.getTime(),
              to: end.getTime()
            },
            One important adjustment, I had to convert the moment object to a 
            Javascript date object to get the getTime() function to work.
            data: {
            from: start.toDate().getTime(),
            to: end.toDate().getTime()
            }, //data
            */
            success: function(eventList) {
                events = [];
                
                newDiv = $('<div>');
                
                events = _.map(eventList.models, function(event) {
                    var title = event.attributes.username;
                    var pic = event.attributes.userprofile;
                    var id = event.attributes.userid;

                    var personDiv = $("<div data-id='" + id + "' class='helperPoolLI' style='display:inline-block; z-index:9000; margin-left:8px; margin-right:8px;'>");

                    personDiv.append("<img class='helperPoolImg' src='" + pic + "'>");
                    personDiv.append("<div style='color:white; text-align: center'>" + title);
                    if (title === 'Irene')
                        personDiv.append("<div style='color: goldenrod;'>after July");
                    personDiv.draggable();
                    //$("#floatDiv").append(personDiv);
                    //$("#helperpool").append(personDiv);
                    
                    newDiv.append(personDiv);
                    
                    

                    //return newEv;
                    



/*
                  $('#helperpool').dialog({
                        draggable: true,
                        resizable: true,
                        show: 'fade',
                        hide: 'fade',
                        modal: false,
                        width:  400,
                        height: 150,
                      //overflow: 'visible',
                        title: 'Ride Service helpers',
                        //buttons: buttons,
                        //open: this.open
                    });
                    
                    $('.ui-dialog').css('overflow','visible');
*/                    
                });
                
                this.helperPoolView = new Drop({
							target: $('.taskname')[0],
							content: newDiv[0],
							position: 'bottom left',
							openOn: 'click',
							classes: 'drop-theme-arrows-bounce-dark',		
						});


                // WFB  $("#floatDiv").show();
            }
        });

        //this.eventView.model = this.collection.get(fcEvent.id);
        //this.eventView.render();
    }
    

});

return HelpersPoolView;    
});
