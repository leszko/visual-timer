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

RgbColor.prototype.gradientFrom = function(rgbColor) {
	var result = this.clone();

	if (result.red < rgbColor.red) {
		result.red = result.red + 1;
	} else if (result.red > rgbColor.red) {
		result.red = result.red - 1;
	}

	if (result.green < rgbColor.green) {
		result.green = result.green + 1;
	} else if (result.green > rgbColor.green) {
		result.green = result.green - 1;
	}

	if (result.blue < rgbColor.blue) {
		result.blue = result.blue + 1;
	} else if (result.blue > rgbColor.blue) {
		result.blue = result.blue - 1;
	}
	
	return result;
}

RgbColor.prototype.equals = function(rgbColor) {
	return this.red == rgbColor && this.green == rgbColor.green && this.blue == rgb.blue;
}

RgbColor.prototype.clone = function() {
	return new RgbColor(this.toString());
}