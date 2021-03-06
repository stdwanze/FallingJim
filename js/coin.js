FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.CoinType = {
			Gold : "goldcoin",
			Silver : "silvercoin",
			Bronze : "bronzecoin",
			Star : "star",

			getByIndex : function(index) {
				var i = 0;
				for (var m in this) {
					if (!( typeof m === 'function')) {
						i++;
					}
					if (i >= index) {
						return this[m];
					}
				}
				return Gold;
			}
		};
		FallingJim.Coin = ( function() {

				function coin(cointype, x, y, speed) {
					this.type = cointype;
					this.image = FallingJim.GameInstance.ImageRepo.getImage(cointype);
					this.x = x;
					this.y = y;
					this.speed = speed;

					FallingJim.ChannelObj.call(this, this.image, x, y, speed);

				}


				coin.prototype = Object.create(FallingJim.ChannelObj.prototype);
				coin.prototype.constructor = coin;
				coin.prototype.init = function() {
						this.colliderFunc = function () {
							FallingJim.GameInstance.Logic.collideCoin(this);
						};
						
				};

				return coin;
			}());
	}(window.FallingJim || {}));
