FallingJim = window.FallingJim || {}; ( function(FallingJim) {"use strict";

		FallingJim.GameInstance = {
			Logic : null,
			ImageRepo : null,
			SoundManager : null,
			Config : null
		};

		FallingJim.Configuration = {
			BackgroundSpeed : 1,
			FallingSpeed : 3,
			PlayerMovementSpeed : 4
		};

		FallingJim.Sounds = {
			ShortCoin : {
				name : "shortCoin",
				url : "sound/shortcoin.mp3"
			},
			LongCoin : {
				name : "longCoin",
				url : "sound/longcoin.mp3"
			},
			Star : {
				name : "star",
				url : "sound/star.mp3"
			},
			Death : {
				name : "death",
				url : "sound/death1.mp3"
			},
			Background : {
				name : "artblock",
				url : "sound/artblock.ogg"
			}
		};

		FallingJim.Game = ( function() {
				var State = {
					RUN : "run",
					END : "end"
				};

				function game(vm) {
					this.vm = vm;
					this.canvas = this.vm.canvas;
					this.init();
					this.setState(State.END);
					this.points = 0;
					FallingJim.GameInstance.Logic = this;
				}


				game.prototype = {

					init : function() {
						FallingJim.GameInstance.Config = FallingJim.Configuration;
						FallingJim.GameInstance.ImageRepo = new FallingJim.ImageRepo();
						this.sm = new Kit.SoundManager();

						FallingJim.GameInstance.SoundManager = this.sm;
						//SOUND
						FallingJim.GameInstance.SoundManager.registerSoundPool(10, FallingJim.Sounds.ShortCoin.name, FallingJim.Sounds.ShortCoin.url);
						FallingJim.GameInstance.SoundManager.registerSoundPool(10, FallingJim.Sounds.LongCoin.name, FallingJim.Sounds.LongCoin.url);
						FallingJim.GameInstance.SoundManager.registerSoundPool(10, FallingJim.Sounds.Star.name, FallingJim.Sounds.Star.url);
						FallingJim.GameInstance.SoundManager.registerSoundPool(1, FallingJim.Sounds.Death.name, FallingJim.Sounds.Death.url);
						FallingJim.GameInstance.SoundManager.registerSoundPool(1, FallingJim.Sounds.Background.name, FallingJim.Sounds.Background.url);

						this.osd = new Kit.OSDManager(this.canvas, this.canvas.getContext("2d"));

						this.levels = [];
						this.level = 0;
					},
					generateChannels : function() {
						var height = this.canvas.height;
						var positions = [140, 270, 400];
						this.levels = [new FallingJim.Level(positions, 20)];
						//

						var channels = [];
						for (var i = 0; i < positions.length; i++) {
							channels.push(new FallingJim.Channel(positions[i], height, this.repo));
							channels[i].createNewObj = this.levels[this.level].createNewObj();

						};

						return channels;
					},
					run : function() {
						this.sm.load().done( function() {
							this._run();
						}.bind(this));
					},
					_run : function() {
						// ENGINE
						this.points = 0;
						this.engine = new FallingJim.Engine(this.canvas, this.canvas.getContext("2d"));
						this.channels = this.generateChannels();
						this.engine.registerChannels(this.channels);

						this.setState(State.RUN);
						this.engine.clear();
						this.engine.start();
					},
					setState : function(state) {
						this.state = state;
					},
					stop : function() {
						this.engine.stop();
						this.setState(State.END);
					},
					dead : function() {

						this.stop();
						FallingJim.GameInstance.SoundManager.play(FallingJim.Sounds.Death.name);

						setTimeout( function() {
							this.osd.add(new Kit.Button(new Kit.Sprite(FallingJim.GameInstance.ImageRepo.getImage("restart"), 300, 200), this._run.bind(this)));
							this.osd.add(new Kit.TextArea(295, 270, "Arial", 16, "blue").setText("restart"));

							this.osd.render();
						}.bind(this), 200);

					},
					collideCoin : function(coin) {
						coin.out = true;

						var sound = FallingJim.Sounds.ShortCoin.name;
						switch(coin.type) {
							case FallingJim.CoinType.Gold :
								FallingJim.GameInstance.Logic.addPoints(10);
								sound = FallingJim.Sounds.ShortCoin.name;
								break;
							case FallingJim.CoinType.Silver :
								FallingJim.GameInstance.Logic.addPoints(5);
								sound = FallingJim.Sounds.LongCoin.name;
								break;
							case FallingJim.CoinType.Bronze :
								FallingJim.GameInstance.Logic.addPoints(2);
								sound = FallingJim.Sounds.LongCoin.name;
								break;
							case FallingJim.CoinType.Star :
								FallingJim.GameInstance.Logic.addPoints(15);
								sound = FallingJim.Sounds.Star.name;
								break;

						}
						FallingJim.GameInstance.SoundManager.play(sound);
					},
					addPoints : function(points) {
						this.points += points;
						this.engine.setPoints(this.points + " Pts");
					}
				};

				return game;
			}());

		FallingJim.Level = ( function() {

				function level(positions, height) {
					this.positions = positions;
					this.channels = { };
					this.fullblockedwait = height;
					this.processPostions();
				}


				level.prototype = {

					processPostions : function() {
						this.positions.forEach( function(pos) {
							this.channels["" + pos] = {
								blocked : false,
								countDown : 0,
								tick : function() {
									if (this.countDown == 0) {
										this.blocked = false;
									}
									else {this.countDown -= 1;}
									
								}
							};

						}.bind(this));
					},
					isBlockingAllowed : function() {

						var blockcount = 0;
						for (var key in this.channels) {
							blockcount += this.channels[key].blocked ? 1 : 0;
						}
						return (blockcount < 2);
					},
					setBlocked : function(x) {
						this.channels["" + x].blocked = true;
						this.channels["" + x].countDown = this.fullblockedwait;

					},
					createNewObj : function() {
						return function(x, height) {
							var deferred = $.Deferred();
							var channel = this.channels["" + x];
							channel.tick();
							

							Kit.Helper.getRandomNumber(9).then( function(rand) {
								console.log("rand gave "+rand + " for "+x);
								var obj = null;
								if (rand > 5) {
									//return null;
							//		console.log("->nothing");
								}
								else if (rand !== 5) {
									var type = FallingJim.CoinType.getByIndex(rand);
									obj = new FallingJim.Coin(type, x, height, FallingJim.GameInstance.Config.FallingSpeed);
							//		console.log("->coin");
								} else {
									if (this.isBlockingAllowed()) {
										this.setBlocked(x);
										obj = FallingJim.ObstacleFactory.createGrassObstacle(x, height, FallingJim.GameInstance.Config.FallingSpeed);
										console.log("->obstacle");
									}
									else {console.log("blocked->no obstacle");}
								}
								deferred.resolve(obj);
							}.bind(this));
							return deferred.promise();
						}.bind(this);
					}
				};
				return level
			}());

	}(window.FallingJim || {}));
