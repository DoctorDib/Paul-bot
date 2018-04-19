
var visitedUrls = [];

var verifyURL = function(url){
	return true // TODO - create verification
}

var main = function(urlLink){
	chrome.tabs.create({ url: urlLink});
}

jQuery('#start').click(function(){
    jQuery(this).addClass('active');
    jQuery('#stop').removeClass('active');

    //var url = jQuery('#url').val();
    //if(url && verifyURL(url)){
        //main(url+"?bot=true");
    chrome.tabs.sendMessage(1, {command:'set', val: true}, ()=>{})
    //}
});


jQuery('#stop').click(function(){
    jQuery(this).addClass('active');
    jQuery('#start').removeClass('active');

    //var url = jQuery('#url').val();
    //if(url && verifyURL(url)){
        //main(url+"?bot=false");
    chrome.tabs.sendMessage(2, {command:'set', val: false}, ()=>{})
    //}
}); 
