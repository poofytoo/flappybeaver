var PIPE = {
  gap: 100,
  velocity: -2
};

var Pipe = function(pipe) {
  this.worldPosition = FLAPPYBEAVER.gameSize;
  this.pipeDiv = pipe;

  this.top = $("<div class='top'></div>");
  this.top.css({height: Math.round(Math.random()*300)});
  this.bottom = $("<div class='bottom'></div>");
  this.bottom.css({height: 400 - this.top.height()});

  this.pipeDiv.append(this.top)
              .append(this.bottom);
}

Pipe.prototype.moveLeft = function() {
  this.worldPosition += PIPE.velocity;
  this.pipeDiv.css({marginLeft: this.worldPosition});
}