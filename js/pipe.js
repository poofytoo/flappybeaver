var PIPE = {
  GAP: 100,
  VELOCITY: -2,
  WIDTH: 100
};

window.top.PIPE = PIPE;

var Pipe = function(pipe) {
  this.worldPosition = FLAPPYBEAVER.GAME_SIZE;
  this.pipeDiv = pipe;

  this.top = $("<div class='top'></div>");
  this.top.css({height: Math.round(Math.random()*300)});
  this.bottom = $("<div class='bottom'></div>");
  this.bottom.css({height: 500 - (this.top.height() + PIPE.GAP)});

  this.pipeDiv.append(this.top)
              .append(this.bottom);
}

Pipe.prototype.moveLeft = function() {
  this.worldPosition += PIPE.VELOCITY;
  this.pipeDiv.css({marginLeft: this.worldPosition});
}

Pipe.prototype.remove = function() {
  this.pipeDiv.remove();
}