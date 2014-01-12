FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Game = (function() {
			var State = {
				RUN : "run",
				END : "end"
			};
			
			function game (vm)
			{
				this.vm = vm;
				this.canvas = this.vm.canvas;
				this.init();
				this.setState(State.END);
			
			}
			game.prototype = {
				
				init: function ()
				{
					this.repo = new FallingJim.ImageRepo();
					this.engine = new FallingJim.Engine(this.canvas, this.canvas.getContext("2d"),this.repo);
					
					this.channels = this.generateChannels();
					this.engine.registerChannels(this.channels);
					
					
				},
				generateChannels : function ()
				{
					var height = this.canvas.height;
					var positions = [ 140, 270, 400 ];
					
					var channels = [];
					for(var i = 0; i < positions.length; i++)
					{
						channels.push(new FallingJim.Channel(positions[i], height, this.repo));
						channels[i].createNewObj = function (x,height) {
							
							var type = FallingJim.CoinType.getByIndex(Kit.Helper.getRandomNumber(5));
							return new FallingJim.Coin(type,x, height, 1, this.repo);
						}.bind(this);
					};
					
					return channels;
				},
				run : function() {
					this.setState(State.RUN);
					this.engine.clear();
					this.engine.start();
				},
				setState : function (state) {
					this.state = state;
				},
				stop : function() {
					this.engine.stop();
					this.setState(State.END);
				},
			};
		
			return game;
		}());
}(window.FallingJim || {}));