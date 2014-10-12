window.addEventListener('load', function(evt) {
	console.log('starting');


	var mytoken;
	chrome.extension.sendMessage({text:"getStuff"},function(response){
		console.log("getting the message..");
  //This is where the stuff you want from the background page will be
  		console.log(response.type);
  		mytoken = response.type;
  		onAuthorized(mytoken);
	});

	//var evenlist = [];
	var temp = document.getElementById('name');
  	if(temp != null) {
    	temp.value = "Kevin";
    	console.log(temp.value);

    	button = document.getElementsByTagName("input");
    	button[button.length-1].click();
    }

	function onAuthorized(token) {
		console.log('starting authorization..');
		var x = new XMLHttpRequest();
  		var starttime = '2014-10-06T02:29:42.079Z';
  		var endtime = '2014-10-07T02:29:42.079Z';
  		x.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json&timeMin=' + starttime + '&access_token=' + token);
  		var eventlist = [];
  		x.onload = function() {
  			var jsonResponse = JSON.parse(x.response);
      		var items = jsonResponse['items'];
      		var len = items.length;
      		console.log(len);
      		for(var i = 0; i < len; i++) {
      			console.log("pushing stuff");
      			var entry = items[i];
      			console.log("entry is: ");
      			console.log(entry);
      			if(entry['start'] !== undefined) {
      				//accounts for cancellation entries, i.e. no start/end objects.
      				var start = entry['start'];
	      			console.log("start is:");
	      			console.log(start);
	      			var end = entry['end'];
	      			var eventstart = start['dateTime'];
	      			var eventstart2 = new Date(eventstart);
	      			console.log(eventstart2.getDay());
	      			console.log(eventstart2.getHours());
	      			console.log(eventstart2.getMinutes());
	      			//console.log(eventstart2);
	      			var eventend = end['dateTime'];
	      			var eventend2 = new Date(eventend);
	      			var tup = [[eventstart2.getDay(), eventstart2.getHours(), eventstart2.getMinutes()], 
	      				[eventend2.getTime(), eventend2.getHours(), eventend2.getMinutes()]];
	      			eventlist.push(tup);
      			}
      			
      		}  
        //alert(x.response);
        console.log("here is eventlist");
    	console.log(eventlist);
    	//console.log(eventlist[0]);
    	var date = new Date();

    	var results = $("div[id*='YouTime']");
		var first = results[0].id;
		var last = results[results.length-1].id;
		var start = first.substr(7, first.length-1) + "000";
		console.log(start);
		var startDate = new Date(parseInt(start) + (date.getTimezoneOffset() * 60 * 1000));
		console.log(startDate);
		var finish = last.substr(7, last.length-1) + "000";
		console.log(finish);
		var finishDate = new Date(parseInt(finish) + (date.getTimezoneOffset() * 60 * 1000) + (15 * 60 * 1000));
		console.log(finishDate);
		var days = new Date(finishDate - startDate);
		console.log(days.getDate());
		var hours = (finishDate.getHours() - startDate.getHours());
		console.log(hours);
		var minutes = (finishDate.getMinutes() - startDate.getMinutes());
		console.log(minutes);
		var totalIntervals = (hours * 4) + (minutes/15);
		console.log(totalIntervals);
		var allTimes = [];
		for (var i = 0; i < days.getDate(); i++){
			var temp = [];
			for (var j = 0; j < totalIntervals; j++){
				temp.push(false);
			}
			allTimes.push(temp);
		}

		console.log(allTimes);
	  

    	//SelectFromHere()
    	//SelectFromHere(eventlist[0][0]/1000);

    	};
    	x.send();
    	
    //chrome.extension.getBackgroundPage().console.log(evenlist);
	};

	


});


