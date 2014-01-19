Kit = window.Kit || {}; ( function(Kit) {"use strict";

		Kit.Helper = {

			getRandomNumber : function(max) {
				var deferred = $.Deferred();
				
				setTimeout(function (){
					var decisionbase = Math.random();
					var res = Math.round((decisionbase * 100000 )) % max;
					deferred.resolve(res);
				},2);
				
				return deferred ;
			},
			callForAllMemberaOf : function(object, method) {
				var returns = [];
				for (var member in object) {
					if (object[member][method] !== undefined) {
						returns.push(object[member][method]());
					}
				}
				return returns;
			}
		};
		Kit.Point = ( function() {

				function point(x, y) {
					this.x = x;
					this.y = y;
				};
				return point;
			}());

		Kit.Transition = ( function() {

				function transition(offsetRecieverFunc, transitionmodifier, endCheckFunc) {
					this.client = offsetRecieverFunc;
					this.speed = transitionmodifier;
					this.endCheckFunc = endCheckFunc;

				}


				transition.prototype = {
					tick : function() {
						this.client(this.speed);
					},
					end : function() {
						if (this.endCheckFunc()) {
							return true;
						} else
							return false;
					}
				};

				return transition;
			}());

		Kit.Sprite = ( function() {
				function sprite(image, x, y) {
					this.location = new Kit.Point(x, y);
					
					this.anistep = 0;
					this.imageArray = [];
					if(image.length !== undefined)
					{
						this.imageArray = image;
						this.image = image[this.anistep];
					}
					else{
						this.image = image;
					}
					this.width = this.image.width;
					this.height = this.image.height;
					
					this.anispeed = 5;
					this.frame = 0;
				}


				sprite.prototype = {

					getImage : function() {
						return this.image;
					},
					render : function(canvas, ctxt) {

						ctxt.drawImage(this.getImage(), this.location.x, this.location.y);
					},
					tick : function(x,y) {
						this.frame++;
						this.location =  new Kit.Point(x, y);
						if(this.imageArray.length > 0) {
							if(this.frame % this.anispeed === 0) this.anistep = (this.anistep +1) % this.imageArray.length;
							this.image = this.imageArray[this.anistep];
						}
					},
					
				};

				return sprite;
			}());
		Kit.TextArea = ( function() {

				function textArea(x, y, font, size, color) {
					this.size = size ? size : 16;
					this.color = color ? color : "black";
					this.content = "";
					this.font = font ? font : "bold Arial";
					this.location = new Kit.Point(x, y);
					this.transition = null;
				}


				textArea.prototype = {
					setText : function(text) {
						this.content = text;
						return this;
					},
					render : function(canvas, ctxt) {
						ctxt.fillStyle = this.color;
						ctxt.font = this.size + "pt " + this.font;
						//"bold 16px Arial";
						ctxt.fillText(this.content, this.location.x, this.location.y);
						//) ; // );
					},
					tick : function() {
						if (this.transition !== null) {
							this.transition.tick();
							this.transition.end();
						}
					},
					isHit: function (x,y)
					{
						return false;
					},
					activate : function () {
						return ;
					}
				};
				return textArea;
			}());
		Kit.Button = ( function() {
				function button(sprite, clickhandler) {
					this.sprite = sprite;
					this.x = this.sprite.location.x;
					this.y = this.sprite.location.y;
					this.onclick = clickhandler;
				}


				button.prototype = {
					isHit : function(clientx, clienty) {
						if (this.x < clientx && this.x + this.sprite.getImage().width > clientx && this.y < clienty && this.y + this.sprite.getImage().height > clienty) {
							return true;
						} else
							return false;
					},
					activate : function() {
						this.onclick();
					},
					render : function(canvas, ctxt) {
						this.sprite.render(canvas, ctxt);
					},
					tick : function() {
						this.sprite.tick();
					}
				};

				return button;
			}());
		Kit.OSDManager = (function() {

			function osd(canvas, ctxt) {
				this.canvas = canvas;
				this.ctxt = ctxt;
				this.objs = [];
				this.addClickHandler();
			}


			osd.prototype = {
				render : function() {
					this.objs.forEach( function(element) {
						element.render(this.canvas, this.ctxt);
					}.bind(this));
				},
				add : function(osdObj) {
					this.objs.push(osdObj);
				},
				getXY : function(event) {
					return new Kit.Point(event.layerX, event.layerY);
				},
				handleClick : function(e) {
					var hitXY = this.getXY(e);
					console.log('click: x:' + hitXY.x + '/y:' + hitXY.y);

					this.objs.forEach(function(element){
						element.isHit(hitXY.x,hitXY.y) ? element.activate(): null;	
					});
				},
				addClickHandler : function() {
					this.canvas.addEventListener("click", this.handleClick.bind(this), false);
					this.canvas.addEventListener("touchstart", this.handleClick.bind(this), false);
				},
				restore : function() {
					this.canvas.removeEventListener('click', this.handleClick, false);
				}
			};
			return osd;
		}());
		return Kit;
	}(window.Kit || {}));
