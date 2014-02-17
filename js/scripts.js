$(document).ready(function() {
  var game = new FlappyBeaver('flappy', 'world', 'pipes', 'score');
  game.init();
  game.start();
});