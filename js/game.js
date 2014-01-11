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
				this.engine = new FallingJim.Engine(this.canvas, this.canvas.getContext("2d"));
				this.setState(State.END);
			
			}
			game.prototype = {
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