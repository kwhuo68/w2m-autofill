window.addEventListener('load', function(evt) {
  var temp = document.getElementById('name');
  if(temp != null) {
    
    temp.value = "Kevin";
    console.log(temp.value);

    button = document.getElementsByTagName("input");
    button[button.length-1].click();

    var date = new Date();

    var results = $("div[id*='YouTime']");
	var first   = results[0].id;
	var last    = results[results.length-1].id;
	var start   = first.substr(7, first.length-1) + "000";
	console.log(start);
	var startDate = new Date(parseInt(start) + (date.getTimezoneOffset() * 60 * 1000));
	console.log(startDate);
	var finish   = last.substr(7, last.length-1) + "000";
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
  }
});

console.log("hello world");

