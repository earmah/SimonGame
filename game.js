
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

// if(started === false){
//   $(document).keydown(function(){
//     started = true;
//     $("#level-title").html("Level 0");
//   });
//   nextSequence();
//
// }

$(document).keydown(function(){
  if(!started){
    $("level-title").html("Level "+ level);
    nextSequence();
    started = true;
  }
})


$(".btn").click(function(){
  // console.log($("div").attr("btn"));
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log("userClickedPattern: " + userClickedPattern);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});


function nextSequence(){
  level++;
  $("#level-title").html("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("gamePattern: " + gamePattern);

  var buttonSelector = $("#"+randomChosenColour);
  // console.log(buttonSelector);
  buttonSelector.fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  //     audio.play();
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
      audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
          setTimeout(nextSequence,1000);
        }
    }else{
          console.log("wrong");
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over")
          }, 200);
          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();

        }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
