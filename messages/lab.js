function parse(){
    jsondata = '[{"id":7,"app_id":4,"content":"admin","username":"admin","active":true,"created_at":"2015-09-14T19:11:00.471Z","updated_at":"2015-09-14T19:11:00.471Z"},{"id":8,"app_id":1,"content":"Foo","username":"fury","active":true,"created_at":"2015-10-15T16:58:52.451Z","updated_at":"2015-10-15T16:58:52.451Z"},{"id":9,"app_id":1,"content":"Bar","username":"fury","active":true,"created_at":"2015-10-15T16:59:15.289Z","updated_at":"2015-10-15T16:59:15.289Z"}]'//http://messagehub.herokuapp.com/messages.json';
    parsedObjects = JSON.parse(jsondata);

    elem = document.getElementById("messages");

    for ( count=0; count<parsedObjects.length; count++){
	console.log(Object.keys(parsedObjects[count]));
	elem.innerHTML += "<p>Data: " + parsedObjects[count] + "</p>";
    }
}