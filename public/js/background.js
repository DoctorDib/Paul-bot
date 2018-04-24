var active = false; // Always deactivate on initial load.

var domain = false;
var collectedURLS = [];
var mapping = {};
var visitedURLS = [];

/*var checkSetDomain = function(){
	
};*/

var checkSaveList = function(data, done){
	jQuery(data).each(function(index, element){
		if(!collectedURLS.includes(element)){
			collectedURLS.push(element);
		}
	});
	
	setTimeout(function(){
		done();
	}, 1000);
};

var saveMapping = function(data, done){
	if(domain !== data.domain){
		mapping = {};
		domain = data.domain;
	}

    mapping = jQuery.extend(true, mapping, data.data);
	done()
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.command){
		case 'check':
			sendResponse({msg: active, collected: collectedURLS});
			break; 
		case 'set':
			console.log("Setting Active Status: " + request.val);
			active = request.val;
			break;
		case 'saveList':
			checkSaveList(request.val, function(){
				sendResponse({msg: collectedURLS});
			});
			break;
		case 'saveMapping':
			saveMapping(request.val, function(){
				sendResponse({domain: domain, data: mapping});
			});
			break;
		case 'collectMap':
			sendResponse({msg: mapping});
			break;	
		case 'openPage':
			chrome.tabs.create({url:chrome.extension.getURL('public/mapping.html')});
			break;
	}
});


/*while(true){
    if(active){
        jQuery(collectedURLS).each(function(index, element){

            if(!visitedURLS.includes(element)){
                visitedURLS.push(element);
                console.log(element)
                chrome.tabs.create({url:element});
            }
        });
    }
}*/