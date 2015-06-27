$(function(){
    var Event = Backbone.Model.extend();

    var Events = Backbone.Collection.extend({
        model: Event,
//        url: 'events'
        url: 'http://apitest1.servicescheduler.net/community/30001/event?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.4.0&',
        

        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse : function(resp, xhr) {
            
          function getAssignees(task) {
              var names = "";
              task.forEach(function (name) {
                  names += '<div style="float:left; margin-left:10px;"><div><img src=".\\images\\' + name.username + '.png"  height="32" width="32"></div><div>' + name.username + '</div></div>';
                  
                  //names += '\n' + name.username;
              });
              names += '<div style="clear:both"></div>';
              return names;
          }
            
            
          var evAry = []; 
          var evsC = resp.event;
            
          var events = {
            events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2015-05-02'
                },
                {
                    title  : 'event2',
                    start  : '2015-05-02',
                    end    : '2015-05-04'
                },
                {
                    title  : 'event3',
                    start  : '2015-05-04T12:30:00',
                }
            ],
            color:     'black',     // an option!
            textColor: 'yellow' // an option!
          };
            
            
            
          var eventsC = {
            events:    [],
            color:     'white',     // an option!
            textColor: 'black' // an option!
          };
        
          var evsC = evsC[30001];
            var assignNames = "";
            
            for (var dayIdx = 0; dayIdx < evsC.length; dayIdx++ ) {

                assignNames = "";
                for (var taskIdx = 0; taskIdx < evsC[dayIdx].task.length; taskIdx++ ) {
                    assignNames += '<div style="margin-top:36px;">' + getAssignees(evsC[dayIdx].task[taskIdx].assignment) + '</div>';
                }

                var newEv = {
                      title: assignNames, //'Group ' + getAssignees(evsC[dayIdx].task[0].assignment),
                      start: evsC[dayIdx].startdatetime
                  };
                  eventsC.events.push(newEv);  




                if (dayIdx == 0) {             
                      var eventNm   = evsC[dayIdx].eventname; //this.collection[0].eventname;
                      var times     = evsC[dayIdx].startdatetime.split(' ')[1].split(':');
                      var eventTime = times[dayIdx] + ':' + times[1];

                      var tasks = evsC[dayIdx].task; 


                      $('#event1_title').append('<div    style="margin-top:10px;">' + eventNm + '  ' + eventTime + '</div>');
                      $('#event1_title').append('<button class="addtaskbtn">Add a Task</button>');

                      for (taskid = 0; taskid < tasks.length; taskid++) {

                        $('#event1_title').append('<div class="taskname">' 
                                          + '<div>' + tasks[taskid].taskname + '</div>'
                                          + '<div class="taskdescr">Help do the task with other participants</div></div>');
                      }
                }

            }
              //$('#event1_title').   

            //Object {color: "black", textColor: "yellow", events: Array[1]}
            // eventsC.events[0]

                // Object {title: "300011", start: "2015-03-06 20:30:00"}



            //Object {events: Array[3], color: "black", textColor: "yellow"}
                //Object {title: "event1", start: "2015-05-02"}

          return eventsC; //[evAry[0]]  ;
        },
    }); 
 

/*
$('#calendar').fullCalendar({

    eventSources: [

        // your event source
        {
            events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2015-05-02'
                },
                {
                    title  : 'event2',
                    start  : '2015-05-02',
                    end    : '2015-05-04'
                },
                {
                    title  : 'event3',
                    start  : '2015-05-04T12:30:00',
                }
            ],
            color: 'black',     // an option!
            textColor: 'yellow' // an option!
        }

        // any other event sources...

    ]

});
    
*/
    
    
    
    
    
    
    
    
    var EventsView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this); 

            this.collection.bind('reset',   this.addAll);
            this.collection.bind('add',     this.addOne);
            this.collection.bind('change',  this.change);            
            this.collection.bind('destroy', this.destroy);
            
            this.eventView = new EventView();            
        },
        render: function() {
            this.el.fullCalendar({
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'members'   //WFB 'alldays,month,basicWeek,basicDay,members'
                },
                views: {
                alldays: {
                        type: 'month',
                        duration: { days: 30 },
                        hiddenDays: [],
                        buttonText: 'calender',
                    
                        aspectRatio: 1.2,
                        fixedWeekCount : true
                                
                    },
                members: {
                        type: 'month',
                        duration: { days: 30 },
                        hiddenDays: [],
                        buttonText: '<Show all members',
                    
                        aspectRatio: 1.2,
                        fixedWeekCount : true
                                
                    }
                },
                
                selectable:     true,
                selectHelper:   true,
                editable:       true,
                ignoreTimezone: false,                
                select:      this.select,
                eventClick:  this.eventClick,
                eventDrop:   this.eventDropOrResize,        
                eventResize: this.eventDropOrResize,
                
                hiddenDays: [ 0, 1, 2, 3, 4, 5 ],
                aspectRatio: 3.0,
                fixedWeekCount : false
                                
            });
        },
        addAll: function() {
            //WFB this.el.fullCalendar('addEventSource', this.collection.toJSON())
            this.el.fullCalendar('addEventSource', this.collection.toJSON()[0]);
        },
        addOne: function(event) {
            this.el.fullCalendar('renderEvent', event.toJSON());
        },        
        select: function(startDate, endDate) {
            this.eventView.collection = this.collection;
            this.eventView.model = new Event({start: startDate, end: endDate});
            this.eventView.render();            
        },
        eventClick: function(fcEvent) {
            this.eventView.model = this.collection.get(fcEvent.id);
            this.eventView.render();
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
            this.collection.get(fcEvent.id).save({start: fcEvent.start, end: fcEvent.end});            
        },
        destroy: function(event) {
            this.el.fullCalendar('removeEvents', event.id);         
        }        
    });


    
    
    
    
    var EventView = Backbone.View.extend({
        el: $('#eventDialog'),
        initialize: function() {
            _.bindAll(this);           
        },
        render: function() {
            var buttons = {'Ok': this.save};
            if (!this.model.isNew()) {
                _.extend(buttons, {'Delete': this.destroy});
            }
            _.extend(buttons, {'Cancel': this.close});            
            
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
            this.model.set({'title': this.$('#title').val(), 'color': this.$('#color').val()});
            
            if (this.model.isNew()) {
                this.collection.create(this.model, {success: this.close});
            } else {
                this.model.save({}, {success: this.close});
            }
        },
        close: function() {
            this.el.dialog('close');
        },
        destroy: function() {
            this.model.destroy({success: this.close});
        }        
    });
    
    var events = new Events();
    new EventsView({el: $("#calendar"), collection: events}).render();
    events.fetch();
});