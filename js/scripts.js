$(document).ready(function() {
  var game = new FlappyBeaver('flappyContainer', 'world', 'pipes', 'score');
  game.init();
  game.start();
});