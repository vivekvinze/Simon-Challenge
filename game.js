var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 50);
}

function checkAnswer() {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        return true;
    } else {
        return false;
    }
}

$(document).keypress(function() {
    if (started == true) {
        started = false;
        console.log(gamePattern);
        $("h1").text("Level " + level);
        nextSequence();
        level++;





    }
})

// What happends when user clicks any button.
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log(userClickedPattern);
    console.log("-");
    console.log(gamePattern);

    var i = (userClickedPattern.length) - 1;
    console.log(i);

    if (checkAnswer() == true && userClickedPattern.length==gamePattern.length) {
        setTimeout(function() {
            console.log("I entered checkAnswer");
            nextSequence();
            $("h1").text("Level " + level);
            level++;
            userClickedPattern = [];
        }, 500);
    }
    if (userClickedPattern[i]!=gamePattern[i]) {
        $("h1").text("Game Over, click any key to restart").css("font-size","2.5rem").css("margin-bottom","20px");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        var end = new Audio("sounds/wrong.mp3");
        end.play();
        $(document).keypress(function(event){
            location.reload();
        })

    }

});
