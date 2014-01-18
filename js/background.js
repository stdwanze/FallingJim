
FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.Background = (function() {
			
			function background (imagename, imagerepo)
			{
				this.imagename = imagename;
				this.speed = FallingJim.GameInstance.Config.BackgroundSpeed;
				this.x = 0;
				this.y = 0;
				this.soundrun = false;
				
			}
			
			background.prototype = {
				
				tick : function ()
				{
					if(this.soundrun == false)
					{
						FallingJim.GameInstance.SoundManager.play(FallingJim.Sounds.Background.name);
						this.soundrun = true;
					}
					this.y -= this.speed;
				},
				render : function (canvas,ctxt)
				{
					 
				    ctxt.drawImage(this.getBackgroundImage(), this.x, this.y);
				 
				    // Draw another image at the top edge of the first image
				    ctxt.drawImage(this.getBackgroundImage(), this.x, this.y + canvas.height);
				 
				    // If the image scrolled off the screen, reset
				    if (this.y % canvas.height == 0)
				      this.y = 0;
				    
				},
				getBackgroundImage : function ()
				{
					return FallingJim.GameInstance.ImageRepo.getImage(this.imagename);
				}
			};
		
			return background;
		}());
}(window.FallingJim || {}));
/*
 * 
 *  this.draw = function() {
    // Pan background
    this.y += this.speed;
    this.context.drawImage(imageRepository.background, this.x, this.y);
 
    // Draw another image at the top edge of the first image
    this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
 
    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = 0;
  };
 */