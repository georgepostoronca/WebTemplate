function swipeDetect(el, fn) {
	var touchstartX = 0;
	var touchstartY = 0;
	var touchendX = 0;
	var touchendY = 0;

	var gestureZone = document.querySelector(el);

	gestureZone.addEventListener('touchstart', function(event) {
		touchstartX = event.changedTouches[0].screenX;
		touchstartY = event.changedTouches[0].screenY;
	}, false);

	gestureZone.addEventListener('touchend', function(event) {
		touchendX = event.changedTouches[0].screenX;
		touchendY = event.changedTouches[0].screenY;
		handleGesture();
	}, false);

	function handleGesture() {
		if (touchendX <= touchstartX) {
			// console.log('Swiped left');
			fn("left");
		}

		if (touchendX >= touchstartX) {
			// console.log('Swiped right');
			fn("right");
		}

		if (touchendY <= touchstartY) {
			// console.log('Swiped up');
      fn("up");
		}

		if (touchendY >= touchstartY) {
			// console.log('Swiped down');
      fn("down");
		}

		if (touchendY === touchstartY) {
			// console.log('Tap');
      fn("tap");
		}
	}
}

swipeDetect(".nav", function(dir) {
	console.log(dir);
});
