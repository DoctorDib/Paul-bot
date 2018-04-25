var active = false; // Always deactivate on initial load.
var grabData = false; // Always deactivate on initial load.

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

var processData = function(data){

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.command){
		case 'check':
			switch(request.key){
				case 'active':
					sendResponse({msg: active, collected: collectedURLS});
					break;
				case 'grabData':
					sendResponse({msg: grabData});
					break;
			}
			break;
		case 'set':
			console.log("Setting " + request.key + " Status: " + request.val);
			switch(request.key){
				case 'active':
					active = request.val;
					break;
				case 'grabData':
					grabData = request.val;
					break;
			}
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
		case 'processData':
			processData(request.value);
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
