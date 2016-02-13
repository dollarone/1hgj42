var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    this.score = 0;
    this.scoreText;


    // The player and its settings
    this.playerGroup = this.game.add.group();

    this.tiles = new Array(3);
    this.tilesGroup = this.game.add.group();
    
    for (var i = 0; i < 3; i++) {
        this.tiles[i] = new Array(3);
    }
    this.startGridX = 180;
    this.startGridY = 130;

    this.tiles[0][0] = this.tilesGroup.create(this.startGridX, this.startGridY, 'track_station_top');
    this.tiles[0][0].gridX = 0;
    this.tiles[0][0].gridY = 0;
    this.tiles[0][0].gridEmpty = false;
    this.tiles[0][0].gridType = 'track_station_top';

    this.tiles[1][0] = this.tilesGroup.create(this.startGridX + 32 + 1, this.startGridY, 'grass');
    this.tiles[1][0].gridX = 1;
    this.tiles[1][0].gridY = 0;
    this.tiles[1][0].gridEmpty = false;
    this.tiles[1][0].gridType = 'grass';

    this.tiles[2][0] = this.tilesGroup.create(this.startGridX + 32*2 + 1*2, this.startGridY, 'track_station_top');
    this.tiles[2][0].gridX = 2;
    this.tiles[2][0].gridY = 0;
    this.tiles[2][0].gridEmpty = false;
    this.tiles[2][0].gridType = 'track_station_top';

    this.tiles[0][1] = this.tilesGroup.create(this.startGridX, this.startGridY + 32 + 1, 'grass');
    this.tiles[0][1].gridX = 0;
    this.tiles[0][1].gridY = 1;
    this.tiles[0][1].gridEmpty = false;
    this.tiles[0][1].gridType = 'grass';

    this.tiles[1][1] = this.tilesGroup.create(this.startGridX + 32 + 1, this.startGridY + 32 + 1, 'track_empty');
    this.tiles[1][1].gridX = 1;
    this.tiles[1][1].gridY = 1;
    this.tiles[1][1].gridEmpty = true;
    this.tiles[1][1].gridType = 'track_empty';

    this.tiles[2][1] = this.tilesGroup.create(this.startGridX + 32*2 + 1*2, this.startGridY + 32 + 1, 'track_west');
    this.tiles[2][1].gridX = 2;
    this.tiles[2][1].gridY = 1;
    this.tiles[2][1].gridEmpty = false;
    this.tiles[2][1].gridType = 'track_west';

    this.tiles[0][2] = this.tilesGroup.create(this.startGridX, this.startGridY + 32*2 + 1*2, 'track_north');
    this.tiles[0][2].gridX = 0;
    this.tiles[0][2].gridY = 2;
    this.tiles[0][2].gridEmpty = false;
    this.tiles[0][2].gridType = 'track_north';


    this.tiles[1][2] = this.tilesGroup.create(this.startGridX + 32 + 1, this.startGridY + 32*2 + 1*2, 'track_station_bot');
    this.tiles[1][2].gridX = 1;
    this.tiles[1][2].gridY = 2;
    this.tiles[1][2].gridEmpty = false;
    this.tiles[1][2].gridType = 'track_station_bot';


    this.tiles[2][2] = this.tilesGroup.create(this.startGridX + 32*2 + 1*2, this.startGridY + 32*2 + 1*2, 'track_station_bot');
    this.tiles[2][2].gridX = 2;
    this.tiles[2][2].gridY = 2;
    this.tiles[2][2].gridEmpty = false;
    this.tiles[2][2].gridType = 'track_station_bot';

    this.gridSizeX = 3;
    this.gridSizeY = 3;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            this.tiles[i][j].inputEnabled = true;
            this.tiles[i][j].events.onInputDown.add(this.actionOnClick, this);
        }
    }

    
    this.timer = 0;

    //  The score
    this.scoreText = this.game.add.text(80, 16, '    Sort out the tracks\n before the trains leave!', { fontSize: '32px', fill: '#f00' });
    this.score = 0;

    this.noone = {};
    this.selected = this.noone;
  },

  actionOnClick: function (sprite, pointer) {
    console.log("you clicked on " + sprite.gridX + "/"  + sprite.gridY);
    var clickedX = sprite.gridX;
    var clickedY = sprite.gridY;
    if (sprite.gridEmpty) {
        // do nothing
        // play DOH
    }
    else {
        if (clickedX > 0) {
            if (this.tiles[clickedX - 1][clickedY].gridEmpty) {
                // swap
                this.tiles[clickedX][clickedY].gridX--;
                this.tiles[clickedX][clickedY].x -= 33;
                this.tiles[clickedX - 1][clickedY].gridX++;
                this.tiles[clickedX - 1][clickedY].x += 33;

                var tmp = this.tiles[clickedX - 1][clickedY];
                this.tiles[clickedX - 1][clickedY] = this.tiles[clickedX][clickedY];
                this.tiles[clickedX][clickedY] = tmp;

                this.checkWin();
                return true;

            }
        }
        if (clickedX < this.gridSizeX - 1) {
            if (this.tiles[clickedX + 1][clickedY].gridEmpty) {
                // swap
                this.tiles[clickedX][clickedY].gridX++;
                this.tiles[clickedX][clickedY].x += 33;
                this.tiles[clickedX + 1][clickedY].gridX--;
                this.tiles[clickedX + 1][clickedY].x -= 33;

                var tmp = this.tiles[clickedX + 1][clickedY];
                this.tiles[clickedX + 1][clickedY] = this.tiles[clickedX][clickedY];
                this.tiles[clickedX][clickedY] = tmp;
                
                this.checkWin();
                return true;
            }   
        }
        if (clickedY > 0) {
            if (this.tiles[clickedX][clickedY - 1].gridEmpty) {
                // swap
                this.tiles[clickedX][clickedY].gridY--;
                this.tiles[clickedX][clickedY].y -= 33;
                this.tiles[clickedX][clickedY - 1].gridY++;
                this.tiles[clickedX][clickedY - 1].y += 33;

                var tmp = this.tiles[clickedX][clickedY - 1];
                this.tiles[clickedX][clickedY - 1] = this.tiles[clickedX][clickedY];
                this.tiles[clickedX][clickedY] = tmp;
                
                this.checkWin();
                return true;

            }
        }
        if (clickedY < this.gridSizeY - 1) {
            if (this.tiles[clickedX][clickedY + 1].gridEmpty) {
                // swap
                this.tiles[clickedX][clickedY].gridY++;
                this.tiles[clickedX][clickedY].y += 33;
                this.tiles[clickedX][clickedY + 1].gridY--;
                this.tiles[clickedX][clickedY + 1].y -= 33;

                var tmp = this.tiles[clickedX][clickedY + 1];
                this.tiles[clickedX][clickedY + 1] = this.tiles[clickedX][clickedY];
                this.tiles[clickedX][clickedY] = tmp;
                
                this.checkWin();
                return true;
            }   
        }
    }


  },
  checkWin: function() {
    var win = true;
    this.tilesGroup.forEach(function(tile) {
        if (tile.gridType == "track_station_top") {
            var testX = tile.gridX;
            var testY = tile.gridY;
            var finishedTrack = false;
            testY++;
            while (testY < this.gridSizeY && !finishedTrack) {
                
                if (this.tiles[testX][testY].gridType == "track_station_bot") {
                    finishedTrack = true;
                }
                else if (!(this.tiles[testX][testY].gridType == "track_north" || this.tiles[testX][testY].gridType == "track_x")) {
                    // fail
                    console.log(testY);
                    win = false;
                    testY = this.gridSizeY;
                }
                testY++;
            }
            if (!finishedTrack) {
                win = false;
            }
        }
    }, this);
    if (win) {
        this.scoreText.text = "            You win!";
        this.game.paused = true;
        return true;
    }
  
  },

  update: function() {
    this.timer++;

  },

};