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
				
				var middleOffset = y +FallingJim.GameInstance.ImageRepo.getImage(FallingJim.ObstacleType.GrassTop).height;
				var endOffset = middleOffset +FallingJim.GameInstance.ImageRepo.getImage(FallingJim.ObstacleType.GrassMiddle).height;
				
				var top = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassTop,x,y,speed);
				var middle = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassMiddle,x,middleOffset,speed);
				var end = new FallingJim.Obstacle(FallingJim.ObstacleType.GrassEnd,x,endOffset,speed);
				
				return [top,middle,end];
			}
		
		};
		FallingJim.Obstacle = (function() {
			
			
			function obstacle (obstacletype, x, y, speed) {
					this.image = FallingJim.GameInstance.ImageRepo.getImage(obstacletype);
					this.x = x;
					this.y = y;
					this.speed = speed;
					this.type = obstacletype;
					FallingJim.ChannelObj.call(this, this.image, x, y, speed);
					
					
			}
			obstacle.prototype = Object.create(FallingJim.ChannelObj.prototype);
			obstacle.prototype.constructor = obstacle;
			
			obstacle.prototype.init = function (){
				this.colliderFunc = function () {
						FallingJim.GameInstance.Logic.dead(this);
				};
						
			};	
			obstacle.prototype.tick = function (blocksetter){
				FallingJim.ChannelObj.prototype.tick.call(this);
				
				if(this.y > -60 && this.y < 90)
				{
					blocksetter(true);
				}
				if(this.type === FallingJim.ObstacleType.GrassEnd && this.y < -50) {
					blocksetter(false);
				}
			
			};
				
			return obstacle;
		}());
		return FallingJim;
}(window.FallingJim || {}));