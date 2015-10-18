function parse(){
    var jsondata = 'http://messagehub.herokuapp.com/messages.json';
    xhr = new XMLHttpRequest();
    xhr.open("get", "jsondata", true);

    parsedObjects = JSON.parse(xhr);

    elem = document.getElementById("messages");

    for ( count=0; count<parsedObjects.length; count++){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count]["content"] + parsedObjects["username"] + parsedObjects["active"] + parsedObjects["created_at"] + parsedObjects["updated_at"] + "</p>";
    }
}