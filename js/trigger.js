


var list = [];

var domain = window.location.origin;

var doc = document.getElementsByTagName('html')[0].innerHTML;



doc = doc.split("https://")


jQuery(doc).each(function(index, element){
	
	
	console.log('https://'+element.split('"')[0])
	console.log(element.split('"')[0].indexOf(domain))
	
    if(('https://'+element.split('"')[0]).indexOf(domain) > -1){
      console.log("COOL")
	  list.push(('https://'+element.split('"')[0]))
    }
});

console.log(doc)
console.log(list)