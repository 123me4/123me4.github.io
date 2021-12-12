function onStart(){ 
	var ctx = document.getElementById('grid').getContext('2d'); 
	ctx.fillStyle = "rgb(200,0,0)"; 
	ctx.beginPath(); 
	for (var x = 0, i = 0; i < 5; x+=44, i++) {
		for (var y = 0, j=0; j < 5; y+=44, j++) {
			ctx.rect (x, y, 40, 40); 
		} 
	}
	ctx.fill(); 
	ctx.closePath();
});
 
