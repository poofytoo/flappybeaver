// Constants
var FLAPPYBEAVER = {
  flyVelocity: -2, // Speed it flies up when user taps
  fps: 24,
  pipeInterval: 10,
  gameSize: 500,
  gravity: 0.05,
  initialVelocity: -1,
  maxHeight: 0,
  groundSpeed: 10,
};

window.top.FLAPPYBEAVER = FLAPPYBEAVER;

var FlappyBeaver = function(spriteClass, worldClass) {
  this.level = 1;
  this.sprite = $('.' + spriteClass); // Class name of the div for the birdy
  this.world = $('.' + worldClass); // Class name of the div for the whole game
  this.velocity = FLAPPYBEAVER.initialVelocity;
  this.gameloop;
  this.framesTillNewPipe = FLAPPYBEAVER.pipeInterval;
  this.artInterval = 0;
  this.pipes = [];
};

// Initializes whatever needs to be initialized
FlappyBeaver.prototype.init = function() {
  var game = this;
  this.world.click(function() {
    game.fly();
  });
}

// Starts the game
FlappyBeaver.prototype.start = function() {
  var game = this;
  this.gameloop = setInterval(function() {
    game.nextStep();
  }, 1.0/FLAPPYBEAVER.fps);
}

// Smallest step the game takes
FlappyBeaver.prototype.nextStep = function() {
  this.fall();
  //this.moveWorld();

  // Check if the bird hit the ground yet and stop looping
  this.checkDead();

  // Art and beauty
  this.artInterval += 1;
  if (this.artInterval % FLAPPYBEAVER.groundSpeed === 0){
    console.log('hey');
    bgPos = '0px ' + this.artInterval / FLAPPYBEAVER.groundSpeed * 61 + 'px';
    $('.grass').css({backgroundPosition: bgPos})
  }
}


FlappyBeaver.prototype.moveWorld = function() {
  _.each(this.pipes, function(pipe, index, list) {
    pipe.moveLeft();
  });
  if (this.framesTillNewPipe === 0) {
    this.newPipe();
    this.framesTillNewPipe = FLAPPYBEAVER.pipeInterval;
  }
  this.framesTillNewPipe--;
}

FlappyBeaver.prototype.newPipe = function() {
  var pipe = $("<div class='pipe'></div>");
  this.world.prepend(pipe);
  this.pipes.push(new Pipe(pipe));
}

// Fall bird fall
FlappyBeaver.prototype.fall = function() {
  var newPosition = Math.min(this.sprite.position().top + this.velocity,
                             FLAPPYBEAVER.gameSize - this.sprite.height());
  newPosition = Math.max(FLAPPYBEAVER.maxHeight, newPosition);
  this.sprite.css({
    top: newPosition
  });
  this.velocity += FLAPPYBEAVER.gravity;
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