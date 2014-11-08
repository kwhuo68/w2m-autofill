var mytoken; var cal;

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      mytoken = token;
      var x = new XMLHttpRequest();
      x.open('GET', 'https://www.googleapis.com/calendar/v3/users/me/calendarList?alt=json' + '&access_token=' + token);
	    x.onload = function(){
		  var jsonResponse = JSON.parse(x.response);
		  var obj = [];
		  for (var i= 0; i< jsonResponse.items.length; i++){
		  	if (i == 0)
		  		obj.push({"name" : jsonResponse.items[i].summary, "selected" : true, "id": jsonResponse.items[i].id});
		  	else 
		  		obj.push({"name" : jsonResponse.items[i].summary, "selected" : false, "id": jsonResponse.items[i].id});
		  }
		  localStorage['myCals'] = JSON.stringify(obj);
		  cal = obj;
	  };
      x.send();
});



chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.text == "getStuff"){
    var myName = localStorage['myName'];
    var obj = JSON.parse(localStorage['myCals']);
    sendResponse({type: mytoken, name: myName, cal: obj});
  }
});



