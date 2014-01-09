FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Engine = (function() {

			function engine(canvas, ctxt) {

				this.canvas = canvas;
				this.ctxt = ctxt;
				
				this.shapes = [];
				this.eventObjects = [];
				
				this.run = false;
				this.frame = 1;
				
				this.init();
			}


			engine.prototype = {
				init : function() {
					window.requestAnimFrame = (function(callback) {
						return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
						function(callback) {
							window.setTimeout(callback, 1000 / 60);
						};
					})();

					/*this.canvas.addEventListener("click", function(e) {

						var hitXY = this.getXY(e);
						console.log('click: x:' + hitXY.x + '/y:' + hitXY.y);

						this.handleClickTouch(hitXY.x, hitXY.y, isShapeToRemoveCallBack);
					}.bind(this), false);

					this.canvas.addEventListener("touchstart", function(e) {
						var hitXY = this.getXY(e);
						console.log('click: x:' + hitXY.x + '/y:' + hitXY.y);
						this.handleClickTouch(hitXY.x, hitXY.y, isShapeToRemoveCallBack);
					}.bind(this), false);
					*/

				},
				getXY : function (event)
				{
					return new Kit.Point(event.layerX, event.layerY);
				},
				start : function() {
					this.run = true;
					this.tickndraw(this.frame);
				},
				stop : function() {
					this.run = false;
				},
				tickndraw : function(frame) {
					//  console.log("tickndraw fartherFrame"+ frame +" - " +(frame+1));
					if (this.frame == frame + 1)
						console.log("!!!!");
					else
						this.frame = frame + 1;
					//update
					this.shapes.forEach( function(shape) {
						shape.tick(this.canvas, this.ctxt);
					}.bind(this));
					//clear
					this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);

					//draw
					this.shapes.forEach( function(shape) {
						shape.render(this.canvas, this.ctxt);
					}.bind(this));

					this.eventObjects.forEach( function(shape) {
						shape.render(this.canvas, this.ctxt);

					}.bind(this));
					this.eventObjects = [];

					// register next
					if (this.run) {
						requestAnimFrame( function() {
							this.tickndraw(frame + 1);
						}.bind(this));
					}
				}
				
			};
			return engine;

		})();

	}(window.FallingJim || {}));
