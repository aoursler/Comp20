function parse(){

    var Request = new XMLHttpRequest();
    var jsondata = "data.json";
    Request.open("GET", jsondata, true);

    Request.onreadystatechange = function(){
        if (Request.readyState == 4 && Request.status == 200){
	    var parsedObjects = JSON.parse(Request.responseText);
	    var elem = document.getElementById("messages");
	    for ( count=0; count<parsedObjects.length; count++){
		//console.log(Object.keys(parsedObjects[count]));
                elem.innerHTML += "<p>" + parsedObjects[count]["content"] + parsedObjects[count]["username"] + "</p>";
	    }
	}
    }

    Request.send();
   
}