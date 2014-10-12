var defaultName = "Fill in name here";

function loadOptions() {
	var myName = localStorage["myName"];

	if (myName == undefined || myName.length > 20)
		myName = defaultName;

	var select = document.getElementById("name");
	select.value = myName;
}

function saveOptions() {
	var select = document.getElementById("name").value;
	localStorage["myName"] = select;
}

function eraseOptions() {
	localStorage["myName"] = defaultName;
	location.reload();
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