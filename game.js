const oSound = new Audio(
  "https://www.soundjay.com/buttons/sounds/button-3.mp3"
);
const xSound = new Audio(
  "https://www.soundjay.com/buttons/sounds/button-09.mp3"
);
const winSound = new Audio(
  "https://www.soundjay.com/human/sounds/applause-8.mp3"
);
const drawSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

let gameDiv = document.querySelector(".game");
for (let i = 0; i < 9; i++) {
  gameDiv.innerHTML += `<button class='box'></button>`;
}

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let newGame = document.querySelector("#newGameBtn");
let winnerMessg = document.querySelector("#winner");
let turnO = true;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "<h3>O</h3>";
      oSound.play();
      turnO = false;
    } else {
      box.innerHTML = "<h3>X</h3>";
      xSound.play();
      turnO = true;
      reset.classList.remove("hide");
    }
    box.disabled = true; // ✅ Correct
    checkWinner(); // ✅ Call after each move
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true; // ✅ Correct
  }
};

const showWinner = (winner) => {
  winnerMessg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  winnerMessg.classList.remove("hide");
  newGame.classList.remove("hide");
  reset.classList.add("hide");
  disableBoxes();
  winSound.play();

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.7 },
    });
  }, 1000);
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner", pos1Val);
        showWinner(pos1Val);
      }
    }
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  drawSound.play();
  winnerMessg.classList.add("hide");
  newGame.classList.add("hide");
  reset.classList.add("hide");
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame); // ✅ Add reset button too
