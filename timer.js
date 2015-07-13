function Timer(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.refreshSize();
}

Timer.prototype.refreshSize = function() {
	var halfSize = canvas.height / 2;
	this.radius = halfSize * 0.9;
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
	this.drawCircle(progress, this.colorProvider.colorFor(progress));
}

Timer.prototype.drawCircle = function(progress, color) {
	function toAngle(progress) {
		return (2 * progress - 0.5) * Math.PI;
	}

	var halfSize = this.canvas.height / 2;
	this.context.translate(halfSize, halfSize);

	this.context.lineWidth = 1;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
    this.context.moveTo(0,0);
	this.context.arc(0, 0, this.radius, -0.5 * Math.PI, toAngle(progress));
	this.context.stroke();
	this.context.fill();
	this.context.closePath();

	this.context.translate(-halfSize, -halfSize);
}

Timer.prototype.finished = function(progress) {
	return progress > 1 && this.colorProvider.recentColor.equals(this.RED);
}

Timer.prototype.now = function() {
	return (new Date().getTime()) / 1000;
}

function ColorProvider() {
	this.BLUE = "#226666";
	this.WHITE = "#ffffff";
	this.ORANGE = "#f05b47";
	this.RED = "#ed1c24";

	this.recentProgress = 0;
	this.recentColor = new RgbColor(this.WHITE);
}

ColorProvider.prototype.baseColorFor = function(progress) {
	if (progress < 0.5) {
		return new RgbColor(this.WHITE);
	}
	if (progress < 0.8) {
		return new RgbColor(this.ORANGE);
	}
	return new RgbColor(this.RED);
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