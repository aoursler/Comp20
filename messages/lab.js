parse();

function parse(){
    jsondata = "http://messagehub.herokuapp.com/messages.json";
    parsedOjects = JSON.parse(jsondata);
    elem = document.getElementById("results");
    for ( count=0; count<parsedObjects[count]; count++){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count] + "</p>";
    }
}