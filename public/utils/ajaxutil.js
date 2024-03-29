

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var apiLayerRegex = /^https:\/\/api.layer.com\/.*/,
        jsonFileRegex = /^.*json$/,
        layerIdentityRegex = /^https:\/\/layer-identity-provider.herokuapp.com\/.*/;

    if (apiLayerRegex.test(options.url) || layerIdentityRegex.test(options.url)) {

    } else if (jsonFileRegex.test(options.url)) {

    } else {
			options.url = 'http://apitest2.cschedule.com/' +
				options.url ;//+ '&';
		/* Session Cookie */	
			options.xhrFields = {
				withCredentials: false
			};	
    }
});