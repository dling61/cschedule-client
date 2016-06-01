define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    'js/models/task',
    'js/collections/PoolHelpers',

], function(_, Backbone, jquery, jqueryui, Drop, Task, PoolHelpers){



    
    
    
var PoolHelper = Backbone.Model.extend({
    //url: 'schedules/1070068/onduty/1070000'
    urlRoot: 'assignmentpool'
});

var PoolHelpers = Backbone.Collection.extend({

    model: PoolHelper,
    //url: 'taskhelper',  // 'schedules/1070068/onduty/1070000',

    parse: function(resp, xhr) {
        return resp.apgroup[0].member;
    }
});






var HelpersPoolView = Backbone.View.extend({

    
    
    addHelper: function () {
        alert('Added helper');
    },
    

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
    
    
    addNewHelper: function( event, ui ) {
        // this is the elem receiving the dropped ui.draggable elem
        var taskID = $(event.target).closest('.helperPool').data('id');

        var taskHelper = new PoolHelper({
            'assignmentpoolid' : 30010,
            // 'eventid': 30001,
            'ownerid': 3,
            'taskid': 30001, //taskID,
            'userid': 125 //newHelperID
                            //'add': [newHelperID]
        });              

        taskHelper.save();
    },
                    
                    
    addDroppable : function() {
            this.helperPoolView.content.droppable({
            drop: function( event, ui ) {
                  // this is the elem receiving the dropped ui.draggable elem
                var newHelperID = ui.draggable.data('id');
                var taskID =$(this).data('taskid');

            var taskHelper = new TaskHelper({
                'taskhelperid' : 100013,
                'eventid': 30001,
                'ownerid': '3',
                'taskid': taskID,
                'userid': '125', //newHelperID
                'status': 'A'
                                //'add': [newHelperID]
            });              

            taskHelper.save();
            }
        });
    },


    OnSearch: function  (input) {
        alert ("The current value of the search field: " + input.value);
    },

    
    renderHelperList : function( taskID ) {
        newDiv = $('<div/ class="helperPool" data-id=' + taskID + '>');

        //events = _.map(eventList.models, function(event) {

        //_.each(gTaskHelpers, function(event) {
        gTaskHelpers.each( function(event) {
            var title = event.attributes.username;
            var pic   = event.attributes.userprofile;
            var id    = event.attributes.userid;

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
        var helperName = $("<div>");
        helperName.append("<input id='addHelper' type='search' placeholder='Enter participant'>");
        var addBtn = $("<span id='addHelperBtn'>Add</span>");
        helperName.append(addBtn);
        newDiv.append(helperName);
        
        //this.addDroppable();
        
        //WFB $('body').on('keyup', '#addHelper',    {}, this.OnSearch(this));
        $('body').on('click', '#addHelperBtn', {}, this.addNewHelper);
    
        return newDiv[0];
    },
    
    
    render: function() {

        events = [];
        
        var curTask = $('.taskname')[0];

        this.helperPoolView = new Drop({
            target: curTask,
            content: this.renderHelperList( $(curTask).data('id') ),   //WFB newDiv[0],
            position: 'bottom left',
            openOn: 'click',
            classes: 'drop-theme-arrows-bounce-dark',		
        });


    }
    

});

return HelpersPoolView;    
});
