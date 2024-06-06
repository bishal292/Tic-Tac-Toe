console.log(`Script is Running`);

const backgroundmusinc = new Audio("#");
const TurnUsedMusic = new Audio("#");
const gameOverMusic = new Audio("#");
let turn = 'X';
let isgameOver = false;

const grids = document.querySelectorAll(".grid")

const changeTurn = () =>{
    return turn === "X" ? "0" : "X";
}

const CheckWin = () =>{
    let winsConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    winsConditions.forEach(e=>{
        if((grids[e[0]].innerText === grids[e[1]].innerText) && 
        (grids[e[2]].innerText === grids[e[1]].innerText) && 
        (grids[e[0]].innerText !=="")){
            document.getElementById("game-info").innerText = grids[e[0]].innerText + " WON \n Congratulations"
            isgameOver=true;
        }
    })
}

// Main logic for the game

grids.forEach(element => {
    element.addEventListener('click',()=>{
        if (element.innerText=='' && !isgameOver) {
            // element.innerHTML=`<span class="grid-text">${turn}</span>`;
            element.innerText=`${turn}`;
            turn=changeTurn();
            CheckWin();
            if (!isgameOver) {
                document.getElementById("game-info").innerText=`Turn for ${turn}`;
            }
        }
    })
})


// Reset buttons logics

document.getElementById('reset').addEventListener('click',()=>{
    grids.forEach(element=>{
        element.innerText="";
    })
    turn = 'X';
    isgameOver=false;
    document.getElementById("game-info").innerText=`Turn for ${turn}`
})