


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
                
                
                var helpers_overlay = $("<div id='helpers_pool' style='margin-top: 146px; width: 280px;'>");
                $("#eventView").append(helpers_overlay);
                
                var top_arrow = $("<div class='arrow-up' style='margin-left: 30px'></div>");
                $("#helpers_pool").append( top_arrow );

                var popup_helpers = $("<div id='helper_pool0' style='padding-top: 18px; padding-bottom: 8px; background: black;'>");
                $("#helpers_pool").append(popup_helpers);
                
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
                    
                    $("#helper_pool0").append(personDiv);
                    
                    

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
                // WFB  $("#floatDiv").show();
            }
        });

        //this.eventView.model = this.collection.get(fcEvent.id);
        //this.eventView.render();
    }
});








window.JST['eventViewSAMPLE'] = _.template(
    "<span id='eventName' data-id='30002'><%= event.get('eventname') %></span>" + 
    "<span class='glyphicon glyphicon-time'></span>" + 
    "<span id='eventTime' data-id='30002'><%= event.get('startdatetime') %> to <%= event.get('enddatetime') %></span>" +
    "<span class='glyphicon glyphicon-retweet'></span>" + 
    "<span id='eventRepeat' data-id='30002'>Every Saturday</span>" + 
    "<span class='glyphicon glyphicon-map-marker'></span>" + 
    "<span id='eventLocation' data-id='30002'><%= event.get('location') %></span>" + 
    "<span class='glyphicon glyphicon-user'></span>" +
    "<span id='eventHost' data-id='30002'><%= event.get('host') %></span>"
);


