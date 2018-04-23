var visitedUrls = [];
var intial = false;

var validateURL = function(url, done){
	jQuery.ajax({
    	url: url,
    	data: {},
    	complete: function(data){
			if(data.status === 404 || data.status === 0){
				done(false)
			} else {
				done(true)
			}
		}
	});
}

var slugify = function(text){
//	console.log(text)
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

var concatenate_path = function(path, key) {
	if(path === ''){
		return key;
	} else {
		return path + ".." + key;
	}
}

var append = function(key, url, parent){
	if(!intial){
		intial = true;
		jQuery('#map').append('<div id="' + slugify(key) + '" onclick="' + url+"/"+key + '"> <h2 class="field">' + key + '</h2> </div>')
	} else {
		if(key){
			jQuery('#'+slugify(parent)).append('<div id="' + slugify(key) + '" class="fields" onclick="' + url+"/"+key + '"> <h2 class="field">' + key + '</h2> </div>')
		}
	}
}

var tempParent = '';

var validateObject = function (object, path) {
    if(!path) {
        path = ''; // TODO - Domain will go here
    }
	console.log(object)
    for(var key in object) {
        if(object.hasOwnProperty(key)) {

			var url = "https://" + path.replace(/\.\./gi, '/');
			console.log(url)
			console.log(path)
			validateURL(url, function(data){
				console.log("passed?: " + url + "     -    " + data);
				if(data){
					tempParent = path.split('..').pop();
					append(key, url , tempParent);
				} else {
					console.log(url)
					console.log("FAILED: Page not found")
					tempParent = concatenate_path(path, key)
				}

				if(typeof(object[key]) === 'object'){
					validateObject(object[key], concatenate_path(path, key));
				}
			});
		}
	}
};

var checkNumberOfTabs = function(){
	var tabs = 0;
	chrome.tabs.query({}, function(foundTabs) {
		tabs = foundTabs.length;
	});

	return tabsCount;
}

var main = function(urlLink){
	chrome.tabs.create({ url: urlLink});
}

var verifyURL = function(url){
	return true // TODO - create verification
}

//===========================================================

var toggleButtons = function(start, stop){
	if(start){
		jQuery('#start').addClass('active');
		jQuery('#stop').removeClass('active')
	}

	if(stop){
		jQuery('#stop').addClass('active');
		jQuery('#start').removeClass('active');
	}
};

jQuery('#start').click(function(){
    toggleButtons(true, false);

	// Sending message to background
    chrome.runtime.sendMessage({command: 'set', val: true}, () => {});
});


jQuery('#stop').click(function(){
    toggleButtons(false, true);

	// Sending message to background
    chrome.runtime.sendMessage({command: 'set', val: false}, () => {});
});


//
chrome.runtime.sendMessage({command: 'check'}, function(response) {
	if(response.msg){
		toggleButtons(true, false);
	} else {
		toggleButtons(false, true);
	}
});

//===========================================================

// Grabbing url domain and inserting into domain textbox
jQuery(document).ready(function(){
	chrome.tabs.getSelected(null,function(tab) {
		var domain = tab.url;
		domain = domain.match(/^(http|https):\/\/.*?(?=\/)./gi);
		jQuery('#url')[0].value = domain;
	});
});


// GATHERING MAPPING DATA
jQuery('#createMap').click(function(){
	// Sending message to background
    chrome.runtime.sendMessage({command: 'collectMap'}, function(data){
        var message = data.msg;
		//console.log(data.msg)

		validateObject(data.msg, false);
    });
});

// Rebuilding on mapping.html
if(!jQuery('#url').length){
	chrome.runtime.sendMessage({command: 'collectMap'}, function(data){
        var message = data.msg;
		//console.log(data.msg)

		validateObject(data.msg, false);
    });
}

jQuery('#max').click(function(){
	chrome.runtime.sendMessage({command: 'openPage'}, ()=>{});
});

jQuery('div.fields').click(function(){
	//console.log(jQuery(this));

});
