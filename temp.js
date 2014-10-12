window.addEventListener('load', function(evt) {
  var temp = document.getElementById('name');
  if(temp != null) {
    
    temp.value = "Kevin";
    console.log(temp.value);

    button = document.getElementsByTagName("input");
    button[button.length-1].click();
  }
});

console.log("hello world");
