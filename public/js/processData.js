const keyObjects = ['dataLayer', 'digitalData', 'universal_variable'];

var information = {
    html: document
}

console.log(document.html)

for(var data in window){
    if(window.hasOwnProperty(data)){
        
        switch(data){
            default:
                if(keyObjects.includes(data)){
                    information.windowData = information.windowData || [];
                    information.windowData.push({key: data, data: window[data]});
                }
                break;
        }
    }
}

console.log(information)

chrome.runtime.sendMessage({command: 'processData', value: information}, function(response) {
});