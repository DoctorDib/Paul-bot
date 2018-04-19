var active = false;


chrome.runtime.onMessage.addListener(function(sender, msg, sendResponse) {
    console.log("Hello")
    console.log(msg)
    
    /*switch(msg.action){
        case 'check':
            console.log(active)
            sendResponse(active);
            break;
        case 'set':
            console.log("SETTING ACTIVE: " + msg.val);
            active = msg.val;
            break;
    }*/
}

