Kit = window.Kit || {};

(function (Kit) {
	"use strict";
	
	Kit.Point = ( function() {

		function point(x, y) {
			this.x = x;
			this.y = y;
		};
		return point;
	}());
	
	return Kit;
}(window.Kit || {}));
