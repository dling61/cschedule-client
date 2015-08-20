var Event = Backbone.Model.extend();

var Events = Backbone.Collection.extend({

    model: Event,

    url: 'community/30001/event',


    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {


        function getAssignees(taskID, taskAssignees) {
            var names = "";
            var nameLen = 0;
            taskAssignees.forEach(function(name) {
                if (nameLen < 1 && name.username.length > 7) {
                    names += '<div style="float:left;   text-align: center;"><div><img src=".\\images\\' 
                        + name.username + '.png"  height="32" width="32"></div><div>' + name.username + '</div></div>';
                } else {
                    names += '<div style="float:left; margin-left:10px; text-align: center;"><div><img src=".\\images\\' 
                    + name.username + '.png"  height="32" width="32"></div><div>' + name.username + '</div></div>';
                }
                nameLen = name.username.length;
            });

            if (taskID === '30003') {
                names += '<div class="poolIcon" task-id="' + taskID * 1.0 
                    + '" style="float:left; margin-left:10px;text-align: center; color: lightgray;">' 
                    + '<div><img src=".\\images\\needed.png" height="32" width="32"></div><div>needed</div></div>';
            }
            names += '<div class="poolIcon" task-id="' + taskID * 1.0 
            + '" style=" right: 3px; position: absolute; text-align: center; color: lightgray;">' 
            + '<div><img src=".\\images\\poolIcon.png" height="32" width="32"></div><div>pool</div></div>';
            names += '<div style="clear:both"></div>';
            return names;
        }


        var evAry = [];
        var evsC = resp.event;

        var eventCollection = evsC;
       
        // var taskView = new TaskView({ model: eventList });

        // taskView.render(eventList);
        // console.log("events ="+ evsC);

       

        var events = {
            events: [ // put the array in the `events` property
                {
                    title: 'event1',
                    start: '2015-05-02'
                }, {
                    title: 'event2',
                    start: '2015-05-02',
                    end: '2015-05-04'
                }, {
                    title: 'event3',
                    start: '2015-05-04T12:30:00',
                }
            ],
            color: 'black', // an option!
            textColor: 'yellow' // an option!
        };



        var eventsC = {
            events: [],
            color: 'white', // an option!
            textColor: 'black' // an option!
        };

        var eventID = 30001;
        var evsC = evsC[eventID];
        var assignNames = "";

        for (var dayIdx = 0; dayIdx < evsC.length; dayIdx++) {

            assignNames = "";
            for (var taskIdx = 0; taskIdx < evsC[dayIdx].task.length; taskIdx++) {
                var taskID = evsC[dayIdx].task[taskIdx].taskid;
                assignNames += '<div class="taskAssignees" data-taskid="' + taskID
                                + '" style="margin-top:10px;">' 
                    + getAssignees(taskID, evsC[dayIdx].task[taskIdx].assignment) + '</div>';
            }

            var newEv = {
                title: assignNames, //'Group ' + getAssignees(evsC[dayIdx].task[0].assignment),
                start: evsC[dayIdx].startdatetime
            };
            eventsC.events.push(newEv);

            if ($(".addtaskbtn").length === 0) {
                var eventNm = evsC[dayIdx].eventname; //this.collection[0].eventname;
                var times = evsC[dayIdx].startdatetime.split(' ')[1].split(':');
                var eventTime = times[dayIdx] + ':' + times[1];

                var tasks = evsC[dayIdx].task;


                $('#event1_title').append('<div  contenteditable="true"  style="margin-top:10px;">' + eventNm + '  ' + eventTime + '</div>');
                $('#event1_title').append('<button class="addtaskbtn" data-eventid="' + eventID + '">+ new</button>');


                for (taskid = 0; taskid < tasks.length; taskid++) {
                    
                    if (taskid === 0)
                    $('#event1_title').append('<div class="taskname" contenteditable="false">' + tasks[taskid].taskname 
                                              + '</div>');
                    else
                    $('#event1_title').append('<div class="taskname" contenteditable="false">'  + tasks[taskid].taskname 
                                              + '<span style="margin-left:6px;" class="numcircle">' + taskid + '</span></div>');
                }
            }

        }

        return eventsC; //[evAry[0]]  ;
    }    //parse end


});