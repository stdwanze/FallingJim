FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Engine = (function() {

			function engine(canvas, ctxt) {

				this.canvas = canvas;
				this.ctxt = ctxt;
				this.shapes = [];
				this.eventObjects = [];
				this.name = new Date().toString();
				this.run = false;
				this.frame = 1;
				
				this.shapes.push(new FallingJim.Background("background"));
				//this.shapes.push(new Kit.Sprite(this.repo.getImage("playerRight"),50, 10));
				
				this.init();
				
				this.points = new Kit.TextArea(530,30,"Arial",16,"blue");
				this.points.setText("0 Pts");
				this.hudelements = [new Kit.Button(new Kit.Sprite(FallingJim.GameInstance.ImageRepo.getImage("hudleft"),5,300),function () { this.player.tryMoveLeft();}.bind(this)),
									new Kit.Button(new Kit.Sprite(FallingJim.GameInstance.ImageRepo.getImage("hudright"),550,300),function () { this.player.tryMoveRight();}.bind(this))];
				this.shapes.push(this.hudelements[0]);
				this.shapes.push(this.hudelements[1]);
				this.shapes.push(this.points);
				
			}


			engine.prototype = {
				init : function() {
					window.requestAnimFrame = (function(callback) {
						return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
						function(callback) {
							window.setTimeout(callback, 1000 / 30);
						};
					})();

					document.addEventListener("keydown", function (e){
							this.handleKeyInput(e);
						
					}.bind(this));
					this.canvas.addEventListener("click", function(e) {

						var hitXY = this.getXY(e);
						console.log('click: x:' + hitXY.x + '/y:' + hitXY.y);

						this.handleClickTouch(hitXY.x, hitXY.y);
					}.bind(this), false);

					this.canvas.addEventListener("touchstart", function(e) {
						var hitXY = this.getXY(e);
						console.log('click: x:' + hitXY.x + '/y:' + hitXY.y);
						this.handleClickTouch(hitXY.x, hitXY.y);
					}.bind(this), false);
					

				},
				registerChannels: function (channels)
				{
					
					this.channels = channels;
					channels.forEach(function(channel){
						this.shapes.push(channel);
					}.bind(this));
					this.player = new FallingJim.Player(this.channels);
					this.shapes.push(this.player);
				},
				handleClickTouch : function(x,y)
				{
					this.hudelements.forEach(function(element){
						element.isHit(x,y) ? element.activate(): null;	
					});
				},
				handleKeyInput: function (event)
				{
			
					switch(event.keyCode)
					{
						case 39 : this.player.tryMoveRight(); break;
						case 37 : this.player.tryMoveLeft(); break;			
					}
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
					this.clear(); 
					//draw
					this.shapes.forEach( function(shape) {
						shape.render(this.canvas, this.ctxt);
					}.bind(this));

					this.eventObjects.forEach( function(shape) {
						shape.render(this.canvas, this.ctxt);

					}.bind(this));
					this.eventObjects = [];

					var self = this;
					// register next
					if (this.run) {
						requestAnimFrame( function() {
							self.tickndraw(frame + 1);
						});
					}
				},
				clear : function ()
				{
					this.ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
				},
				setPoints : function (pointsText)
				{
					this.points.setText(pointsText);
					this.points.size = 16;
					this.countDown = 5;
					this.points.transition = this.getPointsSizeTransition(1,this.getPointsSizeTransition(-1,null));
				},
				getPointsSizeTransition : function (modDirection, reverser)
				{
					return new Kit.Transition(function (mod) { this.size += modDirection * mod; }.bind(this.points), 2, 	function() {
									
									if(this.countDown === 0)
									{
										this.countDown = 5;
										this.points.transition = reverser;
										return true;
									}
									else {
										this.countDown -= 1;
									}
									return false;
									
							}.bind(this));
				}
				
			};
			return engine;

		})();

	}(window.FallingJim || {}));
