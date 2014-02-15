// Constants
var FLAPPYBEAVER = {
  gravity: 0.05,
  flyVelocity: -2,
  initialVelocity: -1,
  gameSize: 500,
  fps: 24
};

var FlappyBeaver = function(spriteClass) {
  this.level = 1;
  this.sprite = $('.' + spriteClass); // Class name of the div for the birdy
  this.velocity = FLAPPYBEAVER.initialVelocity;
  this.gameloop;
};

// Smallest step the bird takes
// e.g. it falls
FlappyBeaver.prototype.nextStep = function() {
  var newPosition = Math.min(this.sprite.position().top + this.velocity,
                             FLAPPYBEAVER.gameSize - this.sprite.height());
  this.sprite.css({
    top: newPosition
  });
  this.velocity += FLAPPYBEAVER.gravity;

  // Check if the bird hit the ground yet and stop looping
  this.checkDead();
}

// Starts the game
FlappyBeaver.prototype.start = function() {
  var game = this;
  this.gameloop = setInterval(function() {
    game.nextStep();
  }, 1.0/FLAPPYBEAVER.fps);
}

// Called when the user clicks
// Basically just reverses the velocity so the bird flies for a bit
FlappyBeaver.prototype.fly = function() {
  this.velocity = FLAPPYBEAVER.flyVelocity;
}

// Returns true if the beaver hit the ground
// Stops the loop if it has
FlappyBeaver.prototype.checkDead = function() {
  if (this.sprite.position().top  + this.sprite.height() >= FLAPPYBEAVER.gameSize) {
    clearInterval(this.gameloop);
    this.gameloop = NaN;
  }
}