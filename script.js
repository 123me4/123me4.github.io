(function() {
  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }
  var img_ele = null,
    event_start = hasTouch() ? 'touchstart' : 'mousedown',
    event_move = hasTouch() ? 'touchmove' : 'mousemove',
    event_end = hasTouch() ? 'touchend' : 'mouseup';
  console.log(event_start + "|" + event_move + "|" + event_end);
  //(function() {
//    function zoom(zoomincrement) {
//      img_ele = document.getElementById('drag-img');
//      var pre_width = img_ele.getBoundingClientRect().width,
//        pre_height = img_ele.getBoundingClientRect().height;
//      img_ele.style.width = (pre_width * zoomincrement) + 'px';
//      img_ele.style.height = (pre_height * zoomincrement) + 'px';
//      img_ele = null;
//    }
//    document.getElementById('zoomout').addEventListener('click', function() {
//      zoom(0.5);
//    });
//    document.getElementById('zoomin').addEventListener('click', function() {
//      zoom(1.5);
//    });
//  }());
  (function() {
    function start_drag(event) {
      var x_cursor = hasTouch() ? event.changedTouches[0].clientX : event.clientX,
        y_cursor = hasTouch() ? event.changedTouches[0].clientY : event.clientY;
      img_ele = this;
      x_img_ele = x_cursor - img_ele.offsetLeft;
      y_img_ele = y_cursor - img_ele.offsetTop;
      console.log("start drag");
    }

    function stop_drag() {
      img_ele = null;
      console.log("stop drag");
    }

    function while_drag(event) {
      var x_cursor = hasTouch() ? event.changedTouches[0].clientX : event.clientX,
        y_cursor = hasTouch() ? event.changedTouches[0].clientY : event.clientY;
      if (img_ele !== null) {
        img_ele.style.left = (x_cursor - x_img_ele) + 'px';
        img_ele.style.top = (y_cursor - y_img_ele) + 'px';
        console.log('dragging > img_left:' + img_ele.style.left + ' | img_top: ' + img_ele.style.top);
      }
    }
    document.getElementById('drag-img').addEventListener(event_start, start_drag);
    document.getElementById('containerThing').addEventListener(event_move, while_drag);
    document.getElementById('containerThing').addEventListener(event_end, stop_drag);
  }());
}());
