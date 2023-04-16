let stopwatchInterval;
let stopwatchStartTime;
let stopwatchTime = 0;

// Define an array of clue objects
//console.log(localStorage.getItem("puzzle_token"));
if (localStorage.getItem("puzzle_token" )== null) {
  //console.log("first")
   window.location.href = "https://puzzle12.netlify.app/login.html";
}

const clues = [
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "m",
    hints: [
      "Hint 1: The answer starts with the letter 'M'",
      "Hint 2: The answer is a unit of time",
      "Hint 3: The answer is not 'minute' or 'moment'"
    ]
  },
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
    hints: [
      "Hint 1: The answer is a representation of a geographic area",
      "Hint 2: The answer is often used for navigation",
      "Hint 3: The answer is not a globe or a earth"
    ]
  },
  {
    question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    answer: "fire",
    hints: [
      "Hint 1: The answer is a natural phenomenon",
      "Hint 2: The answer is often associated with destruction",
      "Hint 3: The answer is not a volcano or a storm"
    ]
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hints: [
      "Hint 1: The answer relates to movement",
      "Hint 2: The answer is often left behind unintentionally",
      "Hint 3: The answer is not slippers or a trail"
    ]
  },
  {
    question: "What starts with an E, ends with an E, but only contains one letter?",
    answer: "eye",
    hints: [
      "Hint 1: The answer is a word with a single letter",
      "Hint 2: The answer is often used for communication",
      "Hint 3: The answer is not 'email' or 'emoji'"
    ]
  }
];
let scoreinterval;
// select HTML elements
const welcomeContainer = document.getElementById("welcome-container");
const clueContainers = document.querySelectorAll(".clue-container");
const hintContainers = document.querySelectorAll(".hint-container");
const successContainer = document.getElementById("success-container");
const yesButton = document.getElementById("yes-button");

let currentClueIndex = 0;
let score = 0;
let timeInSeconds = 0; // Example time used in seconds


//console.log(`Your score is ${score}!`);

// function to start the game
function startGame() {
  // hide the welcome container
  welcomeContainer.classList.add("hidden");
  document.getElementsByClassName("blur")[0].style.filter = "none"
  document.getElementsByClassName("blur")[1].style.filter="none"
  startStopwatch()
  scoreinterval=setInterval(() => {
    //console.log("first start")
    timeInSeconds++;
    //console.log(timeInSeconds)
  }, 1000);
  // only show the first clue container if "Yes" is clicked
  const answerInput = document.getElementById("answer-input");
  const answer = answerInput.value.trim().toLowerCase();
  if (answer === "yes") {
    clueContainers[currentClueIndex].classList.remove("hidden");
  }

  // hide all clue containers except for the first one
  for (let i = 1; i < clueContainers.length; i++) {
    clueContainers[i].classList.add("hidden");
  }
}

function checkAnswer(clueIndex) {
  const answerInput = document.getElementById(`clue-${clueIndex}`);
  const answer = answerInput.value.trim().toLowerCase();

  // check if the answer is correct
  if (checkAnswerForClue(clueIndex, answer)) {
    // increment the score and move to the next clue
    // score += 10;
    currentClueIndex++;
    answerInput.disabled = true;

    // if there are no more clues, show the success container
    if (currentClueIndex >= clueContainers.length) {
      updatescore()
      showSuccessContainer();
      stopStopwatch()
    } else {
      // otherwise, hide the current clue container and show the next one
      clueContainers[currentClueIndex - 1].classList.add("hidden");
      clueContainers[currentClueIndex].classList.remove("hidden");

      // hide all hints except the first one for the current clue
      for (let i = 1; i < hintContainers.length; i++) {
        hintContainers[i].classList.add("hidden");
      }
      hintContainers[0].classList.remove("hidden");
    }
  } else {
    // if the answer is incorrect, show the corresponding hint container
    const hintContainer = hintContainers[clueIndex - 1];
    const numWrongAnswers = parseInt(hintContainer.dataset.numWrongAnswers) || 0;
    const nextHintContainer = hintContainers[numWrongAnswers];
    nextHintContainer.classList.remove("hidden");
    hintContainer.dataset.numWrongAnswers = numWrongAnswers + 1;
    answerInput.value = "";
  }
}


// function to check the answer for a given clue
function checkAnswerForClue(clueIndex, answer) {
  let isCorrect = false;
  switch (clueIndex) {
    case 1:
      isCorrect = answer === "m";
      break;
    case 2:
      isCorrect = answer === "map";
      break;
    case 3:
      isCorrect = answer === "fire";
      break;
    case 4:
      isCorrect = answer === "footsteps";
      break;
    case 5:
      isCorrect = answer === "eye";
      break;
    default:
      break;
  }
  return isCorrect;
}


  // function to show the success container
function showSuccessContainer() {
    // hide all the clue containers and hint containers
    clueContainers.forEach(container => {
      container.classList.add("hidden");
    });
    hintContainers.forEach(container => {
      container.classList.add("hidden");
    });
  
    // show the success container and display the score
    successContainer.classList.remove("hidden");
    const scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = `Score: ${score}`;
  //console.log(score)
  successContainer.appendChild(scoreDisplay);
  
  }
  // add event listener for "keydown" event on answer input fields
const answerInputs = document.querySelectorAll(".answer-input");
answerInputs.forEach((input) => {
input.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
const clueIndex = parseInt(input.dataset.clueIndex);
checkAnswer(clueIndex);
}
});
});

// add event listener for "click" event on all "check" buttons
const checkButtons = document.querySelectorAll(".check-button");
checkButtons.forEach((button) => {
button.addEventListener("click", (event) => {
const clueIndex = parseInt(button.dataset.clueIndex);
checkAnswer(clueIndex);
});
});

// add event listener for "click" event on "play again" button
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", () => {
// reset variables
currentClueIndex = 0;
score = 0;

// hide the success container and reset its content
successContainer.classList.add("hidden");
const scoreDisplay = successContainer.querySelector("p");
successContainer.removeChild(scoreDisplay);

// enable all answer input fields and reset their content
answerInputs.forEach((input) => {
input.disabled = false;
input.value = "";
});

// hide all hint containers and reset their "numWrongAnswers" data attribute
hintContainers.forEach((hintContainer) => {
hintContainer.classList.add("hidden");
hintContainer.dataset.numWrongAnswers = 0;
});

// show the first clue container
clueContainers[currentClueIndex].classList.remove("hidden");
});

// function to shuffle an array
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// function to randomize the order of the clues
function randomizeClues() {
const clues = Array.from(clueContainers);
const shuffledClues = shuffleArray(clues);
const cluesContainer = document.getElementById("clues-container");
shuffledClues.forEach((clue) => {
cluesContainer.appendChild(clue);
});
}

// call the randomizeClues function to randomize the order of the clues
randomizeClues();
  


function startStopwatch() {
  stopwatchStartTime = Date.now() - stopwatchTime;
  stopwatchInterval = setInterval(updateStopwatch, 10);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  document.getElementById("stopwatch").innerHTML = formatStopwatchTime(stopwatchTime);
}

function updateStopwatch() {
  stopwatchTime = Date.now() - stopwatchStartTime;
  document.getElementById("stopwatch").innerHTML = formatStopwatchTime(stopwatchTime);
}

function formatStopwatchTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);
  return pad(minutes) + ":" + pad(seconds) + ":" + pad(milliseconds);
}

function pad(num) {
  return num.toString().padStart(2, "0");
}


async function updatescore() {
  clearInterval(scoreinterval)
  //console.log(timeInSeconds+" time")
if (timeInSeconds <= 60) {
  score = 100;
} else if (timeInSeconds <= 120) {
  score = 95;
} else if (timeInSeconds <= 180) {
  score = 90;
}
else if (timeInSeconds <= 240) {
  score = 85;
}
else if (timeInSeconds <= 300) {
  score = 80;
}
else if (timeInSeconds <= 360) {
  score = 75;
}
else if (timeInSeconds <= 420) {
  score = 70;
}
else if (timeInSeconds <= 480) {
  score = 65;
}
else if (timeInSeconds <= 540) {
  score = 60;
}
else if (timeInSeconds <= 600) {
  score = 55;
}
else if (timeInSeconds <= 660) {
  score = 50;
}
else if (timeInSeconds <= 720) {
  score = 45;
}
else if (timeInSeconds < 780) {
  score = 40;
  }
  //console.log(score)

 const response2 = await fetch(
        `https://puzzle12backend.onrender.com/auth/getuser`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("puzzle_token")
          },
         
        }
        );

  const json2 = await response2.json();
  // //console.log(json2)
  let email = json2.email;
  //console.log(email)
  
   const response = await fetch(
        `https://puzzle12backend.onrender.com/auth/addscore`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:email, score:score}),
        }
        );
        const json = await response.json();
        
        if (json.sucess) {
          //console.log(json)
          location.replace("https://puzzle12.netlify.app/leaderboard.html")
          
        }
        else {
          //console.log(json)
          alert("Enter Valid credentials")
        }
        
}