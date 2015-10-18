function parse(){
    var myRequest = new XMLHttpRequest();
    var jsondata = 'http://messagehub.herokuapp.com/messages.json';
 
    myRequest.open("GET", "jsondata", true);
    myRequest.send();

    parsedObjects = JSON.parse(jsondata);

    elem = document.getElementById("messages");

    for ( count=0; count<parsedObjects.length; count++){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count]["content"] + parsedObjects["username"] + parsedObjects["active"] + parsedObjects["created_at"] + parsedObjects["updated_at"] + "</p>";
    }
}