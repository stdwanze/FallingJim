FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Channel = ( function() {

				function channel(x, height) {
					this.x = x;
					this.height = height;

					this.objects = [];

					/// test
					this.frame = 0;
					this.dropout = 0;
					this.blocked = false;
				}


				channel.prototype = {
					collide : function(x, y, width, height) {
						this.objects.forEach(function(obj) {
							if (obj.collide(x, y, width, height)) {
								obj.activateColliderFunc();
							}
						});
					},
					isBlocked : function() {
						return this.blocked;
					},
					createNewObj : function(x, height) {
						return null;
					},
					render : function(canvas, ctxt) {
						this.objects.forEach( function(item) {
							if (item !== null)
								item.render(canvas, ctxt);
						}.bind(this));
					},
					tick : function() {
						this.frame += 1;
						var remainingObjects = [];
						this.objects.forEach( function(item) {
							item.tick( function(block) {
								this.blocked = block;
							//	this.blocked ? console.log("blocked channel " + this.x) : console.log("unblocked channel " + this.x);
							}.bind(this));
							if (!item.isOut()) {
								remainingObjects.push(item);
							}
						}.bind(this));
						this.objects = remainingObjects;

						//test
						if (this.frame % 22 === 0 && this.dropout-- === 0) {
							this.createNewObj(this.x, this.height).done( function(obj) {
								this.dropout = 0;
								if (obj !== null) {
									if (obj.length !== undefined) {
										obj.forEach( function(item) {
											item.init();
											this.objects.push(item);
										}.bind(this));

										this.dropout = 3;
									} else {
										obj.init();
										this.objects.push(obj);
									}
								}
							}.bind(this));

						}
					}
				};

				return channel;
			}());

		FallingJim.ChannelObj = ( function() {

				function channelobj(image, x, y, speed) {
					this.image = image;
					this.x = x;
					this.y = y;
					this.width = this.getSprite().width;
					this.height = this.getSprite().height;

					this.speed = speed;
					this.out = false;
					this.colliderFunc = null;
				}


				channelobj.prototype = {

					render : function(canvas, ctxt) {
						var sprite = this.getSprite();
						sprite.render(canvas, ctxt);
					},
					getSprite : function() {
						return new Kit.Sprite(this.image, this.x, this.y);
					},
					tick : function() {
						this.y -= this.speed;
					},
					isOut : function() {
						if (this.y <= -100 || this.out) {
							return true;
						} else
							return false;
					},
					collide : function(x, y, width, height) {

						if (this.x < x + width && this.x + this.width > x && this.y < y + height && this.y + this.height > y) {
							return true;
						} else {
							return false;
						}

					},
					activateColliderFunc : function() {
						if (this.colliderFunc !== null) {
							this.colliderFunc();
						}
					}
				};

				return channelobj;
			}());
	}(window.FallingJim || {}));
