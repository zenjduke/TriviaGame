
// This code will run as soon as the page loads
window.onload = function() {
  $(".play").on("click", triviaGame.startGame); 
  $(".restart").on("click", triviaGame.reset);
};



//  Variable that will hold our setInterval that runs the timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 10;
var questionCount = 0;
var score = 0;
var gifPick = Math.floor(Math.random() * 5);

var gifArray = ["assets/css/duncanGIF.gif", "assets/css/kawhiGIF.gif", "assets/css/manuGIF.gif", "assets/css/tdtpGIF.gif", "assets/css/tpGIF.gif"];

// My game object
var triviaGame = {

  qaArray: [
    {
      question: "Who did the Spurs defeat to win the 2014 NBA title?",
      answers: ["Boston Celtics", "Miami Heat", "Cleveland Cavaliers", "New Jersey Nets"],
      correct: "Miami Heat",
    },{
      question: "In what year was Tim Duncan drafted?",
      answers: ["1997", "1998", "1999", "1996"],
      correct: "1997",
    },{
      question: "Which of the following Spurs players held the NBA scoring title (points per game) more times?",
      answers: ["Tim Duncan", "Sean Elliot", "George Gervin", "David Robinson"],
      correct: "George Gervin",
    },{
      question: "Who was the first Spur to ever score over 70 points in a game?",
      answers: ["Tim Duncan", "David Robinson", "Manu Ginobili", "Alvin Robertson"],
      correct: "David Robinson",
    },{
      question: "David Robinson won the scoring title in 1994 over which player?",
      answers: ["Dennis Rodman", "John Stockton", "Michael Jordan", "Shaquille O'Neal"],
      correct: "Shaquille O'Neal",
    },{
      question: "In what year did the San Antonio Spurs join the NBA?",
      answers: ["1981", "1976", "1971", "1973"],
      correct: "1976",
    },{
      question: "Sean Elliot's Memorial Day miracle shot was against which team?",
      answers: ["Boston", "Los Angeles", "Dallas", "Portland"],
      correct: "Portland",
    },{
      question: "Who is known on the team for wearing their practice shorts backwards?",
      answers: ["Tim Duncan", "Matt Bonner", "Manu Ginobili", "Tony Parker"],
      correct: "Tim Duncan",
    },{
      question: "Who won the NBA Sixth Man of the Year award during the 2007-08 season?",
      answers: ["Robert Horry", "Manu Ginobili", "Brent Barry", "Bruce Bowen"],
      correct: "Manu Ginobili",
    },{
      question: "Which animal is the mascot for San Antonio Spurs?",
      answers: ["coyote", "javalina", "mustang", "wolf"],
      correct: "coyote",
    }
  ],

  startGame: function() {
    questionCount = 0;
    score = 0;
    if (!clockRunning) {
      intervalId = setInterval(triviaGame.count, 1000);
      clockRunning = true;
    }

    $("#intro").hide();
    $("#game").show();
    $("#question").text(triviaGame.qaArray[questionCount].question);
    triviaGame.renderAnswers();
    $("#scoreBox").text("Score: " + score);

  },

  renderAnswers: function() {

    $("#answers").empty();
    for (var i = 0; i < 4; i++) {
      var a = $("<button>");
      a.addClass("answer-btn");
      a.attr("data-name", triviaGame.qaArray[questionCount].answers[i]);
      a.text(triviaGame.qaArray[questionCount].answers[i]);
      $("#answers").append(a); 
    }
  },

  checkAnswer: function() {

      triviaGame.random();

      var answer = $(this).attr("data-name");
      var correct = (triviaGame.qaArray[questionCount].correct);

      var happyGif = $("<img>").attr("src", gifArray[gifPick]);
      var sadGif = $("<img>").attr("src", "assets/css/sadDuncan.gif");

      // var applause = $("<audio>").attr("src", "assets/css/Applause.wav");
      // var buzzer = $("<audio>").attr("src", "assets/css/WrongBuzzer.wav");

      if (answer === correct){
        score++;
        $("#scoreBox").text("Score: " + score);
        $("#result").append(happyGif);
        $("#game").hide();
        $("#resultBox").show();
        $("#resultText").text("Nice!");
        // applause.play();
        time=3;
      }
      else {
        $("#result").append(sadGif);
        $("#game").hide();
        $("#resultBox").show();
        $("#resultText").text("Shameful. The answer is "+ correct +".");
        // buzzer.play();
        time=3;
      }
    },

  nextQuestion: function() {

    if (questionCount === 9){
      triviaGame.stopGame();
    }
    else {
    $("#result").empty();
    $("#resultBox").hide();
    $("#game").show();
    questionCount++;
    $("#question").text(triviaGame.qaArray[questionCount].question);
    triviaGame.renderAnswers();
    }
  },

  stopGame: function() {
    $("#game").hide();
    $(".lead").text("You are a "+score+"0% Spurs Fan.")
    $("#intro").show();
    $("#result").empty();
    $("#resultBox").hide();
    $(".play").text("Play again.");
    $(".play").on("click", triviaGame.startGame);
  },

  count: function() {  

      time--;
      $("#timer").text("00:0" + time);
      if (time === 0) {
        time = 10;
        triviaGame.nextQuestion();
      }
    },

  reset: function() {
      time = 0;
      $("#timer").text("00:0" + time);
      clearInterval(intervalId);
      clockRunning = false;
  
    },

    random: function() {
      gifPick = Math.floor(Math.random() * 6);
    },
  
};


// Adding a click event listener to all elements with a class of "answer-btn"
$(document).on("click", ".answer-btn", triviaGame.random);
$(document).on("click", ".answer-btn", triviaGame.checkAnswer);
