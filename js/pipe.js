// Constants
var PIPE = {
  GAP: 200,
  VELOCITY: -1
};

window.top.PIPE = PIPE;

// Pipe class representing the pipes that the flappy has to fly through
var Pipe = function(pipe, idx) {
  this.worldPosition = FLAPPYBEAVER.GAME_SIZE;
  this.pipeDiv = pipe;
  this.idx = idx;

  // Create pipes randomly
  this.top = $("<div class='top'></div>");
  this.top.css({height: Math.round(Math.random()*300 + 50)});
  this.bottom = $("<div class='bottom'></div>");
  this.bottom.css({height: 500 - (this.top.height() + PIPE.GAP)});

  this.pipeDiv.append(this.top)
              .append(this.bottom);
}

// Moves the pipe left according to the velocity
Pipe.prototype.moveLeft = function() {
  this.worldPosition += PIPE.VELOCITY;
  this.pipeDiv.css({marginLeft: this.worldPosition});
}

// Remove the pipe from the view (when out of view)
Pipe.prototype.remove = function() {
  this.pipeDiv.remove();
}

// Returns true if the sprite at the given position has collided with this pipe
Pipe.prototype.collision = function(spritePosition, height, width) {
  if (spritePosition.left + width >= this.worldPosition &&
    spritePosition.left <= this.worldPosition + this.pipeDiv.width()) {
    return spritePosition.top <= this.top.height() || spritePosition.top + height >= this.top.height() + PIPE.GAP;
  }
  return false;
}

// Returns true if the sprite has completely passed this pipe
Pipe.prototype.passed = function(spritePosition, height, width) {
  return !this.collision(spritePosition, height, width) && spritePosition.left >= this.worldPosition + this.pipeDiv.width();
}