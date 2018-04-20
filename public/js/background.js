var active = true; // Always deactivate on intial load.

var collectedURLS = [];

var checkSave = function(data, done){
	console.log("Hello")
	jQuery(data).each(function(index, element){
		console.log(element)
		if(!collectedURLS.includes(element)){
			collectedURLS.push(element);
		}
	});
	
	setTimeout(function(){
		done();
	}, 1000);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.command){
			case 'check':
				sendResponse({msg: active});
				break;
			case 'set':
				console.log("Setting Active Status: " + request.val);
				active = request.val;
				break;
			case 'save':
				checkSave(request.val, function(){
					sendResponse({msg: collectedURLS});
				});
				//sendResponse({msg: collectedURLS});
				break;
		}
	}
);