$(document).ready(function() {
  var game = new FlappyBeaver('flappy');
  game.start();

  $('.world').click(function() {
    console.log("AHHH");
    game.fly();
  });
});