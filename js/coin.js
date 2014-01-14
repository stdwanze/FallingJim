FallingJim = window.FallingJim || {};
( function(FallingJim) {"use strict";

		FallingJim.CoinType = {
			Gold : "goldcoin",
			Silver : "silvercoin",
			Bronze : "bronzecoin",
			Star : "star",

			getByIndex : function (index)
			{
				var i = 0;
				for (var m in this){
					if(!(typeof m === 'function'))
					{
						i++;
					}
					if(i >= index)
					{
						return this[m];
					}
				}
				return Gold;
			}
		};
		FallingJim.Coin = ( function() {

				function coin(cointype, x, y, speed, imagerepo) {
					this.image = imagerepo.getImage(cointype);
					this.repo = imagerepo;
					this.x = x;
					this.y = y;
					this.speed = speed;
					
					FallingJim.ChannelObj.call(this, this.image, x, y, speed);
					
				}
				coin.prototype = Object.create(FallingJim.ChannelObj.prototype);
				coin.prototype.constructor = coin;
				coin.prototype.init = function ()
				{
					this.colliderFunc = function () {
						this.out = true;
						
					};
				};

				return coin;
			}());
	}(window.FallingJim || {})); 