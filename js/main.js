
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
	
	var url = jQuery('#url').val();
	if(url && verifyURL(url)){
		main(url);
	}
});


jQuery('#stop').click(function(){
	jQuery(this).addClass('active');
	jQuery('#start').removeClass('active');
});