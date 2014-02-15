// Constants
var FLAPPYBEAVER = {
  gravity: 0.05,
  initialVelocity: -1,
  gameSize: 500,
  topOffset: 1,
  fps: 24
};

var FlappyBeaver = function(spriteClass) {
  this.level = 1;
  this.sprite = $('.' + spriteClass); // Class name of the div for the birdy
  this.velocity = FLAPPYBEAVER.initialVelocity;
  this.gameloop;
};

FlappyBeaver.prototype.nextStep = function() {
  var newPosition = Math.min(this.sprite.position().top + this.velocity,
                             FLAPPYBEAVER.gameSize - this.sprite.height());
  this.sprite.css({
    top: newPosition
  });
  this.velocity += FLAPPYBEAVER.gravity;

  if (this.isDead()) {
    clearInterval(this.gameloop);
    this.gameloop = NaN;
  }
}


FlappyBeaver.prototype.start = function() {
  var game = this;
  this.gameloop = setInterval(function() {
    game.nextStep();
  }, 1.0/FLAPPYBEAVER.fps);
}

FlappyBeaver.prototype.isDead = function() {
  return this.sprite.position().top  + this.sprite.height() >= FLAPPYBEAVER.gameSize;
}