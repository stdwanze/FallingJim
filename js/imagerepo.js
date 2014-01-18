FallingJim = window.FallingJim || {};
( function(FallingJim) {"use strict";

		FallingJim.ImageRepo = ( function() {

				function imagerepo() {
					this.register("img/sky.png", "background");
					this.register("img/player_left.png", "playerLeft");
					this.register("img/player_right.png", "playerRight");
					this.register("img/coinBronze.png", "bronzecoin");
					this.register("img/coinSilver.png", "silvercoin");
					this.register("img/coinGold.png", "goldcoin");
					this.register("img/star.png", "star");
					this.register("img/grassTop.png", "grassTop");
					this.register("img/grassCenter.png", "grassCenter");
					this.register("img/grassEnd.png", "grassEnd");
					this.register("img/left_arrow.png", "hudleft");
					this.register("img/right_arrow.png", "hudright");
					this.register("img/restart.png","restart");
				}


				imagerepo.prototype = {
					register : function(path, attrname) {
						this[attrname] = new Image();
						this[attrname].src = path;
					},
					getImage : function(name) {
						return this[name];
					}
				};

				return imagerepo;
			}());
	}(window.FallingJim || {})); 