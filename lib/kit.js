Kit = window.Kit || {};

(function (Kit) {
	"use strict";
	
	Kit.Helper =  {
		
		getRandomNumber : function(max) {
				var decisionbase = Math.random();
				return Math.round((decisionbase * 100000 )) % max;
		},
		
		
	};
	Kit.Point = ( function() {

		function point(x, y) {
			this.x = x;
			this.y = y;
		};
		return point;
	}());
	
	Kit.Transition = (function () {
	
		function transition (offsetRecieverFunc,transitionmodifier,endCheckFunc)
		{
			this.client = offsetRecieverFunc;
			this.speed = transitionmodifier;
			this.endCheckFunc = endCheckFunc;
			
		}
		transition.prototype = {
			tick : function ()
			{
				this.client(this.speed);
			},
			end: function ()
			{
				if(this.endCheckFunc())
				{ return true; }
				else return false;
			}
		};
		
		return transition;	
	}());
	
	Kit.Sprite = (function (){
		function sprite(image,x,y)
		{
			this.location = new Kit.Point(x,y);
			this.width = image.width;
			this.height = image.height;
			this.image = image;
		}
		sprite.prototype = {
			
			getImage: function ()
			{
				return this.image;
			},
			render : function (canvas, ctxt)
			{
			
				ctxt.drawImage(this.getImage(), this.location.x, this.location.y);
			},
			tick: function ()
			{}
			
			
		};
		
		return sprite;
	}());
	
	return Kit;
}(window.Kit || {}));
