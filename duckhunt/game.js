function init(){
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "duckhunt-background.gif";
    var duck1 = new Image();
    var duck2 = new Image();
    duck1.src = "duckhunt_various_sheet.png";
    duck2.src = "duckhunt_various_sheet.png";
    img.onload = function(){
	ctx.drawImage(img, 25, 25, 800, 600) 
	//	ctx.drawImage(duck1,
    };
    
    console.log("Hi!");
}