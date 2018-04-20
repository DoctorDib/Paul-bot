var visitedUrls = [];

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