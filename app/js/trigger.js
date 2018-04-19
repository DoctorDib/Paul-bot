
require(
    { baseUrl: chrome.extension.getURL("/") },
    ["app/js/Background"],
    function (Background) {
    console.log("boop")
      Background.run();
    }
);




/*if(window.location.href.indexOf('bot=true') > -1){
    document.cookie = 'bot=' + true;
} else if(window.location.href.indexOf('bot=false') > -1){
    document.cookie = 'bot=' + false;
}


var tabs = 0;
/*chrome.tabs.query({windowType:'normal'}, function(tabs) {
    console.log('Number of open tabs in all normal browser windows:',tabs.length);
    tabs = tabs.length;
}); 


if(document.cookie.indexOf('bot=true') > -1 && tabs < 10){

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

    console.log(list)
    
}*/
