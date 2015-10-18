function parse(){
    //    jsondata = "http://messagehub.herokuapp.com/messages.json";
    parsedOjects = JSON.parse("http://messagehub.herokuapp.com/messages.json");
	//jsondata);

    elem = document.getElementById("messages");

    for ( count=0; count<parsedObjects[count]; count++){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count] + "</p>";
    }
}