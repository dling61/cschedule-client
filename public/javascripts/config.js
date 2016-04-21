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
		drop:		'../javascripts/drop.min',
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
	}, // used for setting up all Shims (see below for more detail)
    });

requirejs([
	'jquery', 
	'js/app',
], function($, App){
	/* Global Variables  */
	var gFetchedEvents;
	var communityEvents;

	var communityListView;
	var gParticipantsListView;
	var userAddView;
	var participantView;
	var gEventsView;
	var gEventView;

	var gEvents;
	var gParticipants;
	var gTasks;
	var gTasksView;
	var gTaskAssignees;
	var gTaskHelpers;

	var gLoginUserId;

	var gLatestCommunityId;
	var gLatestEventId;
	var gLatestTaskId;
	var gLatestTaskHelperId;
	var gLatestParticipantId;
	var gLatestBaseEventId;
	var gLatestRepeatScheduleId;
        var gLatestAssignmentPoolId;
	var gLoginUser;
	var gLoginUserName;
	var gSelectedCommunityId;

	var gSeverSetting;
	
	/* Template */
	function loadTemplate(importID, templateID) {
	var t = document.querySelector(importID),
		t = t.import.querySelector(templateID),
		t = t.content.cloneNode(true);
	return t;
	}
	$("body").append(loadTemplate("#participantsListViewTpl", "#participantsListTemplate"));
//	$("body").append(loadTemplate("#tasksListViewTpl",        "#tasksListTemplate"));
	//Can be used to load flyout: $("#blackBox").html(loadTemplate(importID, templateID));
	
	/* evaluating underscore in external templates */
	function evalUnderscore(evalSelector, jsonReplace) {
		var template = _.template($(evalSelector).html());    
		$(evalSelector).html(template(jsonReplace));
		$(evalSelector + " script").replaceWith($(evalSelector + " script").html());
	}
	
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
			options.url = 'http://api.cschedule.org/' +
				options.url + '?d=IOS&sc=28e336ac6c9423d946ba02dddd6a2632&v=1.4.0&';
		}
	});
	
	/* Load Window */
	$(function(){
		window.app = new App();
	});
});