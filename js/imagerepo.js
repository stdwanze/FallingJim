FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.ImageRepo = (function() {
			
			function imagerepo ()
			{
				this.register("img/sky.png","background");
				this.register("img/player_left.png","playerLeft");
				this.register("img/player_right.png","playerRight");
				
			
			}
			imagerepo.prototype = {
				register : function (path,attrname)
				{
					this[attrname] = new Image();
					this[attrname].src = path;
				},
				getImage: function (name)
				{
					return this[name];
				}
			};
		
			return imagerepo;
		}());
}(window.FallingJim || {}));