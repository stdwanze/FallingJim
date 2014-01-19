FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Player = ( function() {

				var Direction = {
					LEFT : "left",
					RIGHT : "right"
				};

				function player(channels) {
					this.channels = channels;
					this.positions = [];
					channels.forEach( function(channel) {
						this.positions.push(new Kit.Point(channel.x, 10));
					}.bind(this));

					this.x = this.positions[0].x;
					this.y = this.positions[0].y;
					this.currPos = 0;

					this.dir = Direction.RIGHT;

					this.movementspeed = FallingJim.GameInstance.Config.PlayerMovementSpeed;
					this.positiontransition = null;
				
					this.initSprites();
				}


				player.prototype = {

					render : function(canvas, ctxt) {
						var sprite = this.getSprite();
						sprite.render(canvas, ctxt);
					},
					tick : function() {
						this.right.tick(this.x,this.y);
						this.left.tick(this.x,this.y);
						
						if (this.positiontransition != null) {
							this.positiontransition.tick();
							if (this.positiontransition.end()) {
								this.positiontransition = null;
							}
						}
						this.channels.forEach(function (channel){
							channel.collide(this.x,this.y,this.getSprite().width,this.getSprite().height);
						}.bind(this));
					},
					initSprites : function ()
					{
						this.right =  new Kit.Sprite( FallingJim.GameInstance.ImageRepo.getImage("playerLeft"), this.x, this.y);
						this.left =  new Kit.Sprite(FallingJim.GameInstance.ImageRepo.getImage("playerRight"), this.x, this.y);
						
					},
					getSprite : function() {
						switch(this.dir) {
							case Direction.LEFT:
								return this.right;
							default:
								return this.left;
						}
					},

					tryMoveRight : function() {
						if (this.currPos < this.positions.length && this.positiontransition === null) {
							this.dir = Direction.RIGHT;
							if (!this.channels[this.currPos + 1].isBlocked()) {
								this.positiontransition = new Kit.Transition( function(offset) {
									this.x = this.x + offset;
								}.bind(this),
								this.movementspeed, 
								function() {
									return (this.x >= this.position().x);
								}.bind(this));
								this.currPos = this.currPos + 1;
							}
						}

					},
					tryMoveLeft : function() {
						if (this.currPos > 0 && this.positiontransition === null) {
							this.dir = Direction.LEFT;
							if (!this.channels[this.currPos - 1].isBlocked()) {

								this.positiontransition = new Kit.Transition( function(offset) {
									this.x = this.x - offset;
								}.bind(this),
								this.movementspeed, 
								function() {
									return (this.x <= this.position().x);
								}.bind(this));
								this.currPos = this.currPos - 1;
							}
						}
					},
					position : function() {
						return this.positions[this.currPos];
					}
				};

				return player;
			}());
	}(window.FallingJim || {}));
