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
	
	Kit.Button = (function (){
		function button (sprite,clickhandler)
		{
			this.sprite = sprite;
			this.x = this.sprite.location.x;
			this.y = this.sprite.location.y;
			this.onclick = clickhandler;
		}
		button.prototype = {
			isHit : function (clientx,clienty)
			{
				if(this.x < clientx && this.x+this.sprite.getImage().width > clientx &&
					this.y < clienty && this.y+this.sprite.getImage().height > clienty)
				{
					return true;
				}
				else return false;
			},
			activate: function ()
			{
				this.onclick();
			},
			render: function (canvas, ctxt)
			{
				this.sprite.render(canvas,ctxt);
			},
			tick: function (){
				this.sprite.tick();
			}
			
		};
		
		return button;	
	}());
	return Kit;
}(window.Kit || {}));
