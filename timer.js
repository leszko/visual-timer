function Timer(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.refreshSize();
}

Timer.prototype.refreshSize = function() {
	this.radius = this.halfSize(canvas) * 0.8;
}

Timer.prototype.start = function(periodInSeconds) {
	this.period = periodInSeconds;
	this.startTime = this.now();
	this.colorProvider = new ColorProvider();

	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	window.requestAnimationFrame(this.drawTimer.bind(this));
}

Timer.prototype.drawTimer = function() {							
	var elapsedTime = this.now() - this.startTime;
	var progress = elapsedTime / this.period;


	this.drawProgress(progress);

	if (!this.finished(progress)) {
		window.requestAnimationFrame(this.drawTimer.bind(this));
	}
}

Timer.prototype.drawProgress = function(progress) {
	this.drawProgressCircle(progress);
	this.drawMiddleCircle();
}

Timer.prototype.drawProgressCircle = function(progress) {
	function toAngle(progress) {
		return (2 * progress - 0.5) * Math.PI;
	}

	this.drawCircle(toAngle(progress), this.radius, this.colorProvider.colorFor(progress));
}

Timer.prototype.drawMiddleCircle = function(color) {
	this.drawCircle(2 * Math.PI, 0.85 * this.radius, this.colorProvider.background());
}

Timer.prototype.drawCircle = function(angle, radius, color) {
	var halfSize = this.halfSize(this.canvas);
	this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

	this.context.lineWidth = 1;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
    this.context.moveTo(0,0);
	this.context.arc(0, 0, radius, -0.5 * Math.PI, angle);
	this.context.stroke();
	this.context.fill();
	this.context.closePath();

	this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);
}

Timer.prototype.finished = function(progress) {
	return progress > 1 && this.colorProvider.recentColor.equals(this.FULL);
}

Timer.prototype.now = function() {
	return (new Date().getTime()) / 1000;
}

Timer.prototype.halfSize = function(canvas) {
	return Math.min(canvas.height, canvas.width) / 2;
}

function ColorProvider() {
	this.BLACKGROUND = "#101046";
	this.ZERO = "#FFFFFF";
	this.HALF = "#66CCCC";
	this.FULL = "#3399CC";

	this.recentProgress = 0;
	this.recentColor = new RgbColor(this.ZERO);
}

ColorProvider.prototype.background = function() {
	return this.BLACKGROUND;
}

ColorProvider.prototype.baseColorFor = function(progress) {
	if (progress < 0.5) {
		return new RgbColor(this.ZERO);
	}
	if (progress < 0.8) {
		return new RgbColor(this.HALF);
	}
	return new RgbColor(this.FULL);
}

ColorProvider.prototype.gradientTowards = function(color, progress) {
	if (this.recentColor.equals(color)) {
		return this.recentColor;
	}
	if (progress - this.recentProgress < 0.0001) {
		return this.recentColor;
	}

	this.recentColor = this.recentColor.gradientTowards(color);
	this.recentProgress = progress;

	return this.recentColor;
}

ColorProvider.prototype.toColor = function(progress) {
	var baseColor = this.baseColorFor(progress);
	return this.gradientTowards(baseColor, progress);
}

ColorProvider.prototype.colorFor = function(progress) {
	return this.toColor(progress).toString();
}