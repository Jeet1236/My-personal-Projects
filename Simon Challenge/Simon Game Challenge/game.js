let level = 0;
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var currentVar = 0;
var keyPressed = false;

function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#level-title').text(`Level:${level}`);
    setInterval(blink_button(randomChosenColour), 1000
    );

    currentVar = 0;
}

function blink_button(randomColour) {
    $(`.${randomColour}`).fadeOut(300);
    $(`.${randomColour}`).fadeIn(300);
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');

    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}
function animateBackground() {
    $('body').addClass('game-over');

    setTimeout(function () {
        $(`body`).removeClass('game-over');
    }, 200);
}
function startNewGame() {

    playSound("wrong");
    $('#level-title').text(`Game Over, Press any key to Restart`);
    animateBackground();
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    currentVar = 0;

}
$(document).on('keypress', function (e) {
    keyPressed = true;
    if (level == 0) {
        buttonClickedBefore = false;
        nextSequence();

    }

});
$(".btn").unbind().click(onClick);
if (!keyPressed && buttonClickedBefore) {
    startNewGame();
}

function onClick(event) {
    var buttonClickedBefore = true;
    let userChosenColour = $(event.target).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length <= gamePattern.length) {
        if (gamePattern[currentVar] === userClickedPattern[currentVar] && gamePattern.length === userClickedPattern.length) {
            nextSequence();
        }
        else if (gamePattern[currentVar] === userClickedPattern[currentVar]) {
            currentVar++;
        }
        else {
            startNewGame();
        }
    }
    else {
        startNewGame();
    }

}