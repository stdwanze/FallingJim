FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.ObstacleType = {
			GrassTop : "grassTop",
			GrassMiddle : "grassCenter",
			GrassEnd : "grassEnd",
			
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
		FallingJim.ObstacleFactory = {
			
			createGrassObstacle : function (x,y,speed,imagerepo) {
				
				var middleOffset = y +imagerepo.getImage(FallingJim.ObstacleType.GrassTop).height;
				var endOffset = middleOffset +imagerepo.getImage(FallingJim.ObstacleType.GrassMiddle).height;
				
				var top = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassTop,x,y,speed,imagerepo);
				var middle = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassMiddle,x,middleOffset,speed,imagerepo);
				var end = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassEnd,x,endOffset,speed,imagerepo);
				
				return [top,middle,end];
			}
		
		};
		FallingJim.Obstacle = (function() {
			
			
			function obstacle (obstacletype, x, y, speed, imagerepo) {
					this.image = imagerepo.getImage(obstacletype);
					this.repo = imagerepo;
					this.x = x;
					this.y = y;
					this.speed = speed;

					FallingJim.ChannelObj.call(this, this.image, x, y, speed);
			}
			obstacle.prototype = Object.create(FallingJim.ChannelObj.prototype);
			obstacle.prototype.constructor = obstacle;
				
			
				
			return obstacle;
		}());
		return FallingJim;
}(window.FallingJim || {}));