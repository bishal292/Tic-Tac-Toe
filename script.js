console.log(`Script is Running`);

const backgroundmusinc = new Audio("#"); // audio which will be played during game
const TurnUsedMusic = new Audio("#"); // audio played when a turn is used by player
const gameOverMusic = new Audio("#"); // audio to be played when game is over
let turn = "X"; // Denote whose turn is currently either X or 0
let isgameOver = false; // keeps the track of either the game id over or not

// query selector to get all the 9 - grid boxes
const grids = document.querySelectorAll(".grid");

// Function to change the turn and pass to the next player
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

const CheckWin = () => {
  // This below array contains the win condiotion values and thposition for the line to be displayed after win happen
  // here first three columns denotes the grid positions for the win as below
  /*
        0   1   2
        3   4   5
        6   7   8
     */
  // And next three columns denote the values to be applied on the translate property to the grid aaccordance with the cells with win
  // Where 5th, 6th and 7th columns represents translateX translateY and Rotate-deg Respectively.
  let winsConditions = [
        [0,1,2, 5,5,0],
        [3,4,5, 5,15,0],
        [6,7,8, 5,25,0],
        [0,3,6, -5,15,90],
        [1,4,7, 5,15,90],
        [2,5,8, 15,15,90],
        [0,4,8, 0.1,15,45],
        [2,4,6, 0.1,15,135]
  ];
  winsConditions.forEach((e) => {
    if (
      grids[e[0]].innerText === grids[e[1]].innerText &&
      grids[e[2]].innerText === grids[e[1]].innerText &&
      grids[e[0]].innerText !== ""
    ) {
      document.getElementById("game-info").innerText =
        "Congratulations!!\n" + grids[e[0]].innerText + " WON";
      isgameOver = true;
      document.getElementById("image-box").style.display = "block";


      if (e[5] !== 0 && e[5] !== 90) {
        if (window.innerWidth > 800) {
          document.querySelector(".line").style.width = "30vw";
          document.querySelector(".line").style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`;
          } else {
            document.querySelector(".line").style.width = "60vw";
            document.querySelector(".line").style.transform = `translate(${e[3]*2}vw , ${e[4]*2}vw) rotate(${e[5]}deg)`;
        }
      }else{
        document.querySelector(".line").style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`;
      }


      document.querySelector(".line").style.display="block";
    }
  });
};

// Main logic for the game

grids.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText == "" && !isgameOver) {
      element.innerText = `${turn}`;
      turn = changeTurn();
      CheckWin();
      if (!isgameOver) {
        document.getElementById("game-info").innerText = `Turn for ${turn}`;
      }
    }
  });
});

// Reset buttons logics

document.getElementById("reset").addEventListener("click", () => {
  grids.forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameOver = false;
  document.getElementById("game-info").innerText = `Turn for ${turn}`;
  document.getElementById("image-box").style.display = "none";
  document.querySelector(".line").style.display="none";
});
