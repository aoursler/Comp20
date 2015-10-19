function parse(){
 
    var Request = new XMLHttpRequest();
    var jsondata = "http://messagehub.herokuapp.com/messages.json";
    Request.open("GET", jsondata, true);

    Request.onreadystatechange = function(){
	if (Request.readyState == 4 && Request.status == 200){
  
	}
    }

    Request.send();

    var parsedOjects = JSON.parse(jsondata);
    var elem = document.getElementById("results");
    for (count = 0; count < parsedObjects[count]){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count] + "</p>";
    }
}