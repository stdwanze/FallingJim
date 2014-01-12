FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Channel = (function() {
			
			function channel (x,height,imagerepo)
			{
				this.x = x;
				this.height = height;
				this.repo = imagerepo;
			
				this.objects = [];
				
				/// test
				this.frame = 0;
				this.dropout = 0;
			}
			channel.prototype = {
				createNewObj: function (x,height)
				{
					return null;
				},
				render: function (canvas,ctxt)
				{
					this.objects.forEach(function(item){
						if(item !== null) item.render(canvas,ctxt);
					}.bind(this));
				},
				tick: function ()
				{
					this.frame += 1;
					var remainingObjects = [];
					this.objects.forEach(function(item){
						item.tick();
						if(!item.isOut())
						{
							remainingObjects.push(item);
						}
					}.bind(this));
					this.objects = remainingObjects;
					
					//test
					if(this.frame % 70 === 0 && this.dropout-- === 0)
					{
						var obj = this.createNewObj(this.x,this.height);
						if(obj.length !== undefined)
						{
							obj.forEach(function (item){
								this.objects.push(item);
							}.bind(this));
							
							this.dropout = 3;
						}
						else {
							this.dropout = 0;
							this.objects.push(obj);
						}
					}
				}
			};
		
			return channel;
		}());
		

		FallingJim.ChannelObj = (function() {
			
			function channelobj (image,x,y,speed)
			{
				this.image = image;
				this.x = x;
				this.y = y;
				this.speed = speed;
			
				
			}
			channelobj.prototype = {
			
				render: function (canvas,ctxt)
				{
					var sprite = this.getSprite();
					sprite.render(canvas,ctxt);
				},
				getSprite: function ()
				{
					return new Kit.Sprite(this.image,this.x,this.y);
				},
				tick: function ()
				{
					this.y -= this.speed;
				},
				isOut: function ()
				{
					if(this.y <= -100)
					{
						return true;
					}
					else return false;
				}
				
			};
		
			return channelobj;
		}());
}(window.FallingJim || {}));