// Constants
var FLAPPYBEAVER = {
  FLY_VELOCITY: -1.25, // Speed it flies up when user taps
  FPS: 24,
  PIPE_INTERVAL: 400, // Interval between pipe appearing
  GAME_SIZE: 500,
  GRAVITY: 0.025,
  INITIAL_VELOCITY: -1,
  MAX_HEIGHT: 0,
  GROUND_SPEED: 20,
};

// Initial numeric/boolean game values
FLAPPYBEAVER.INITIAL_VALUES = {
    velocity: FLAPPYBEAVER.INITIAL_VELOCITY,
    gameloop: NaN,
    framesTillNewPipe: FLAPPYBEAVER.PIPE_INTERVAL,
    artInterval: 0,
    collided: false,
    pipenum: 1,
    score: 0
  }

window.top.FLAPPYBEAVER = FLAPPYBEAVER;

var FlappyBeaver = function(spriteClass, worldClass, pipeClass, scoreClass) {
  this.level = 1;

  // DOM elements
  this.sprite = $('.' + spriteClass); // Class name of the div for the birdy
  this.world = $('.' + worldClass); // Class name of the div for the whole game
  this.pipesContainer = $('.' + pipeClass);
  this.scoreContainer = $('.' + scoreClass);

  // Game variables
  this.variables = FLAPPYBEAVER.INITIAL_VALUES;
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
  this.variables.gameloop = setInterval(function() {
    game.nextStep();
  }, 1.0/FLAPPYBEAVER.FPS);
}

// Smallest step the game takes
FlappyBeaver.prototype.nextStep = function() {
  this.fall();

  if (!this.collision) { // If the flappy has collided with something, stop moving the world
    this.moveWorld();
  }

  this.checkCollision(); // Check if the flappy has collided with anything
  this.checkDead(); // Check if the flappy hit the ground yet and stop looping
}

// Moves the world elements
FlappyBeaver.prototype.moveWorld = function() {
  // Move each pipe left
  _.each(this.pipes, function(pipe, index, list) {
    pipe.moveLeft();
  });

  // Remove the pipes already off screen
  this.pipes = _.filter(this.pipes, function(pipe) {
    if (pipe.worldPosition + pipe.pipeDiv.width() < 0) {
      pipe.remove();
    }
    return pipe.worldPosition + pipe.pipeDiv.width() >= 0;
  });

  // Time for a new pipe
  if (this.variables.framesTillNewPipe === 0) {
    this.newPipe();
    this.variables.framesTillNewPipe = FLAPPYBEAVER.PIPE_INTERVAL;
  }
  this.variables.framesTillNewPipe--;

  // Art and beauty
  this.variables.artInterval += 1;
  if (this.variables.artInterval % FLAPPYBEAVER.GROUND_SPEED === 0){
    bgPos = '0px ' + this.variables.artInterval / FLAPPYBEAVER.GROUND_SPEED * 61 + 'px';
    $('.grass').css({backgroundPosition: bgPos})
  }
}

// Creates a new pipe and adds it to both the array of pipes and the visually
FlappyBeaver.prototype.newPipe = function() {
  var pipe = $("<div class='pipe'></div>");
  this.pipesContainer.append(pipe);
  this.pipes.push(new Pipe(pipe, this.variables.pipenum++));
}

// Fall bird fall
FlappyBeaver.prototype.fall = function() {
  var newPosition = Math.min(this.sprite.position().top + this.variables.velocity,
                             FLAPPYBEAVER.GAME_SIZE - this.sprite.height());
  newPosition = Math.max(FLAPPYBEAVER.MAX_HEIGHT, newPosition);
  this.sprite.css({
    top: newPosition
  });
  this.variables.velocity += FLAPPYBEAVER.GRAVITY;
}

// Called when the user clicks
// Basically just reverses the velocity so the bird flies for a bit
FlappyBeaver.prototype.fly = function() {
  this.variables.velocity = FLAPPYBEAVER.FLY_VELOCITY;
}

// Increments score and updates the text
FlappyBeaver.prototype.incrementScore = function() {
  this.scoreContainer.text(++this.variables.score);
}

// Checks if the flappy thing has collided with any pipes on the screen
// If it has, sets the velocity to something high to make it drop, and
// toggle the collision variable
FlappyBeaver.prototype.checkCollision = function() {
  var game = this;
  _.each(this.pipes, function(pipe, index, list) {
    if (pipe.collision(game.sprite.position(), game.sprite.height(), game.sprite.width())) {
      game.variables.collision = true;
      game.variables.velocity = 50;
    } else if (pipe.passed(game.sprite.position(), game.sprite.height(), game.sprite.width()) && pipe.idx > game.variables.score) {
      game.incrementScore();
    }
  });
}

// Returns true if the beaver hit the ground
// Stops the loop if it has
FlappyBeaver.prototype.checkDead = function() {
  if (this.sprite.position().top  + this.sprite.height() >= FLAPPYBEAVER.GAME_SIZE) {
    clearInterval(this.variables.gameloop);
    this.reset();
  }
}

// Resets all variables
FlappyBeaver.prototype.reset = function() {
  this.variables = FLAPPYBEAVER.INITIAL_VALUES;
  this.pipes = [];
}