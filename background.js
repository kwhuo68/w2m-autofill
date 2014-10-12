chrome.extension.getBackgroundPage().console.log("testing init of oauth..");

var mytoken;

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      chrome.extension.getBackgroundPage().console.log("got oauth..");
      mytoken = token;
      console.log(token);
      console.log("sent message..");
    });



chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "getStuff"){
    var myName = localStorage['myName'];
    sendResponse({type: mytoken, name: myName});
  }
});



