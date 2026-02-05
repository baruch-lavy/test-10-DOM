const score = document.querySelector(".scores");
const turn = document.querySelector(".turn");
const rollButton = document.querySelector(".roll");
const cubes = document.querySelector(".cubes");
const playerAScore = document.querySelector(".player-a-score");
const playerBScore = document.querySelector(".player-b-score");
const userInput = document.querySelector(".user-input");
const moveOn = document.querySelector(".move-on");
const errorMsg = document.querySelector(".error-msg");
const header = document.querySelector(".header");
const winMsg = document.querySelector(".win-msg");

const state = {
  targetScore: 10,
  playerA: { score: 0, name: "baruch" },
  playerB: { score: 0, name: "computer" },
  currentPlayer: null,
  isGameEnded: false,
};

function init() {
  initialGame();
  roll();
}
init();

function initialGame() {
  const player = chooseFirstPlayer();
  const turnTxt = document.createElement("h3");
  turnTxt.innerText = `current user: ${player.name}`;
  turn.appendChild(turnTxt);
}

function chooseFirstPlayer() {
  const rand = Math.random();
  if (rand < 0.5) {
    state.currentPlayer = state.playerA;
    return state.playerA;
  } else {
    state.currentPlayer = state.playerB;
    return state.playerB;
  }
}

function roll() {
  rollButton.addEventListener("click", () => {
    [...cubes.children].forEach((cube) => {
      cube.classList.add("rotate");
    });
    setTimeout(() => {
      [...cubes.children].forEach((cube) => {
        cube.classList.remove("rotate");
      });
    }, 1000);
    handleResults();
  });
}

function handleResults() {
  const results = randomResoltes();
  const name = state.currentPlayer.name;
  if (results[0] === results[1]) {
    if (name === "baruch") {
      state.playerA.score = 0;
      swichPlayers();
    } else {
      state.playerB.score = 0;
      swichPlayers();
    }
  } else {
    const sum = results[0] + results[1];
    if (name === "baruch") {
      state.playerA.score += sum;
    } else {
      state.playerB.score += sum;
    }
  }
  setTimeout(() => {
    checkWinner();
    askPlayer();
    printResults();
  }, 1100);
}

function checkWinner() {
  if (state.playerA.score >= state.targetScore) {
    winMsg.innerText = `the winner is ${state.playerA.name}`;
    header.classList.remove("hidden");
    endGame();
  } else if (state.playerB.score >= state.targetScore) {
    winMsg.innerText = `the winner is: ${state.playerB.name}`;
    header.classList.remove("hidden");
    endGame();
  }
}

function endGame() {
  rollButton.classList.add("hidden");
  userInput.classList.add("hidden");
  state.isGameEnded = true
}

function askPlayer() {
  if (!state.isGameEnded) {
    const goodAnswers = ["pass", "roll again", ""];
    userInput.classList.remove("hidden");
    moveOn.classList.remove("hidden");
    moveOn.addEventListener("click", () => {
      const answer = userInput.value;
      if (!goodAnswers.includes(answer.toLowerCase())) {
        errorMsg.classList.remove("hidden");
      } else {
        if (answer === goodAnswers[0]) {
          swichPlayers();
        } else if (answer === goodAnswers[1]) {
          rollButton.click();
        }
        errorMsg.classList.add("hidden");
        userInput.classList.add("hidden");
        userInput.value = "";
        moveOn.classList.add("hidden");
      }
    });
  }
}

function swichPlayers() {
  if (state.currentPlayer.name === "baruch") {
    state.currentPlayer = state.playerB;
  } else {
    state.currentPlayer = state.playerA;
  }
  const turnTxt = document.querySelector(".turn > h3");
  setTimeout(() => {
    turnTxt.innerText = `current user: ${state.currentPlayer.name}`;
  }, 930);
}

function printResults() {
  playerAScore.innerText = `${state.playerA.name} has: ${state.playerA.score}`;
  playerBScore.innerText = `${state.playerB.name} has: ${state.playerB.score}`;
}

function randomResoltes() {
  const nums = [1, 2, 3, 4, 5, 6];
  const rundIdx1 = getRandomIntInclusive(0, 5);
  const rundIdx2 = getRandomIntInclusive(0, 5);
  const num1 = nums[rundIdx1];
  const num2 = nums[rundIdx2];
  const results = [num1, num2];
  return results
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
