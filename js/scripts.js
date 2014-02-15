$(document).ready(function() {
  var game = new FlappyBeaver('flappy', 'world', 'pipes');
  game.init();
  game.start();
});