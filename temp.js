window.addEventListener('load', function(evt) {
	console.log('starting');


	var mytoken;
	chrome.extension.sendMessage({text:"getStuff"},function(response){
		console.log("getting the message..");
  		console.log(response.type);
  		mytoken = response.type;
  		onAuthorized(mytoken);
	});

	

	var date = new Date();

	var results = $("div[id*='YouTime']");
	var first = results[0].id;
	var last = results[results.length-1].id;
	var start = first.substr(7, first.length-1) + "000";
	console.log(start);
	var startDate = new Date(parseInt(start));
	//+ (date.getTimezoneOffset() * 60 * 1000))
	console.log(startDate);
	var finish = last.substr(7, last.length-1) + "000";
	console.log(finish);
	var finishDate = new Date(parseInt(finish));
	//+ (date.getTimezoneOffset() * 60 * 1000) + (15 * 60 * 1000)
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


	function onAuthorized(token) {
		console.log('starting authorization..');
		var x = new XMLHttpRequest();
  		var starttime = startDate.toISOString();
  		var endtime = finishDate.toISOString();
  		x.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json&timeMin=' + starttime + '&timeMax=' + endtime + '&access_token=' + token);
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
      			if(entry['start'] !== undefined && entry.start.dateTime !== undefined) {
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
	      			var tup = {
	      				"start" : {
		      				"day"  : eventstart2.getDay(), 
		      				"hour" : eventstart2.getHours(), 
		      				"min"  : eventstart2.getMinutes()
	      				}, 
		      			"end" : {
		      				"day"  : eventend2.getDay(), 
		      				"hour" : eventend2.getHours(), 
		      				"min"  : eventend2.getMinutes()
	      				}
	      			};
	      			eventlist.push(tup);
      			}
      			
      		}
	        console.log("here is eventlist");
	    	console.log(eventlist);

	    	// Set all events in allTimes to true
	    	var realStartDay = eventlist[0].start.day;
			for (var i = 0; i < eventlist.length; i++){
				var event = eventlist[i];
				var eStartDay   = event.start.day;
				console.log(eStartDay);
				var eStartHour  = event.start.hour;
				console.log("start hour:" + eStartHour);
				var eStartMins  = event.start.min;
				var eFinishDay  = event.end.day;
				var eFinishHour = event.end.hour;
				var eFinishMins = event.end.min;
				if (eStartHour >= startDate.getHours() && eStartHour <= finishDate.getHours()){
					var startIndex = (eStartHour * 4) + (eStartMins/15) - 
									((startDate.getHours() * 4) + (startDate.getMinutes()/15));
					var durationIndex = (eFinishHour * 4) + (eFinishMins/15) - 
									((eStartHour * 4) + (eStartMins/15));
					var eDay = eStartDay - startDate.getDay();
					console.log(startIndex + " | " + durationIndex);
						
					for(var b = startIndex; b < startIndex + durationIndex; b++){
						allTimes[eDay][b] = true;
						console.log(b);
					}	
					
				}
				else if (eFinishHour >= startDate.getHours() && eFinishHour <= finishDate.getHours()){
					var startIndex = (eFinishHour * 4) + (eFinishMins/15) - 
									((startDate.getHours() * 4) + (startDate.getMinutes()/15));
					var durationIndex = (eFinishHour * 4) + (eFinishMins/15) - 
									((startDate.getHours() * 4) + (startDate.getMinutes()/15));
					var eDay = eFinishDay - startDate.getDay();
					console.log(startIndex + " | " + durationIndex);
						
					for(var b = startIndex; b > startIndex - durationIndex; b--){
						allTimes[eDay][b] = true;
						console.log(b);
					}
				}
			}

			console.log(allTimes);
			//console.log(allTimes.length);
			

			/*var temp = document.getElementById('name');
		  	if(temp != null) {
		    	
		    	console.log(temp.value);

		    	button = document.getElementsByTagName("input");
		    	button[button.length-1].click();
		    }*/
		    //console.log(eFinishDay.getDay());
		    console.log(eFinishDay);
		    console.log(realStartDay);
		    numDays = allTimes.length;
		    console.log("number of days: " + numDays);
		    console.log(eventlist);


	    	var temp = document.getElementById('name');
			temp.value = "Pranav";
			var scriptNode  = document.createElement('script');
			scriptNode.textContent = "ProcessLogin();console.log(UserID)"
			document.body.appendChild(scriptNode);

		    setTimeout(function(){
			    for(var a = 0; a < allTimes.length; a++) {
			    	for(var b = 0; b < allTimes[a].length; b++) {
			    		if(allTimes[a][b] === false) {
			    			var indexTime = startDate.getTime()/1000 + 86400*a + 15*60*b;
			    			var scriptNode  = document.createElement('script');
			    			scriptNode.textContent = "SelectFromHere(" + indexTime + "); console.log(IsMouseDown);";
							document.body.appendChild(scriptNode);
							var scriptNode2 = document.createElement('script');
							scriptNode2.textContent = "SelectToHere(" + indexTime + "); console.log(IsMouseDown);";
							document.body.appendChild(scriptNode2);
							var scriptNode3 = document.createElement('script');
							scriptNode3.textContent = "MouseUp(); SelectStop(); console.log(IsMouseDown);";
							document.body.appendChild(scriptNode3);
							//console.log(indexTime);
			    		}
			    	}
			    }
			}, 200);

		    /*var scriptNode1  = document.createElement('script');
			scriptNode1.textContent = "ReColorGroup();"
			document.body.appendChild(scriptNode1);*/
		        
			
		};
    	x.send();
	};

});


