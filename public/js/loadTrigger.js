var verifyURL = function(url){
	return true // TODO - create verification
}

var main = function(urlLink){
	chrome.tabs.create({ url: urlLink});
}

/*chrome.tabs.query({}, function(foundTabs) {
	var tabsCount = foundTabs.length;
	console.info("tabsCount = " + tabsCount);
});*/


chrome.runtime.sendMessage({command: 'check'}, function(response) {
	
  if(response.msg){
		var list = [];

		var domain = window.location.origin;
		var doc = document.getElementsByTagName('html')[0].innerHTML;

		// regex
		var reg = domain + '.*?(?=")';
		var regEX = new RegExp(reg, 'gi');

		var domainMatch = doc.match(regEX);

		var urlMatch = doc.match(/(?<=href=").*?(?=")/gi);


		jQuery(urlMatch).each(function(index, element){
			if(element.charAt(0) === '/' && !list.includes(domain+element)){
				list.push(domain+element);
			}
		});

		//console.log(doc)

		jQuery(domainMatch).each(function(index, element){

			if(!list.includes(element) && element !== domain){
				list.push(element);
			}
		});
		
		console.log(list);
		chrome.runtime.sendMessage({command: 'save', val: list}, function(data){
			console.log(data)
		});
	}
});