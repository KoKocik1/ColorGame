var gameStart = 0;
var level = 0;
var numberOfClickedButtons = 0;
var memory = [];

/******* START STOP NEXT GAME *******/
//uruchomienie gry
$(document).click(function () {
    if (gameStart === 0) {
        startGame();
    }
});

//start gry
function startGame() {
    gameStart = 1;
    nextLevel();
}

//next level
function nextLevel() {
    level++;
    numberOfClickedButtons = 0;
    $("h1").text("Level " + level);

    //nowy element
    setTimeout(function () {
        generateNewElement()
    }, 1000);
}

//koniec gry
function gameOver() {
    $("h1").text("Game over :(");

    //clear memory
    memory = [];

    //reset level
    level = 0;

    //play wrong sound
    new Audio("sounds/wrong.mp3").play();

    //background red
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    setTimeout(function () {
        gameStart = 0;
        $("h1").text("Tap to Start");
    }, 1000);
}


/******* Buttons *******/

//click event
$(".btn").click(function () {
    //uruchomienie gry
    if (gameStart != 0) {

        var color = $(this).attr("class").split(" ")[1];

        //animation oc click
        animationOnCLickButton(color);

        //check correct
        checkClickedColor(color);
    }
});


//animation autio and click
function animationOnCLickButton(color) {

    new Audio("sounds/" + color + ".mp3").play();

    $("." + color).addClass("pressed");

    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 200);
}

/******* GAME FUNCTIONS *******/


function generateNewElement() {
    var losowa = getColorFromNumber(getRandomInt(1,4));

    //efekty
    setTimeout(function () {
        animationOnCLickButton(losowa)
    }, 200);


    //pamiec
    memory.push(losowa);
}

/** Change number to string color **/
function getColorFromNumber(number) {
    switch (number) {
        case 1:
            return "green";
        case 3:
            return "yellow";
        case 4:
            return "blue";
        case 2:
            return "red";
    }
}

/** Check that click correct **/
function checkClickedColor(clickedButton) {
    if (numberOfClickedButtons < level) {
        if (memory[numberOfClickedButtons] === clickedButton) {
            numberOfClickedButtons++;
            if (numberOfClickedButtons === level) {
                nextLevel();
            }
        } else {
            gameOver();
        }
    } else {
        gameOver();
    }
}

/**integer from min to max **/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}