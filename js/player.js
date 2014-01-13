FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Player = ( function() {

				var Direction = {
					LEFT : "left",
					RIGHT : "right"
				};

				function player(imagerepo, channels) {
					this.channels = channels;
					this.positions = [];
					channels.forEach( function(channel) {
						this.positions.push(new Kit.Point(channel.x, 10));
					}.bind(this));

					this.x = this.positions[0].x;
					this.y = this.positions[0].y;
					this.currPos = 0;

					this.repo = imagerepo;
					this.dir = Direction.RIGHT;

					this.movementspeed = 4;
					this.positiontransition = null;
				}


				player.prototype = {

					render : function(canvas, ctxt) {
						var sprite = this.getSprite();
						sprite.render(canvas, ctxt);
					},
					tick : function() {
						if (this.positiontransition != null) {
							this.positiontransition.tick();
							if (this.positiontransition.end()) {
								this.positiontransition = null;
							}
						}
					},
					getSprite : function() {
						var image = null;
						switch(this.dir) {
							case Direction.LEFT:
								image = this.repo.getImage("playerLeft");
								break;
							default:
								image = this.repo.getImage("playerRight");
						}

						return new Kit.Sprite(image, this.x, this.y);
					},

					tryMoveRight : function() {
						if (this.currPos < this.positions.length && this.positiontransition === null) {
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
