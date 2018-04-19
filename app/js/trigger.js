var visitedUrls = [];

var verifyURL = function(url){
	return true // TODO - create verification
}

var main = function(urlLink){
	chrome.tabs.create({ url: urlLink});
}

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.runtime.sendMessage(tab.id, {action:'check'}, function(data){
    console.log(data)
    })
})



/*jQuery(document).ready(function(){
    chrome.tabs.sendMessage(tabs.id, {command:'check'}, function(data){
        console.log(data)
        if(data){

            var list = [];

            var domain = window.location.origin;
            var doc = document.getElementsByTagName('html')[0].innerHTML;

            // regex
            var reg = domain + '.*?(?=")'
            var regEX = new RegExp(reg, 'gi')


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
        }
    });
});*/
