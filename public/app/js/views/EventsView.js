define([
    'underscore',
    'backbone',
    'jquery',
    'jqueryui',
    '../../../javascripts/fullcalendar',
    'js/models/task',
    'js/collections/EventsC',
    'js/collections/PoolHelpers',
    'js/collections/TaskAssignees',
    'js/collections/Tasks',
    'js/views/HelpersPoolView'
], function(_, Backbone, jquery, jqueryui, fullcalendar,
    Task, EventsC, PoolHelpers, TaskAssignees, Tasks, HelpersPoolView) {


    var TaskHelper = Backbone.Model.extend({
        //url: 'schedules/1070068/onduty/1070000'
        urlRoot: 'taskhelper'
    });

    var TaskHelpers = Backbone.Collection.extend({

        model: TaskHelper,
        //url: 'taskhelper',  // 'schedules/1070068/onduty/1070000',

        parse: function(resp, xhr) {
            return resp.apgroup[0].member;
        }
    });




    var Event = Backbone.Model.extend({
        url: 'event',
    });

    var Events = Backbone.Collection.extend({

        model: Event,

        url: 'community/30001/event?start=2016:05:01&num=4',
        //url: 'baseevent/30002/event',


        //url: 'getevents.json',




        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function(resp, xhr) {



            function getAssignees(taskID, taskAssignees, numNeeded) {
                var names = "";
                var nameLen = 0;

                taskAssignees.forEach(function(name) {
                    var curUser = gParticipants.where({
                        "id": name.userid
                    });

                    if (nameLen < 1 && name.username.length > 7) {
                        names += '<div style="float:left;   text-align: center;"><div><img src=".\\images\\' +
                            name.username + '.png"  height="32" width="32"></div><div style="margin-top: -5px;">' + name.username + '</div></div>';
                    } else {
                        names += '<div style="float:left; margin-left:10px; text-align: center;"><div><img class="assigneeImg" src="' +
                            name.userprofile + '"></div><div style="margin-top: -5px;">' + name.username + '</div></div>';
                    }
                    nameLen = name.username.length;
                });

                for (var i = taskAssignees.length; i < numNeeded; i++) {
                    names += '<div class="poolIcon" task-id="' + taskID * 1.0 +
                        '" style="float:left; margin-left:10px;text-align: center; color: lightgray;">' +
                        '<div><img src=".\\images\\needed.png" height="32" width="32"></div><div style="margin-top: -5px;">need</div></div>';
                }
                //names += '<div style="float:left; margin-top:6;"><button>assign from pool</div>';
                /*
                names += '<div class="poolIcon" task-id="' + taskID * 1.0 
                + '" style=" right: 3px; position: absolute; text-align: center; color: lightgray;">' 
                + '<div><img src=".\\images\\poolIcon.png" height="32" width="32"></div><div>pool</div></div>';
                */
                names += '<div style="clear:both"></div>';
                return names;
            }


            var evAry = [];
            //WFB var evsC = resp.event;
            var evsC = resp;

            //WFB this.add(resp);
            this.add(resp);
            //WFB this.add(evsC[30001][0]);
            //this.add(evsC[30001][1]);

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
            //WFB var evsC = evsC[eventID];


            //parsing events to approximate collections(task assignees)

            var taskm, assignmentm, tasksC, assignmentC;
            gBaseEvents = [];
            gTasks = [];
            gTaskAssignees = [];

            gTaskHelpers = new PoolMembers();

            _.each(resp.taskhelper, function(helper) {
                gTaskHelpers.add(helper);
            });

            //gTaskAssignees = new TaskAssignees();

            /*
              _.each(evsC, function(event){
                  gBaseEvents.push(event);
                  _.each(event.task, function(taskAttributes){
                      taskAttributes.eventid = event.eventid;
                      taskm = new Task(taskAttributes);
                      gTasks.push(taskm);
                      _.each(taskAttributes.taskhelper, function(assignmentAttr){
                          assignmentAttr.taskid = taskm.get('taskid');
                          assignmentAttr.eventid = event.eventid;
                          assignmentm = new TaskHelper(assignmentAttr);
                          gTaskAssignees.push(assignmentm);
                          
                          // taskm.assignees.push(assignmentm);
                       }); //end of assignees
                       // event.tasks.push(taskm);
                  });//end of taks
              });//end of events
              */


            var assignNames = "";

            if (true) {
                for (var dayIdx = 0; dayIdx < evsC.event.length; dayIdx++) {

                    assignNames = "";

                    for (var taskIdx = 0; taskIdx < 3; taskIdx++) {
                        var taskID = evsC.taskhelper[taskIdx].taskid;
                        var numNeeded = 5; //WFB evsC.task[taskIdx].assignallowed;
                        assignNames += '<div class="taskAssignees" data-taskid="' + taskID +
                            '" style="margin-top:10px;">' +
                            getAssignees(taskID, evsC.taskhelper, numNeeded) + '</div>';
                    }

                    if (false) {
                        for (var taskIdx = 0; taskIdx < evsC.taskhelper.length; taskIdx++) {
                            var taskID = evsC.taskhelper[taskIdx].taskid;
                            var numNeeded = 2; //evsC.task[taskIdx].assignallowed;
                            assignNames += '<div class="taskAssignees" data-taskid="' + taskID +
                                '" style="margin-top:10px;">' +
                                getAssignees(taskID, evsC.taskhelper, numNeeded) + '</div>';
                        }
                    }

                    if (dayIdx === 0)
                        evsC.event[dayIdx].startdatetime = "2016-05-07 17:00:00";
                    else if (dayIdx === 1)
                        evsC.event[dayIdx].startdatetime = "2016-05-14 17:00:00";
                    else if (dayIdx === 2)
                        evsC.event[dayIdx].startdatetime = "2016-05-21 17:00:00";

                    var newEv = {
                        title: assignNames, //'Group ' + getAssignees(evsC[dayIdx].task[0].assignment),
                        start: evsC.event[dayIdx].startdatetime
                    };
                    eventsC.events.push(newEv);
                }
            }

            return eventsC; //[evAry[0]]  ;
        },
    });



    var EventsView = Backbone.View.extend({

        //el: '#calendar',
        //collection: events,

        initialize: function() {
            //_.bindAll(this);

            this.collection.bind('reset', this.addAll);
            this.collection.bind('add', this.addOne);
            this.collection.bind('change', this.change);
            this.collection.bind('addToTask', this.addToTask);
            this.collection.bind('destroy', this.destroy);

            //WFB this.eventView = new EventView();

            /* WFB NEW
            gFetchedEvents = new Events();
            gFetchedEvents.fetch({ //EventList().fetch({
                success: function(collection, response, options) {
                    if (gTasksView.cid === undefined) {
                        gTasksView = new TaskView();
                        gTasksView.render(response.task);
                    }
                }
            });
            */
        },

        events: {
            'dragenter .droparea': 'tellDrop',
            'dragenter .droparea': 'highlightDropZone',
            'dragleave .droparea': 'unhighlightDropZone',
            'click .numcircle': 'viewMessaging',
            'click #eventName': 'editEventName'
        },
        editEventName: function() {
            alert('hi');
        },

        viewMessaging: function() {

            this.chats = new CommunityChats();
            this.chats.fetch({
                success: function(chatlist) {
                    var template4 = _.template($("#chats-template").html());
                    $('#chat-content').html(template4({
                        chats: chatlist.models
                    }));

                    $('#chat-content').html('.close-popup');
                    $('#community-chat-popup').show();
                }
            });
        },


        tellDrop: function() {
            alert("DROPPED!")
        },

        highlightDropZone: function(e) {
            e.preventDefault();
            //$(e.currentTarget).addClass('item-drop-zone-highlight')
        },

        unhighlightDropZone: function(e) {
            //$(e.currentTarget).removeClass('item-drop-zone-highlight')
        },

        render: function() {
            this.$el.fullCalendar({
                //$(this.el).fullCalendar({
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'members' //WFB 'alldays,month,basicWeek,basicDay,members'
                },

                columnFormat: 'dddd MMM D',
                timeFormat: '',

                views: {
                    alldays: {
                        type: 'month',
                        duration: {
                            days: 30
                        },
                        hiddenDays: [],
                        buttonText: 'calender',

                        aspectRatio: 1.2,
                        fixedWeekCount: true
                    },
                    members: {
                        type: 'month',
                        duration: {
                            days: 30
                        },
                        hiddenDays: [],
                        buttonText: '<Show all members',

                        aspectRatio: 1.2,
                        fixedWeekCount: true
                    }
                },

                selectable: true,
                selectHelper: true,
                editable: true,
                ignoreTimezone: false,

                select: this.select,
                eventClick: this.eventClick,
                eventDrop: this.eventDropOrResize,
                eventResize: this.eventDropOrResize,

                hiddenDays: [0, 1, 2, 3, 4, 5],
                aspectRatio: 4.1,
                fixedWeekCount: false,

                droppable: true,
                /*
                drop: function(date, jsEvent, ui ) {
                    var droppedID = $(this).data('id');
                    this.addToTask(date);
                },
                */



                eventSources: [{ // your event source
                        color: 'white',
                        textColor: 'black',

                        events: function(start, end, timezone, callback) {
                            gFetchedEvents = new Events();
                            gFetchedEvents.fetch({ //EventList().fetch({
                                /*
                                data: {
                                  from: start.getTime(),
                                  to: end.getTime()
                                },
                                */
                                success: function(collection, response, options) {

                                    
                                    this.eventView = new EventView();
                                    
                                    var eventId = collection.models[0].attributes.events[0];

                                    gTasks = new Tasks();
                                    _.each(response.task, function(task) {
                                        gTasks.add(task);
                                    });
                                    
                                    if (gTasksView.cid === undefined) {
                                        gTasksView = new TaskView();
                                        gTasksView.render(gTasks.models);
                                    }

                                    events = []
                                    events = _.map(collection.models[0].attributes.events, function(event) {
                                        var newEv = {
                                            title: event.title, //get("title"),
                                            start: new Date(event.start),
                                            //end: new Date(event.get("end")),
                                            //url: event.get("url")
                                        };
                                        //newEv.title = event.attributes.events[0].title;
                                        //newEv.start = event.attributes.events[0].start;
                                        return newEv;
                                    });

                                    callback(events);

                                    //WFB this.eventView.render();




                                    $('.numcircle').click(function() {
                                        //alert(event)
                                        gEventsView.viewMessaging();
                                    });


                                    $(".taskAssignees").droppable({
                                        drop: function(event, ui) {
                                            // this is the elem receiving the dropped ui.draggable elem
                                            var newHelperID = ui.draggable.data('id');
                                            var taskID = $(this).data('taskid');

                                            var taskHelper = new TaskHelper({
                                                'taskhelperid': 100013,
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

                                }
                            })
                        }
                    }] //eventSources
            });

            /*
            $(".taskAssignees").droppable({
                  drop: function( event, ui ) {
                    alert( "Dropped!" );
                  }
            });
            */

            /*
            renderCalendar: ->
                  @.$("#calendar").fullCalendar({
                    header: {
                      left: 'prev,next today'
                      center: 'title'
                      right: 'month,basicWeek,basicDay'
                    }
                    allDayDefault: false
                    editable: false
                    events: (start, end, callback) ->
                      new EventList().fetch({
                        data: {
                          from: start.getTime()
                          to: end.getTime()
                        }
                        success: (eventList) ->
                          events = []
                          events = _.map(eventList.models, (event) -> {
                            title: event.get("title")
                            start: new Date(event.get("start"))
                            end: new Date(event.get("end"))
                            url: event.get("url")
                          })
                          callback(events)
                      })
                  })
            */



        },

        addAll: function() {
            //WFB this.el.fullCalendar('addEventSource', this.collection.toJSON())
            // CHANGED TO USE EVENT FUNCTION this.el.fullCalendar('addEventSource', this.collection.toJSON()[0]);
        },

        addOne: function(event) {
            this.el.fullCalendar('renderEvent', event.toJSON());
        },


        addToTask: function(eventDate) {
            var personID = (this).data('id');
            var taskHelpers = new TaskHelpers();
            var taskHelper = new TaskHelper({
                id: personID
            });
            taskHelpers.add(taskHelper);
            taskHelpers.save();
        },



        /*
        $url = 'http://apitest1.servicescheduler.net/schedules/1070068/onduty/1070000';    
        $method = 'PUT';
            // Please change the data before executing it in the test1 environment
            // "add" ---- assign participants to the task
        // "delete"   delete participants from the task
        $data = json_encode(array(
            'ownerid'=> '107',
            'eventid' => '300011',
                'add' => array(235, 236),
            'delete' => array(234)
            )       
        );
        */
        select: function(startDate, endDate) {
            this.eventView.collection = this.collection;
            this.eventView.model = new Event({
                start: startDate,
                end: endDate
            });
            this.eventView.render();
        },


        eventClick: function(fcEvent, jsEvent, view) {
            var helpersPoolView = new HelpersPoolView({
                'poolID': $(jsEvent.toElement).closest(".poolIcon").attr('task-id')
            });
            helpersPoolView.render();
        },

        change: function(event) {
            // Look up the underlying event in the calendar and update its details from the model
            var fcEvent = this.el.fullCalendar('clientEvents', event.get('id'))[0];
            fcEvent.title = event.get('title');
            fcEvent.color = event.get('color');
            this.el.fullCalendar('updateEvent', fcEvent);
        },
        eventDropOrResize: function(fcEvent) {
            // Lookup the model that has the ID of the event and update its attributes
            this.collection.get(fcEvent.id).save({
                start: fcEvent.start,
                end: fcEvent.end
            });
        },
        destroy: function(event) {
            this.el.fullCalendar('removeEvents', event.id);
        }
    });

    //window.JST = {};



    /*
    window.JST['taskView'] = _.template(
        //WFB '<button class="addtaskbtn" data-eventid="' + eventID + '">+ task</button>'
        '<button class="addtaskbtn" data-eventid="' + 30001 + '">+ task</button>'
    );
    */


    var TaskView = Backbone.View.extend({
        el: '#event1_title',
        events: {
            'click #addNewTask': 'addTask'
        },


        initialize: function() {

            // event1_title
            $("#event1_title").append(
                $.loadTemplate("#tasksListViewTpl"));

            //WFB $("body").append(loadTemplate("#createEventViewTpl", "#createEventTemplate"));


            // helpersPoolView.render();

        },

        reassign: function(ev) {
            /*
            $url = 'http://apitest2.cschedule.com/event/50001/autoassignment?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.2.0&';
            $method = 'POST';

            # headers and data (this is API dependent, some uses XML)
            $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
            );
            $data = json_encode(array(
                        'taskid' => '30006',
                        'ownerid' => 5,
                        'inittaskhelperid' => 5000123
                        )
                    );
            */

            
            var eventID = 50001;
            
            var taskID = $(ev.target).closest('.taskname').data('id');
            var taskdata = {
                    'taskid': '30006',
                    'ownerid': 5,
                    'inittaskhelperid': 5000200 };
            
            gLatestTaskHelperId = getNextObjectId(gLoginUser.ownerid, gLatestTaskHelperId);
            gLatestTaskHelperId++;

            
            
            $.ajax({
                type:    'POST',
                url:     'event/' + eventID + '/autoassignment',
                
                //data: '{"ownerid": 3, "initeventid":' + gLatestEventId + '}', // or 
                data:    '{"taskid":' + taskID + ', "ownerid": 5, "inittaskhelperid":' + gLatestTaskHelperId + '}',
                success: function(data) {
                    var tmp = JSON.parse(localStorage.login_user);
                    tmp.taskhelperid = gLatestTaskHelperId; //param.eventid;
                    localStorage.login_user = JSON.stringify(tmp);
                    alert('Assign task done');
                },
                error: function() {
                    alert('Asign task failed');
                },
                contentType: "application/json",
                dataType: 'json'
            });


            
        },

        render: function(eventTasks) {
            $.evalUnderscore('#taskList', {
                tasks: eventTasks
            });
            $("#TaskListDiv").css("display", "block");

            $.evalUnderscore('#createEventDialog', {
                tasks: eventTasks
            });
            

            //this.addEvent();

            var taskid = 30001;
            this.helpersPoolView = new HelpersPoolView({
                'poolID': taskid
            });
            this.helpersPoolView.render();

            $(".taskAutoAssign").on("click", this.reassign);
        },

        addTask: function() {
            alert('Add Event !');

            // var brandNewBook = new BookModel({ title: '1984', author: 'George Orwel' });
            // brandNewBook.save();

            /*
            'ownerid' => 3,
			'communityid'=> '30005',
			'eventid'=> '30012',
			'desp' => 'this is a second test schedule for 1.4.0',
			'eventname' => 'One New Event for task ID testing',
			'startdatetime' => '2013-03-06 20:30:00',
			'enddatetime' =>  '2013-03-06 23:59:20',
			'tzid' => '1',
			'alert' => 3,
			'location' => '444 1th street, san jose, ca 91223',
			'host' => 'Tonys house',
            'status' => 'S',
            'rscheduleid' => '333',
			'beventid' => '0'
        */
            
            
	       var nTask = new Task({
                'ownerid':  '3',
	            'taskid':   '20061',
                'eventid':  '30001',
                'taskname': 'Chairs',
                'desp':     'This task is to arrange chairs after each meeting',
                'assignallowed': '2',
                'assignedgroupid': ''
            });

            nTask.save();
        }

    });



    /* WFB    
    window.JST['eventView'] = _.template(
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
    */

    var EventView = Backbone.View.extend({

        el: $('#eventView'),
        events: {
            'click #eventName': 'editEventName',

            'click #eventTime': 'editEventTime',
            'click #eventRepeat': 'editEventRepeat',

            'click #eventLocation': 'editEventLocation',
            'click #eventHost': 'editEventHost'
        },

        editEventName: function(ev) {

            var buttons = {
                'Save': this.save,
                'Cancel': function() {
                    $(this).dialog('close');
                }
            };

            $('#editEventName').dialog({
                resizable: false,
                modal: false,
                title: 'Edit Event Name',
                buttons: buttons,
                open: this.open
            });
        },


        editEventTime: function(ev) {
            // var eventId = ev.target.getAttribute('data-id');
            // this.event = communityEvents.where({
            //     "id": eventId
            // });

            var buttons = {
                'Save': this.save,
                'Cancel': function() {
                    $(this).dialog('close');
                }
            };

            $("#editEventStartDTFLD, #editEventEndDTFLD").datetimepicker({
                format: 'Y-m-d H:i',
                step: 30
            });


            $('#editEventTime').dialog({
                resizable: false,
                modal: false,
                title: 'Edit Event Time',
                buttons: buttons,
                open: this.open,
                width: 450
            });
        },

        editEventRepeat: function(ev) {
            // var eventId = ev.target.getAttribute('data-id');
            // this.event = communityEvents.where({
            //     "id": eventId
            // });

            var buttons = {
                'Save': this.save,
                'Cancel': function() {
                    $(this).dialog('close');
                }
            };

            $("#editEventRU").datepicker({
                changeMonth: true,
                changeYear: true
            });


            $('#editEventRepeat').dialog({
                resizable: false,
                modal: false,
                title: 'Edit Repeating Settings',
                buttons: buttons,
                open: this.open,
                width: 450
            });
        },

        editEventLocation: function(ev) {

            var buttons = {
                'Save': this.save,
                'Cancel': function() {
                    $(this).dialog('close');
                }
            };

            $('#editEventLocation').dialog({
                resizable: false,
                modal: false,
                title: 'Edit Event Location',
                buttons: buttons,
                open: this.open,
                width: 400
            });
        },

        editEventHost: function(ev) {

            var buttons = {
                'Save': this.save,
                'Cancel': function() {
                    $(this).dialog('close');
                }
            };

            $('#editEventHost').dialog({
                resizable: false,
                modal: false,
                title: 'Edit Event Host',
                buttons: buttons,
                open: this.open
            });
            return this;
        },

        initialize: function() {
            _.bindAll(this, 'render');
        },

        render: function() {
            gFetchedEvents = new EventsC();
            gFetchedEvents.fetch({
                success: function(events) {
                    // var template = _.template($('#eventView-template').html());
                    // $("#eventView").html(template({event: events.models[0]}));
                    var template = JST['eventView']({
                        event: events.models[0]
                    });
                    // console.log(template);
                    $("#eventView").html(template);
                }
            });
        },

        open: function() {
            $('#editEventNameFLD').val($('#eventName').html());
            $('#editEventLocationFLD').val($('#eventLocation').html());
            $('#editEventHostFLD').val($('#eventHost').html());
            $('#editEventStartDTFLD').val($('#eventTime').html().split('to')[0]);
            $('#editEventEndDTFLD').val($('#eventTime').html().split('to')[1]);
            // $('#editEventTzFLD').val(this.event.get('tzid'));
        },

        save: function(ev) {
            // var eventId = ev.target.parentNode.getAttribute('data-id');
            this.event = gFetchedEvents.findWhere({
                "eventid": '30002'
            });

            this.event.set({
                'id': '30002',
                'ownerid': gLoginUser.ownerid,
                'eventname': $('#editEventNameFLD').val(),
                'location': $('#editEventLocationFLD').val(),

                'host': $('#editEventHostFLD').val(),
                'startdatetime': $('#editEventStartDTFLD').val(),
                'enddatetime': $('#editEventEndDTFLD').val(),
                'tzid': "Pacific Time"
                    // 'tzid': $('#editEventTzFLD').val()
                    // 'color': this.$('#color').val()
            });

            this.event.save();
            // this.event.set({
            //     ownerid:gLoginUser.ownerid
            // });
            // var host = $("#editEventHostFLD").val();
            // this.event.save({'host': $('#editEventHostFLD').val(), 'ownerid':gLoginUser.ownerid}, {
            //     patch: true,
            //     // success: this.close
            // });
            // this.model.save({}, {
            //     patch: true,
            //     success: this.close
            // });
            // myModel.save(data, {patch:true}) 

        },
    });

    var editEventView = Backbone.View.extend({
        el: $('#eventDialog'),
        initialize: function() {
            //_.bindAll(this);
        },
        render: function() {
            var buttons = {
                'Ok': this.save
            };
            if (!this.model.isNew()) {
                _.extend(buttons, {
                    'Delete': this.destroy
                });
            }
            _.extend(buttons, {
                'Cancel': this.close
            });

            this.el.dialog({
                modal: true,
                title: (this.model.isNew() ? 'New' : 'Edit') + ' Event',
                buttons: buttons,
                open: this.open
            });

            return this;
        },
        open: function() {
            this.$('#title').val(this.model.get('title'));
            this.$('#color').val(this.model.get('color'));
        },
        save: function() {
            this.model.set({
                'title': this.$('#title').val(),
                'color': this.$('#color').val()
            });

            if (this.model.isNew()) {
                this.collection.create(this.model, {
                    success: this.close
                });
            } else {
                this.model.save({}, {
                    success: this.close
                });
            }
        },
        close: function() {
            this.el.dialog('close');
        },
        destroy: function() {
            this.model.destroy({
                success: this.close
            });
        }
    });

    return EventsView;
});