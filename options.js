var defaultName = "Fill in name here";
var calendars = [{"name" : "Default", selected: true, id: "primary"}]

function loadOptions() {
	var myName = localStorage["myName"];
	var myCals = JSON.parse(localStorage["myCals"]);
	console.log(myCals);

	if (myName == undefined || myName.length > 20)
		myName = defaultName;

	var select = document.getElementById("name");
	select.value = myName;

	if (myCals == undefined || myCals == [])
		myCals = calendars;


	for(var i=0; i<myCals.length; i++){
		var name = myCals[i].name;
		var radioBtn = $('<input type="radio" name="calendarPicker" id="' + i + '" /><label for="' + i + '">' + name + '</label>');
	    radioBtn.appendTo('#target');
	}
}

function saveOptions() {
	var select = document.getElementById("name").value;
	localStorage["myName"] = select;

	var cal = $('input[name=calendarPicker]:checked').attr('id');
	var myCals = JSON.parse(localStorage["myCals"]);
	for (var i = myCals.length - 1; i >= 0; i--) {
		myCals[i].selected = false;
	};
	myCals[cal].selected = true;
	localStorage['myCals'] = JSON.stringify(myCals);
}

function eraseOptions() {
	localStorage["myName"] = defaultName;
	location.reload();
	$('input[name="calendarPicker"]').prop('checked', false);
	localStorage['myCals'] = JSON.stringify(calendars);

}

$(document).ready(function(){
	loadOptions();
	$('#save').click(function(){
		saveOptions();
		$('#name').css({"border" : "3px solid green"});
		$('#done').css({"display" : "inline"})
		setTimeout(function(){
			$('#done').fadeOut();
		}, 1000);
	});
	$('#reset').click(function(){
		eraseOptions();
		$('#name').css({"border" : "3px solid #fff"});
	});
});