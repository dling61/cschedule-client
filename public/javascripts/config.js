require.config({
    // your configuration key/values here
    baseUrl: "app", // generally the same directory as the script used in a data-main attribute for the top level script
    paths: {
		jquery:     'http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
		underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
		backbone:   'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone',
        moment:     'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min',
		jqueryui:	'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
		jquerypo:	'http://vast-engineering.github.io/jquery-popup-overlay/jquery.popupoverlay',
		tether:		'../javascripts/tether.min',
		drop:		'../javascripts/drop',
        //WFBdatetimepicker: '../javascripts/jquery.datetimepicker.js'
	}, // set up custom paths to libraries, or paths to RequireJS plugins
    shim: {
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
		'jqueryui': {
            deps: ['jquery'],
			exports: '$'
        },
		'drop': {
            deps: ['tether'],
			exports: 'Drop'
        },	
		/*'datetimepicker': {
            deps: ['jquery'],
			exports: '$'
        },*/	
	}, // used for setting up all Shims (see below for more detail)
    });

requirejs([
	'jquery', 
	'js/app',
], function($, App){
	/* Global Variables  */
	var gFetchedBaseEvents;
	var gFetchedEvents;
	var communityEvents;

	var communityListView;
	var gParticipantsListView;
	var userAddView;
	var participantView;
	var gEventsView;
	var gEventsView2;
	var gEventView;

	var gBaseEvents;
	var gEvents;
	var gParticipants;
	var gTasks;
	var gTasksView;
	var gTasksView2;
	var gTaskAssignees;
	var gTaskHelpers;

	var gLoginUserId;
    var gLoginUser;
	var gLoginUserName;
	var gSelectedCommunityId;

	var gServerSetting;

    
    // NOTE: need to add an entry for each of these to app.js
	var gLatestCommunityId;
	var gLatestEventId;
	var gLatestTaskId;
	var gLatestTaskHelperId;
	var gLatestParticipantId;
    var gLatestAssignmentPoolId;
    
	
	/* Template */
	jQuery["loadTemplate"] = function (importID, templateID) {
	var t = document.querySelector(importID),
		t = t.import.querySelector("head > template"),
		t = t.content.cloneNode(true);
	return t;
	};
    
    
    
    
    
    
        /* evaluating underscore in external templates */
    jQuery["evalUnderscore"] = function(evalSelector, jsonReplace) {
        var template = _.template($(evalSelector).html());
        $(evalSelector).html(template(jsonReplace));
        $(evalSelector + " script").replaceWith($(evalSelector + " script").html());
    };

            
            
	$("body").append($.loadTemplate("#participantsListViewTpl"));
	$("body").append($.loadTemplate("#tasksListViewTpl"));
    
//	$("body").append(loadTemplate("#tasksListViewTpl",        "#tasksListTemplate"));
	//Can be used to load flyout: $("#blackBox").html(loadTemplate(importID, templateID));
	
    
    jQuery["postJSON"] = function( url, data, callback ) {
        // shift arguments if data argument was omitted
        if ( jQuery.isFunction( data ) ) {
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: "POST",
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: callback
        });
    };
    
    
	/* Prefilter */
	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		var apiLayerRegex = /^https:\/\/api.layer.com\/.*/,
			jsonFileRegex = /^.*json$/,
			layerIdentityRegex = /^https:\/\/layer-identity-provider.herokuapp.com\/.*/;
			
		if (apiLayerRegex.test(options.url) || layerIdentityRegex.test(options.url)) {

		} else if (jsonFileRegex.test(options.url)) {

		} else {
            //WFB options.url = 'http://api.cschedule.org/' +

			//WFB options.url = 'http://apitest2.servicescheduler.net/' +
			options.url = 'http://apitest2.cschedule.com/' +
				options.url ;//+ '&';
				
			/* Session Cookie */	
			options.xhrFields = {
				withCredentials: false
			};
		}
	});
	
	/* Load Window */
	$(function(){
		window.app = new App();
	});
});