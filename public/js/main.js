var visitedUrls = [];
var intial = false;

var slugify = function(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

var concatenate_path = function(path, key) {
    if(key[0] === '[') {
        return path + key;
    }

    if(path === ''){
        return key;
    } else {
        return path + ".." + key;
    }
};

var append = function(key, path, parent){
    var domain = path.split('//')[0];

    path = path.split('//')[1];
    path = 'https://'+domain+'/'+key;

    if(!intial){
        intial = true;
        jQuery('#map').append('<div id="' + slugify(key) + '" onclick="' + path + '"> <h2 class="field">' + key + '</h2> </div>')
    } else {
        if(key){
            jQuery('#'+slugify(parent)).append('<div id="' + slugify(key) + '" class="fields" onclick="' + path + '"> <h2 class="field">' + key + '</h2> </div>')
        }
    }
};

var validateObject = function (domain, object, path) {
    if(!path) {
        path = ''; // TODO - Domain will go here
    }

    for(var key in object) {
        if(object.hasOwnProperty(key)) {
            append(key, path.replace(/\.\./gi, '/') , path.split('..').pop());
            if(typeof(object[key]) === 'object'){
                validateObject(domain, object[key], concatenate_path(path, key));
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
    chrome.runtime.sendMessage({command: 'set', val: true}, function(){
    });
});


jQuery('#stop').click(function(){
    toggleButtons(false, true);

    // Sending message to background
    chrome.runtime.sendMessage({command: 'set', val: false}, function(){
    });
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
        console.log(data.msg);

        validateObject(jQuery('#url').val(), data.msg, false);
    });
});

// Rebuilding on mapping.html
if(!jQuery('#url').length){
    chrome.runtime.sendMessage({command: 'collectMap'}, function(data){
        var message = data.msg;
        console.log(data.msg);

        validateObject(jQuery('#url').val(), data.msg, false);
    });
}

jQuery('#max').click(function(){
    chrome.runtime.sendMessage({command: 'openPage'}, function(){
    });
});

jQuery('div.fields').click(function(){
    console.log(jQuery(this));

});