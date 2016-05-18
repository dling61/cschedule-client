define([
	'underscore', 
	'backbone',
    'jquery',
    'jqueryui',
    'drop',
    //'datetimepicker',
    'js/models/task',
    'js/models/EventM'

], function(_, Backbone, jquery, jqueryui, Drop, /*datetimepicker,*/ Task, EventM){
	var serverSetting = Backbone.Model.extend({
		urlRoot: 'serversetting',
		parse: function(resp, xhr) {  
			return resp;
		} 
	});


    var eventDialogView = Backbone.View.extend({
    el: $('#eventDialogView'),
    events : {
        'click #createBtn' : 'eventCreateDialog'
    },

    eventCreateDialog : function(event) {
        // console.log("hi");
        var buttons = {
             "save" : {
              text: 'Save as Draft',
              class: 'save-btn',
              click: this.save  // EVX this.draft
            },
            "back" : {
              text: 'Previous',
              class: 'back-btn',
              click: this.back
            },
            "next" : {
              text: 'Next',
              class: 'next-btn',
              click: this.next
            },

            "publish" : {
              text: 'Publish',
              class: 'publish-btn',
              click: this.generate
            }
        };

        $('#createEventDialog').dialog({
            draggable: true,
            resizable: true,
            show: 'fade',
            hide: 'fade',
            modal: false,
            width: 930,
            height: 540,
            //z-index:999,
            title: 'Create an Event',
            buttons: buttons,
            open: this.open,
            close: this.reset
        });

        $('.back-btn').hide();
        //$('.publish-btn').hide();
        

        /* WFB
        $( "#createOneEventStartDTFLD, #createOneEventEndDTFLD, #createReEventStartDTFLD, #createReEventEndDTFLD" )
        .datetimepicker({
            format: 'Y-m-d H:i',
            step: 30
        });
        */

        $( "#createEventRS" ).datepicker({
            changeMonth: true,
            changeYear: true
        });
    },

    initialize: function() {
        _.bindAll(this, 'render');
        
    },
        
        
    generate: function ()
    {
        alert ('Generate');
    },
        
        
    render: function() {
        //save the server settings into global variable gServerSetting
        gServerSetting = new serverSetting();
        $.when(gServerSetting).done(function() {
            gServerSetting.fetch({
                success: function(settings) {
                    var tzSettings = settings.attributes.timezones;
                    var alertSettings = settings.attributes.alerts;
                    $.each(tzSettings, function (i, tz) {
                        $('#timezone-one, #timezone-re, #editEventTzFLD').append($('<option>', { 
                            value: tz.id,
                            text : tz.displayname 
                        }));
                    });
                    $.each(alertSettings, function (i, alert) {
                        $('#alert-one, #alert-re').append($('<option>', { 
                            value: alert.id,
                            text : alert.aname 
                        }));
                    });
                }
            });
        });
        

        $(document).ready(function() {
            $('a[data-id=tab-1]').click(function() {
                $('.back-btn').hide();
                $('.publish-btn').hide();
            });

            $('.createEventTab').on('click', function() {
                $('.back-btn').show();

            });

            $('.radio-btn-one').click(function() {
                $('.radio-btn-re').prop('checked', false);
                $('#createEventOneTime').removeClass('dialog-hide');
                $('#createEventRepeat').addClass('dialog-hide');
            });

            $('.radio-btn-re').click(function() {
                $('.radio-btn-one').prop('checked', false);
                $('#createEventRepeat').removeClass('dialog-hide');
                $('#createEventOneTime').addClass('dialog-hide');
            });

            $('#addNewTask').click(function() {
                console.log('under development');
            });
        });
    },
        
        
    open: function() {
        $( "#tabs-create" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs-create li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    },
      
        
    back: function() {
        // alert('back');
        var preTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]) - 1;
        $('a[data-id=tab-' + preTabNo + ']').children('.glyphicon-ok').remove();
        $('a[data-id=tab-' + preTabNo + ']').css("background-color","silver");
        $('a[data-id=tab-' + (preTabNo+1) + ']').css("background-color","transparent");
        $('a[data-id=tab-' + preTabNo + ']').trigger('click');
        $('.next-btn').css('display', 'inline');
        $('.publish-btn').hide();
    },
        
        
    next: function() {
        // alert('next');
        var currTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]);
        var nextTabNo = currTabNo + 1;
        if(currTabNo < 4) {
            $('a[data-id=tab-' + (nextTabNo -1) + ']').css("background-color","transparent");
            $('a[data-id=tab-' + (nextTabNo) + ']').css("background-color","silver");
            $('a[data-id=tab-' + (nextTabNo - 1) + ']').prepend('');
            $('a[data-id=tab-' + nextTabNo + ']').trigger('click');
        }       
        if(currTabNo == 3) {
            $('.next-btn').css('display', 'none');
            $('.publish-btn').show();
        }

    },
        
        
    reset: function() {
        $('a[data-id=tab-1]').trigger('click');
        $( "#create-tab-list a" ).children('.glyphicon-ok').remove();
    },

        
    appendDay: function( checkboxDiv, dayToCheck, daysSelected ) {
        return daysSelected;
    },
        
        
    save: function() {
        
        /*
$url = 'http://apitest2.cschedule.com/event?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.2.0&';
	$method = 'POST';
    
	# headers and data (this is API dependent, some uses XML)
	$headers = array(
	'Accept: application/json',
	'Content-Type: application/json',
	);
	$data = json_encode(array(
			'ownerid' => 3,
			'communityid'=> '30001',
			'eventid'=> '30022',
			'desp' => 'this is a second test schedule for 1.4.0',
			'eventname' => 'One New Event for task ID testing',
			'startdatetime' => '2013-03-06 20:30:00',
			'enddatetime' =>  '2013-03-06 23:59:20',
			'tzid' => '1',
			'alert' => 3,
			'location' => '444 1th street, san jose, ca 91223',
			'host' => 'Tonys house',
                        'status' => 'S',
                        'referid' => '',
			'repeatinterval' => '',
                        'fromdate' => '',
			'todate' => ''
			)
            */

        var repeatFrequency  = 'FREQ='     + $('#evRepeatFrequency').val();
        var repeatInterval   = 'INTERVAL=' + $('#evRepeatInterval').val();
        var repeatDays;  // use .prop('checked',this.checked) to get all checked days
        
        // Override Backbone's sync method, to take a 'regenerate' option
        gLatestEventId = getNextObjectId(gLoginUser.ownerid, gLatestEventId);
        param = {
            "baseeventflag": 1,
            
            "ownerid": gLoginUser.ownerid,
            "communityid": 30001,
            "eventid": gLatestEventId,
            "eventname": $('#createEventNameFLD').val(),
            "desp":      $('#createEventDescripFLD').val(),
            "fromdate" : $('#createOneEventStartDTFLD').val(),
            "todate" :   $('#createOneEventEndDTFLD').val(),
            "startdatetime": $('#createOneEventStartDTFLD').val() + ' ' + $('#StartTime').val(),
            "enddatetime":   $('#createOneEventEndDTFLD').val()   + ' ' + $('#EndTime').val(),
            "repeatinterval": 'FREQ=weekly; INTERVAL=1; BYDAY=SAT',
            "tzid":  parseInt($('#timezone-one').find(':selected').attr('value')),
            "alert": parseInt($('#alert-one').find(':selected').attr('value')),
            "location": $('#createEventLocFLD').val(),
            "host":     $('#createEventHostFLD').val(),
            "status": "S"
        };

        var newEvent = new EventM(param);
        newEvent.save({}, {
            success: function() {
                //gLatestEventId++; // = param.eventid;
                var tmp = JSON.parse(localStorage.login_user);
                tmp.eventid = gLatestEventId;  //param.eventid;
                localStorage.login_user = JSON.stringify(tmp);
                //alert('Event created - click to calling Generate');
                
                
                // POST /event/[the base event ID created in the "a"]/generateevents
                
                var baseEvId = gLatestEventId;
                gLatestEventId = getNextObjectId(gLoginUser.ownerid, gLatestEventId);
                /*
                $.postJSON(
                    'event/' + baseEvId + '/generateevents',
                    {
                      "ownerid": 3,
                      "initeventid": gLatestEventId*1
                    },
                    function(xhr) {
                        if (xhr.lasteventid === "-1") {
                            alert('Generate failed');
                        } else {
                            var tmp = JSON.parse(localStorage.login_user);
                            tmp.eventid = gLatestEventId;  //param.eventid;
                            localStorage.login_user = JSON.stringify(tmp);
                            alert('Repeating event created');
                        }
                    }
			    );
				*/
				$.ajax({
					type: 'POST',
					url: 'event/' + baseEvId + '/generateevents',
					data: '{"ownerid": 3, "initeventid":' + gLatestEventId + '}', // or JSON.stringify ({name: 'jonas'}),
					success: function(data) {  
                            var tmp = JSON.parse(localStorage.login_user);
                            tmp.eventid = gLatestEventId;  //param.eventid;
                            localStorage.login_user = JSON.stringify(tmp);
                            alert('Generate done');
					},
                    error: function() {
						alert('Generate failed');
					},
					contentType: "application/json",
					dataType: 'json'
				});
            },
            error: function() {
            }
        });

        /*
        var newEvent = new EventM(param);
        newEvent.save({}, {
            success: function() {
                           
            },
            error: function() {
                gLatestEventId = param.eventid;
                var tmp = JSON.parse(localStorage.login_user);
                tmp.eventid = param.eventid;
                localStorage.login_user = JSON.stringify(tmp);
                alert('Publish succeeds');
            }
        });
        */
    }
 
    });
    return eventDialogView; 
});


    /*
=======
	'backbone',
], function(_, Backbone){
	var eventDialogView = Backbone.View.extend({
		el: $('#eventDialogView'),
		events : {
			'click #createBtn' : 'eventCreateDialog'
		},

		eventCreateDialog : function(event) {
			// console.log("hi");
			var buttons = {
				 "save" : {
				  text: 'Save as Draft',
				  class: 'save-btn',
				  click: this.draft
				},
				"back" : {
				  text: 'Previous',
				  class: 'back-btn',
				  click: this.back
				},
				"next" : {
				  text: 'Next',
				  class: 'next-btn',
				  click: this.next
				},

				"publish" : {
				  text: 'Publish',
				  class: 'publish-btn',
				  click: this.save
				}
			};

			$('#createEventDialog').dialog({
				draggable: true,
				resizable: true,
				show: 'fade',
				hide: 'fade',
				modal: false,
				width: 930,
				height: 800,
                z-index:999,
				title: 'Create an Event',
				buttons: buttons,
				open: this.open,
				close: this.reset
			});

			$('.back-btn').hide();
			$('.publish-btn').hide();
			

			$( "#createOneEventStartDTFLD, #createOneEventEndDTFLD, #createReEventStartDTFLD, #createReEventEndDTFLD" )
			.datetimepicker({
				format: 'Y-m-d H:i',
				step: 30
			});

			$( "#createEventRS" ).datepicker({
				changeMonth: true,
				changeYear: true
			});
		},

		initialize: function() {
			_.bindAll(this, 'render');
			
		},
		render: function() {
			//save the Server settings into global variable gServerSetting
			gServerSetting = new serverSetting();
			$.when(gServerSetting).done(function() {
				gServerSetting.fetch({
					success: function(settings) {
						var tzSettings = settings.attributes.timezones;
						var alertSettings = settings.attributes.alerts;
						$.each(tzSettings, function (i, tz) {
							$('#timezone-one, #timezone-re, #editEventTzFLD').append($('<option>', { 
								value: tz.id,
								text : tz.displayname 
							}));
						});
						$.each(alertSettings, function (i, alert) {
							$('#alert-one, #alert-re').append($('<option>', { 
								value: alert.id,
								text : alert.aname 
							}));
						});
					}
				});
			});
			

			$(document).ready(function() {
				$('a[data-id=tab-1]').click(function() {
					$('.back-btn').hide();
					$('.publish-btn').hide();
				});

				$('.createEventTab').on('click', function() {
					$('.back-btn').show();

				});

				$('.radio-btn-one').click(function() {
					$('.radio-btn-re').prop('checked', false);
					$('#createEventOneTime').removeClass('dialog-hide');
					$('#createEventRepeat').addClass('dialog-hide');
				});

				$('.radio-btn-re').click(function() {
					$('.radio-btn-one').prop('checked', false);
					$('#createEventRepeat').removeClass('dialog-hide');
					$('#createEventOneTime').addClass('dialog-hide');
				});

				$('#addNewTask').click(function() {
					console.log('under development');
				});
			});
		},
		open: function() {
			$( "#tabs-create" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
			$( "#tabs-create li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
		},
		back: function() {
			// alert('back');
			var preTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]) - 1;
			$('a[data-id=tab-' + preTabNo + ']').children('.glyphicon-ok').remove();
			$('a[data-id=tab-' + preTabNo + ']').css("background-color","silver");
			$('a[data-id=tab-' + (preTabNo+1) + ']').css("background-color","transparent");
			$('a[data-id=tab-' + preTabNo + ']').trigger('click');
			$('.next-btn').css('display', 'inline');
			$('.publish-btn').hide();
		},
		next: function() {
			// alert('next');
			var currTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]);
			var nextTabNo = currTabNo + 1;
			if(currTabNo < 4) {
				 $('a[data-id=tab-' + (nextTabNo -1) + ']').css("background-color","transparent");
				$('a[data-id=tab-' + (nextTabNo) + ']').css("background-color","silver");
				$('a[data-id=tab-' + (nextTabNo - 1) + ']').prepend('');
				$('a[data-id=tab-' + nextTabNo + ']').trigger('click');
			}       
			if(currTabNo == 3) {
				$('.next-btn').css('display', 'none');
				$('.publish-btn').show();
			}

		},
		reset: function() {
			$('a[data-id=tab-1]').trigger('click');
			$( "#create-tab-list a" ).children('.glyphicon-ok').remove();
		},

		save: function() {
			var param = {
				"ownerid": gLoginUser.ownerid,
				"communityid": 30001,
				"eventid": getNextObjectId(gLoginUser.ownerid, gLatestEventId),
				"eventname": $('#createEventNameFLD').val(),
				"desp": $('#createEventDescripFLD').val(),
				"startdatetime": $('#createOneEventStartDTFLD').val(),
				"enddatetime": $('#createOneEventEndDTFLD').val(),
				"tzid": parseInt($('#timezone-one').find(':selected').attr('value')),
				"alert": parseInt($('#alert-one').find(':selected').attr('value')),
				"location": $('#createEventLocFLD').val(),
				"host": $('#createEventHostFLD').val(),
				"beventid": "0"
			};

			var newEvent = new EventM(param);
			newEvent.save({}, {
				success: function() {
							   
				},
				error: function() {
					gLatestEventId = param.eventid;
					var tmp = JSON.parse(localStorage.login_user);
					tmp.eventid = param.eventid;
					localStorage.login_user = JSON.stringify(tmp);
					alert('Publish succeeds');
				}
			});
		}
	});
	return eventDialogView;
});
*/