// This is one of Keith's ece530 projects
// Two IR detectors are mounted on a servo motor.
// The motor is controlled via pins P9 11, 13, 15 and 17

var b = require('bonescript');

var controller = ["P9_11", "P9_13", "P9_15", "P9_16"];
var state = [b.LOW, b.HIGH, b.HIGH, b.LOW];
var steps = 20;  // 20 steps is one turn
var rotateDelay = 50;
var CW  = 0;
var CCW = 1;

var PT = ["P9_33", "P9_35"];
var i;

// Initialize motor control pins to be OUTPUTs
for(i=0; i<controller.length; i++) {
    b.pinMode(controller[i], b.OUTPUT);
}
// Put the motor into a know state
updateState(controller, state, steps, rotateDelay);

rotate(CCW, steps);

function updateState() {
	for (i = 0; i < controller.length; i++) {
		b.digitalWrite(controller[i], state[i]);
	}
}

function rotate(direction, count) {
	console.log("CWrotate, count=%d", count);
	count--;
	if (direction === 0) {
		state = [state[1], state[2], state[3], state[0]];
	}
	else {
		state = [state[3], state[0], state[1], state[2]];
	}
	updateState();
	if (count > 0) {
		setTimeout(function() {
			rotate(direction, count);
		}, rotateDelay);
	}
}

function readPT() {
	var i;
	for (i = 0; i < PT.length; i++) {
		console.log("%s: %d", PT[i], b.analogRead(PT[i]));
	}
}



