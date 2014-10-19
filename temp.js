window.addEventListener('load', function(evt) {
	var mytoken;
	var myName;
	var mycal;
	chrome.extension.sendMessage({text:"getStuff"},function(response){
  		mytoken = response.type;
  		myName = response.name;
  		for (var i = response.cal.length - 1; i >= 0; i--) {
  			if (response.cal[i].selected){
  				mycal = response.cal[i].id;
  			}
  		};
  		onAuthorized(mytoken);
	});

	function onAuthorized(token) {
		var date = new Date();

		var results = $("div[id*='YouTime']");
		var first = results[0].id;
		var last = results[results.length-1].id;
		var start = first.substr(7, first.length-1) + "000";
		var startDate = new Date(parseInt(start)+ (date.getTimezoneOffset() * 60 * 1000));
		var finish = last.substr(7, last.length-1) + "000";
		var finishDate = new Date(parseInt(finish)+ (date.getTimezoneOffset() * 60 * 1000) + (15 * 60 * 1000));
		var days = new Date(finishDate - startDate);
		var hours = (finishDate.getHours() - startDate.getHours());
		var minutes = (finishDate.getMinutes() - startDate.getMinutes());
		var totalIntervals = (hours * 4) + (minutes/15);
		var allTimes = [];
		for (var i = 0; i < days.getDate(); i++){
			var temp = [];
			for (var j = 0; j < totalIntervals; j++){
				temp.push(false);
			}
			allTimes.push(temp);
		}
  		var starttime = startDate.toISOString();
  		var endtime = finishDate.toISOString();
  		var eventlist = [];

		var x = new XMLHttpRequest();
		var url = 'https://www.googleapis.com/calendar/v3/calendars/' + mycal + '/events?alt=json&timeMin=' + starttime + '&timeMax=' + endtime + '&access_token=' + token;
		if (mycal == undefined)
			url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json&timeMin=' + starttime + '&timeMax=' + endtime + '&access_token=' + token;
  		x.open('GET', url);
  		x.onload = function() {
  			var jsonResponse = JSON.parse(x.response);
  			if (x.response == undefined)
  				alert("You do not have access to the calendar you have picked. Please open the Options Page and change you calendar preference or reset to Default.");
      		var items = jsonResponse['items'];
      		var len = items.length;
      		for(var i = 0; i < len; i++) {
      			var entry = items[i];
      			//accounts for cancellation entries, i.e. no start/end objects.
  				var start = entry['start'];
      			var end = entry['end'];
      			var eventstart = start['dateTime'];
      			var eventstart2 = new Date(eventstart);
      			var eventend = end['dateTime'];
      			var eventend2 = new Date(eventend);
      			if(entry['start'] !== undefined && entry.start.dateTime !== undefined && eventstart2.getDay() >= startDate.getDay() && eventstart2.getDay() <= finishDate.getDay()){
	      			var tup = {
	      				"start" : {
		      				"day"  : eventstart2.getDay()-1, 
		      				"hour" : eventstart2.getHours(), 
		      				"min"  : eventstart2.getMinutes()
	      				}, 
		      			"end" : {
		      				"day"  : eventend2.getDay()-1, 
		      				"hour" : eventend2.getHours(), 
		      				"min"  : eventend2.getMinutes()
	      				}
	      			};
	      			eventlist.push(tup);
      			}
      			if (!String.prototype.startsWith) {
				  Object.defineProperty(String.prototype, 'startsWith', {
				    enumerable: false,
				    configurable: false,
				    writable: false,
				    value: function (searchString, position) {
				      position = position || 0;
				      return this.lastIndexOf(searchString, position) === position;
				    }
				  });
				}
      			if (entry.hasOwnProperty('recurrence')){
      				var rec = entry.recurrence[0].split(";");
      				for (var k = 0; k < rec.length; k++){
      					if (rec[k].startsWith("B")){
			      			var days = rec[k].split("=")[1].split(",");
			      			for (var j = days.length - 1; j >= 0; j--) {
			      				var day;
			      				if (days[j] == "MO")
			      					day = 0
			      				else if (days[j] == "TU")
			      					day = 1
			      				else if (days[j] == "WE")
			      					day = 2
			      				else if (days[j] == "TH")
			      					day = 3
			      				else if (days[j] == "FR")
			      					day = 4
			      				else if (days[j] == "SA")
			      					day = 5
			      				else 
			      					day = 6 
			      				if (day != eventstart2.getDay() && day >= startDate.getDay()-1 && day <= finishDate.getDay() - 1){
			      					var tup = {
					      				"start" : {
						      				"day"  : day, 
						      				"hour" : eventstart2.getHours(), 
						      				"min"  : eventstart2.getMinutes()
					      				}, 
						      			"end" : {
						      				"day"  : day, 
						      				"hour" : eventend2.getHours(), 
						      				"min"  : eventend2.getMinutes()
				      					}
			      					};
			      					eventlist.push(tup);
			      				}
			      			};

		      			}
		      		}
	      		}
      		}
      		if (eventlist.length > 0){
		    	// Set all events in allTimes to true
		    	var realStartDay = eventlist[0].start.day;
				for (var i = 0; i < eventlist.length; i++){
					var event = eventlist[i];
					var eStartDay   = event.start.day;
					var eStartHour  = event.start.hour;
					var eStartMins  = event.start.min;
					var eFinishDay  = event.end.day;
					var eFinishHour = event.end.hour;
					var eFinishMins = event.end.min;
					if (eStartHour >= startDate.getHours() && eStartHour <= finishDate.getHours()){
						var startIndex = (eStartHour * 4) + (eStartMins/15) - 
										((startDate.getHours() * 4) + (startDate.getMinutes()/15));
						var durationIndex = (eFinishHour * 4) + (eFinishMins/15) - 
										((eStartHour * 4) + (eStartMins/15));
						var eDay = eStartDay - (startDate.getDay() -1);
							
						for(var b = startIndex; b < startIndex + durationIndex; b++){
							allTimes[eDay][b] = true;
						}
						
					}
					else if (eFinishHour >= startDate.getHours() && eFinishHour <= finishDate.getHours()){
						var startIndex = (eFinishHour * 4) + (eFinishMins/15) - 
										((startDate.getHours() * 4) + (startDate.getMinutes()/15));
						var durationIndex = (eFinishHour * 4) + (eFinishMins/15) - 
										((startDate.getHours() * 4) + (startDate.getMinutes()/15));
						var eDay = eFinishDay - (startDate.getDay() - 1);
							
						for(var b = startIndex; b > startIndex - durationIndex; b--){
							allTimes[eDay][b-1] = true;
						}
					}
				}
			}

		    numDays = allTimes.length;


	    	var temp = document.getElementById('name');
			temp.value = myName;
			var scriptNode  = document.createElement('script');
			scriptNode.textContent = "ProcessLogin();"
			document.body.appendChild(scriptNode);

		    setTimeout(function(){
			    for(var a = 0; a < allTimes.length; a++) {
			    	for(var b = 0; b < allTimes[a].length; b++) {
			    		if(allTimes[a][b] === false) {
			    			var indexTime = (startDate.getTime() - (date.getTimezoneOffset() * 60 * 1000))/1000 + 86400*a + 15*60*b;
			    			var scriptNode  = document.createElement('script');
			    			scriptNode.textContent = "SelectFromHere(" + indexTime + ");";
							document.body.appendChild(scriptNode);
							var scriptNode2 = document.createElement('script');
							scriptNode2.textContent = "SelectToHere(" + indexTime + ");";
							document.body.appendChild(scriptNode2);
							var scriptNode3 = document.createElement('script');
							scriptNode3.textContent = "MouseUp(); SelectStop();";
							document.body.appendChild(scriptNode3);
							//console.log(indexTime);
			    		}
			    	}
			    }
			}, 500);		        
		};
    	x.send();
	};

});


