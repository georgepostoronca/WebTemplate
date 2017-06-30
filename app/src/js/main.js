// Disable Scroll
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function index() {
    alert("Index");
}

/*
███    ██  ██████  ████████ ██ ███████ ██    ██
████   ██ ██    ██    ██    ██ ██       ██  ██
██ ██  ██ ██    ██    ██    ██ █████     ████
██  ██ ██ ██    ██    ██    ██ ██         ██
██   ████  ██████     ██    ██ ██         ██
*/

function createNotify(data) {
    var template = '<div class="notify">'+
    '  <div class="notify__close">✖</div>'+
    '	<span class="notify__title">'+
    '		'+ data +
    '	</span>'+
    '</div>';

    $("body").append(template);

}

function Notify() {

    this.info = function(data) {
        type = typeof data;
        if( type == "object") {
            // console.log(data);
            // document.write(JSON.stringify(data));
            // console.log("object");
            // console.log(JSON.stringify(data));
            createNotify(JSON.stringify(data, undefined, 4));
        } else {
            // console.log(data);
            // document.write(data);
            // console.log("Data");
            createNotify(data);
        }
    };

}
var  log = new Notify();

log.info({
    a: "a",
    b: "b",
    c: "c",
});

log.info(["awdwad", "awdwad", "213"]);

