function init(){
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "duckhunt-background.gif";
    var ducks = new Image();
    ducks.src = "duckhunt_various_sheet.png";
    img.onload = function(){
	ctx.drawImage(img, 25, 25, 800, 600) 
	ctx.drawImage(ducks, 0, 120, 35, 35, 300, 150, 50, 50)
	ctx.drawImage(ducks, 210, 120, 45, 35, 400, 100, 50, 50)
    };
}