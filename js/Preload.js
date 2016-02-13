var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.image('sky', 'assets/bg.png');
    this.game.load.image('ground', 'assets/bg_castle.png');
    this.game.load.image('hospital', 'assets/hospital6.png');
    this.game.load.spritesheet('dude', 'assets/doomfaces2.png', 52, 65);
    this.game.load.spritesheet('treat', 'assets/treat.png', 190, 45);
    this.game.load.spritesheet('logo-tiles', 'assets/logo-tiles.png', 17, 16);
    this.game.load.image('track_north', 'assets/track_north.png');
    this.game.load.image('track_west', 'assets/track_west.png');
    this.game.load.image('track_x', 'assets/track_x.png');
    this.game.load.image('track_empty', 'assets/track_empty.png');
    this.game.load.image('grass', 'assets/grass.png');
    this.game.load.image('track_station_top', 'assets/track_station_top.png');
    this.game.load.image('track_station_bot', 'assets/track_station_bot.png');
  },
  create: function() {
    this.state.start('Logo');
  }
};
