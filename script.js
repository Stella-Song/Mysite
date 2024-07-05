//variables
const numBalls = 100;
const speed = .25;
const gravity = .2;
const friction = 1;
// const speed = 1;
// const gravity = .5;
// const friction = .75;
const ctx = document.querySelector('.canvas');

let ballSize = {
	min : null,
	max : null
}

let windowSize = {
	w : window.innerWidth,
	h : window.innerHeight
}

let mouse = {
	x : windowSize.w / 2,
	y : windowSize.h / 2
}

let colors = ['#ff2e4c', '#2e99b0', '#3a0088'];


//events
window.addEventListener('mousemove', function(e) {
	mouse.x = e.clientX,
	mouse.y = e.clientY
});

window.addEventListener('resize', resizeDetect);


//utility functions
function resizeDetect () {
	windowSize.w = window.innerWidth;
	windowSize.h = window.innerHeight;
	ballSize.min = 30;
	ballSize.max = 80;
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, z, dx, dy, radius, color) {
	let el = document.createElement('div');
	this.x = x,
	this.y = y,
	this.z = z,
	this.dx = dx,
	this.dy = dy,
	this.radius = radius,
	this.color = color,
	this.update = function() {
		if (this.y + this.radius + this.dy > windowSize.h) {
			this.dy = -this.dy * friction;
		} else {
			this.dy += gravity; 
		}
		if (this.x + this.radius> windowSize.w || this.x <= 0) {
			this.dx = -this.dx;
		}
		
		this.x += this.dx;
		this.y += this.dy;
		el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
	},
	this.draw = function() {
		el.className = 'ball';
		ctx.appendChild(el); 
		el.style.width = radius + 'px';
		el.style.height = radius + 'px';
		el.style.backgroundColor = color;
		el.style.zIndex = z;
		el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
	}
}
//ball Object
var ball;
var ballArray = [];

var createEls = function(click){
	if (click) {
		makeBalls = 1;
	} else {
		// ballArray = [];
		makeBalls = numBalls;
	}
	for (let i = 0; i < makeBalls; i++) {
		var radius = randomIntFromRange(ballSize.min, ballSize.max);
		var color = randomColor(colors);
		var z = randomIntFromRange(1, numBalls);
		if (click) {
			var x = mouse.x - radius;
			var y = mouse.y - radius;
		} else {
			var x = randomIntFromRange(0, windowSize.w - radius);
			var y = randomIntFromRange(0, windowSize.h - radius);
		}
		let dx = randomIntFromRange(-speed, speed);
		let dy = randomIntFromRange(-speed, speed);
		// var dx = speed;
		// var dy = speed;
		ballArray.push(new Ball(x, y, z, dx, dy, radius, color));
		ballArray[i].draw();
	}
}

function animate() {
	// requestAnimationFrame(animate);
	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	} 
}

// window.addEventListener('click', function(){
// 	createEls(true);
// }, false);

setInterval(function(){
	requestAnimationFrame(animate);
}, 10);

resizeDetect();
createEls(false);

// console.log(ballArray);