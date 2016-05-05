define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
    'js/collections/PoolHelpers',

], function(_, Backbone, jquery, jqueryui, Drop, Task, PoolHelpers){







var HelpersPoolView = Backbone.View.extend({

    //el: "#floatDiv",
    //el: "#helperpool",
    collection: PoolHelpers,

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

        events = [];

        newDiv = $('<div>');

        //events = _.map(eventList.models, function(event) {

        //_.each(gTaskHelpers, function(event) {
        gTaskHelpers.each( function(event) {
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
        });

        this.helperPoolView = new Drop({
                    target: $('.taskname')[0],
                    content: newDiv[0],
                    position: 'bottom left',
                    openOn: 'click',
                    classes: 'drop-theme-arrows-bounce-dark',		
                });
    }
    

});

return HelpersPoolView;    
});
