function RgbColor(color) {

	function parseColor(color) {
		var m = color.match(/^#([0-9a-f]{6})$/i)[1];
	    if (m) {
	        return [
	            parseInt(m.substr(0,2),16),
	            parseInt(m.substr(2,2),16),
	            parseInt(m.substr(4,2),16)
	        ];
	    }
	}	

	var rgbArray = parseColor(color);

	this.red = rgbArray[0];
	this.green = rgbArray[1];
	this.blue = rgbArray[2];
}

RgbColor.prototype.toString = function() {

	function toHex(intValue) {
		var hexString = intValue.toString(16);
		hexStringOfTwoChars = ("0" + hexString).slice(-2);
		return hexStringOfTwoChars;
	}

	return "#" + toHex(this.red) + toHex(this.green) + toHex(this.blue); 
}

RgbColor.prototype.applyGradientFrom = function(rgbColor) {
	if (this.red < rgbColor.red) {
		this.red = this.red + 1;
	} else if (this.red > rgbColor.red) {
		this.red = this.red - 1;
	}

	if (this.green < rgbColor.green) {
		this.green = this.green + 1;
	} else if (this.green > rgbColor.green) {
		this.green = this.green - 1;
	}

	if (this.blue < rgbColor.blue) {
		this.blue = this.blue + 1;
	} else if (this.blue > rgbColor.blue) {
		this.blue = this.blue - 1;
	}
}