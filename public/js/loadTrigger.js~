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


var overall = {};

var nest = function(obj, keys, v) {
    if (keys.length === 1) {
      obj[keys[0]] = v;
    } else {
      var key = keys.shift();
      obj[key] = nest(typeof obj[key] === 'undefined' ? {} : obj[key], keys, v);
    }

    return obj;
};

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
				var url = element.split('/');
				
				var temp = {};
                url[0] = domain.split('/').pop();
                console.log(url)
				nest(temp, url, true)
				
				list.push(domain+element);
				
				jQuery.extend(true, overall, temp);
			}
		});

		//console.log(doc)

		jQuery(domainMatch).each(function(index, element){

			if(!list.includes(element) && element !== domain){
                var url = element.split(domain)[1].split('/');
                
                url[0] = domain.split('/').pop();
				
				var temp = {};	
				console.log(url)			
				nest(temp, url, true)
				
				list.push(element);
				
				jQuery.extend(true, overall, temp);
			}
		});
		
		// Saving array of urls.
		chrome.runtime.sendMessage({command: 'saveList', val: list}, function(data){
			console.log(data)
		});
		  
        // Saving the mapping of the site
		chrome.runtime.sendMessage({command: 'saveMapping', val: overall}, function(data){
			console.log("======")
			console.log(data)
			console.log("======")
		});
		
	
	}
});
