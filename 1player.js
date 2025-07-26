const boxes = document.querySelectorAll(".divbox");
let playerTurn = true; 
let playerStartsNext = true; 
let board = ["", "", "", "", "", "", "", "", ""];
const winningcombo = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameover = false;
let playerscore = 0;
let aiscore = 0;

boxes.forEach(function(b) {
    b.onclick = function() {
        if(gameover == false && playerTurn == true) {
            if (b.textContent == ''){
                playerMove(b);
                checkwinner();
                
                if (!gameover) {
                    playerTurn = false;
                    setTimeout(() => {
                        aiMove();
                        checkwinner();
                        playerTurn = true;
                    }, 500);
                }
            }
        }
    };
});

function checkwinner() {
    for (let i = 0; i <= 7; i++) {
        if (board[winningcombo[i][0]] !== "" && 
            board[winningcombo[i][0]] === board[winningcombo[i][1]] && 
            board[winningcombo[i][1]] === board[winningcombo[i][2]]) {
            
            let winner = board[winningcombo[i][0]];
            if (winner === 'X') {
                document.getElementById("divp").textContent = "You Win!";
                playerscore++;
                document.getElementById("varX").textContent = playerscore;
            } else {
                document.getElementById("divp").textContent = "AI Wins!";
                aiscore++;
                document.getElementById("varO").textContent = aiscore;
            }
            
            document.getElementById("windiv").style.visibility = "visible";
            gameover = true;
            playerStartsNext = !playerStartsNext;
            return;
        }
    }
    
    // Check for draw
    if (gameover == false && !board.includes("")) {
        document.getElementById("divp").textContent = "It's a draw!";
        document.getElementById("windiv").style.visibility = "visible";
        gameover = true;
        playerStartsNext = !playerStartsNext;
    }
}

function playerMove(box) {
    box.textContent = "X";
    let i = parseInt(box.id);
    board[i] = "X";
}

function aiMove() {
    let move = getBestMove();
    
    if (move !== -1) {
        boxes[move].textContent = "O";
        board[move] = "O";
    }
}

function getBestMove() {
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (checkWinCondition("O")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "X";
            if (checkWinCondition("X")) {
                board[i] = ""; 
                return i;
            }
            board[i] = "";
        }
    }
    
    if (board[4] === "") {
        return 4;
    }
    
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (board[corner] === "") {
            return corner;
        }
    }
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            return i;
        }
    }
    
    return -1;
}

function checkWinCondition(player) {
    for (let i = 0; i <= 7; i++) {
        if (board[winningcombo[i][0]] === player && 
            board[winningcombo[i][1]] === player && 
            board[winningcombo[i][2]] === player) {
            return true;
        }
    }
    return false;
}

document.getElementById("reset").onclick = function() {
    boxes.forEach(function(b) {
        b.textContent = "";
    });
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("divp").textContent = "Who Wins";
    document.getElementById("windiv").style.visibility = "hidden";
    gameover = false;
    playerTurn = playerStartsNext;
    
    if (!playerStartsNext) {
        setTimeout(() => {
            aiMove();
            checkwinner();
            playerTurn = true;
        }, 500);
    }
}

document.getElementById("resetscore").onclick = function() {
    playerscore = 0;
    aiscore = 0;
    document.getElementById("varX").textContent = playerscore;
    document.getElementById("varO").textContent = aiscore;
}