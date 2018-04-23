var visitedUrls = [];
var initial = false;

var slugify = function(text){
//	console.log(text)
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

var append = function(key, url, parent){

	console.log("1: " + key);
	console.log("2: " + url);
	console.log("3: " + parent);

	if(!initial){
		initial = true;
		jQuery('#map').append('<div id="' + slugify(key) + '" onclick="' + url+"/"+key + '"> <h2 class="field">' + key + '</h2> </div>')
	} else {
		if(key){
			jQuery('#'+slugify(parent)).append('<div id="' + slugify(key) + '" class="fields" onclick="' + url+"/"+key + '"> <h2 class="field">' + key + '</h2> </div>')
		}
	}
};

var list = [];

var validateURL = function(url, obj, done){
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            done(obj, this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
};

var concatenate_path = function(path, key) {
	if(path === ''){
		return key;
	} else {
		return path + ".." + key;
	}
};


var validateObject = function (object, path) {
	console.log("//",object);
	
    if(!path) {
		console.log("not found");
        for (var item in object) {
			if(object.hasOwnProperty(item)){
				path = item;

				append(item,  'https://'+path+'/', path);
				validateObject(object[path], path);
				break;
			}
		}
    } else {
		for(var key in object) {
			if(object.hasOwnProperty(key) ) {
				var url = 'https://'+path.replace(/\.\./gi, '/')+'/' + key;
				console.log(url);
				
				console.log(key);
				console.log(url);
				
				var data = {key:key, url:url, path: path, objectChild:object[key]};
				
				validateURL(url, data, function(data, response){
					console.log(response)
                    if(response.status === 200){

                        console.log("Hello");
                        if(list.length > 1){
                            list.push(data.key);
                            append(list.join('/'), data.url, data.path);
                            list = [];
                        } else {
                            append(data.key, data.url, data.path);
                        }

                    } else {
                        console.log("FAILED")
                        list.push(data.key);
                        console.log(list)

                    }

                    if(typeof(data.objectChild[data.key])==='object'){
                        validateObject(data.objectChild[data.key], concatenate_path(data.path, data.key));
                    }
				});
				
				
			}
		}
	}
};

var checkNumberOfTabs = function(){
	var tabs = 0;
	chrome.tabs.query({}, function(foundTabs) {
		tabs = foundTabs.length;
	});

	return tabsCount;
};

var main = function(urlLink){
	chrome.tabs.create({ url: urlLink});
};

var verifyURL = function(url){
	return true; // TODO - create verification
};

//===========================================================

var toggleButtons = function(start, stop){
	if(start){
		jQuery('#start').addClass('active');
		jQuery('#stop').removeClass('active')
	}

	if(stop){
		jQuery('#stop').addClass('active');
		jQuery('#start').removeClass('active');
	}
};

jQuery('#start').click(function(){
    toggleButtons(true, false);

	// Sending message to background
    chrome.runtime.sendMessage({command: 'set', val: true}, () => {});
});


jQuery('#stop').click(function(){
    toggleButtons(false, true);

	// Sending message to background
    chrome.runtime.sendMessage({command: 'set', val: false}, () => {});
});


//
chrome.runtime.sendMessage({command: 'check'}, function(response) {
	if(response.msg){
		toggleButtons(true, false);
	} else {
		toggleButtons(false, true);
	}
});

//===========================================================

// Grabbing url domain and inserting into domain textbox
jQuery(document).ready(function(){
	chrome.tabs.getSelected(null,function(tab) {
		var domain = tab.url;
		domain = domain.match(/^(http|https):\/\/.*?(?=\/)./gi);
		jQuery('#url')[0].value = domain;
	});
});


// GATHERING MAPPING DATA
jQuery('#createMap').click(function(){
	// Sending message to background
    chrome.runtime.sendMessage({command: 'collectMap'}, function(data){
        var message = data.msg;
		//console.log(data.msg)

		validateObject(data.msg, false);
    });
});

// Rebuilding on mapping.html
if(!jQuery('#url').length){
	chrome.runtime.sendMessage({command: 'collectMap'}, function(data){
        var message = data.msg;
		//console.log(data.msg)

		validateObject(data.msg, false);
    });
}

jQuery('#max').click(function(){
	chrome.runtime.sendMessage({command: 'openPage'}, ()=>{});
});

jQuery('div.fields').click(function(){
	//console.log(jQuery(this));

});
