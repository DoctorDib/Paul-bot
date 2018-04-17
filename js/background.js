chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "http://stackoverflow.com/";
  chrome.tabs.create({ url: newURL });
});

jQuery(document).read(function(){
	alert("Hello");
	console.log("Hello")
});

console.log("Hello")