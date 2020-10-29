var img_ele = null,
  x_cursor = 0,
  y_cursor = 0,
  x_img_ele = 0,
  y_img_ele = 0;

/* 
function zoom(zoomincrement) {
  img_ele = document.getElementById('drag-img');
  var pre_width = img_ele.getBoundingClientRect().width, pre_height = img_ele.getBoundingClientRect().height;
  img_ele.style.width = (pre_width * zoomincrement) + 'px';
  img_ele.style.height = (pre_height * zoomincrement) + 'px';
  img_ele = null;
}

document.getElementById('zoomout').addEventListener('click', function() {
  zoom(0.5);
});
document.getElementById('zoomin').addEventListener('click', function() {
  zoom(1.5);
});
 */

function start_drag() {
  img_ele = this;
  x_img_ele = window.event.clientX - document.getElementById('drag-img').offsetLeft;
  y_img_ele = window.event.clientY - document.getElementById('drag-img').offsetTop;

  console.log("start drag");
}

function stop_drag() {
  img_ele = null;
  
  console.log("stop drag");
}

function while_drag() {
  var x_cursor = window.event.clientX;
  var y_cursor = window.event.clientY;
  if (img_ele !== null) {
    img_ele.style.left = (x_cursor - x_img_ele) + 'px';
    img_ele.style.top = ( window.event.clientY - y_img_ele) + 'px';

      console.log(img_ele.style.left+' - '+img_ele.style.top);

  }
}

var di = document.getElementById('drag-img');
if(di) {
	di.addEventListener('mousedown', start_drag);
	
	console.log("image event added");
}

var con = document.getElementById('container')
if(con) {
	con.addEventListener('mousemove', while_drag);
	con.addEventListener('mouseup', stop_drag);
	
	console.log("container events added");
}