let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let container = document.querySelector(".container");

let turn0 = false;

let clickCount = 0;

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newGame = document.querySelector("#new-game");
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resetGame = () => {
  clickCount = 0;
  turn0 = false;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};
resetButton.addEventListener("click", resetGame);

const newBtn = () => {
  resetGame();
  resetButton.classList.remove("hide");
  msgContainer.classList.add("hide");
  container.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      //player O
      box.innerText = "O";
      turn0 = false;
    } else {
      //player X
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  disableBoxes();
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  resetButton.classList.add("hide");
  newGame.addEventListener("click", newBtn);
  container.classList.add("hide");
};
const showDraw = () => {
  disableBoxes();
  msg.innerText = `Draw`;
  msgContainer.classList.remove("hide");
  resetButton.classList.add("hide");
  newGame.addEventListener("click", newBtn);
  container.classList.add("hide");
};

const checkWinner = () => {
  clickCount++;
  console.log(clickCount);
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }
  if (clickCount == 9) {
    showDraw();
  }
};
