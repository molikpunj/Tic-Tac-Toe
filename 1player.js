const boxes = document.querySelectorAll(".divbox");
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
let xscore = 0;
let oscore = 0;
const HUMAN = 'X';
const AI = 'O';

function getIndexFromId(id) {
    const row = parseInt(id.charAt(3));
    const col = parseInt(id.charAt(4));
    return row * 3 + col;
}

function getIdFromIndex(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return `div${row}${col}`;
}

boxes.forEach(function(b) {
    b.onclick = function() {
        if (gameover) return;
        
        const index = getIndexFromId(b.id);
        
        if (board[index] === '') {
            makeMove(index, HUMAN);
            
            if (!gameover) {
                setTimeout(() => {
                    const aiMove = getBestMove();
                    if (aiMove !== -1) {
                        makeMove(aiMove, AI);
                    }
                }, 300);
            }
        }
    };
});

function makeMove(index, player) {
    board[index] = player;
    const divId = getIdFromIndex(index);
    const box = document.getElementById(divId);
    box.textContent = player;
    box.style.fontSize = "80px";
    box.style.display = "inline-flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.fontFamily = "'Segoe UI', sans-serif";
    box.style.fontWeight = "bold";
    box.style.color = "white";
    
    checkwinner();
}

function checkwinner() {
    for (let i = 0; i < winningcombo.length; i++) {
        const [a, b, c] = winningcombo[i];
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            gameover = true;
            
            if (board[a] === HUMAN) {
                xscore++;
                document.getElementById("varX").textContent = xscore;
                showMessage("You won! 🎉");
            } else {
                oscore++;
                document.getElementById("varO").textContent = oscore;
                showMessage("AI wins! 🤖");
            }
            return;
        }
    }
    
    if (!board.includes("")) {
        gameover = true;
        showMessage("It's a draw! 🤝");
    }
}

function showMessage(message) {
    let messageDiv = document.getElementById("gameMessage");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "gameMessage";
        messageDiv.style.textAlign = "center";
        messageDiv.style.fontSize = "30px";
        messageDiv.style.fontFamily = "'Segoe UI', sans-serif";
        messageDiv.style.color = "rgb(108, 174, 255)";
        messageDiv.style.fontWeight = "bold";
        messageDiv.style.margin = "20px";
        
        const header = document.querySelector(".headdiv");
        header.parentNode.insertBefore(messageDiv, header.nextSibling);
    }
    messageDiv.textContent = message;
    messageDiv.style.visibility = "visible";
}

function minimax(newBoard, depth, isMaximizing) {
    const winner = checkWinnerForMinimax(newBoard);
    
    if (winner === AI) return 10 - depth;
    if (winner === HUMAN) return depth - 10;
    if (newBoard.every(cell => cell !== "")) return 0; // Draw
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = AI;
                const score = minimax(newBoard, depth + 1, false);
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = HUMAN;
                const score = minimax(newBoard, depth + 1, true);
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinnerForMinimax(board) {
    for (let combo of winningcombo) {
        const [a, b, c] = combo;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = AI;
            const score = minimax([...board], 0, false);
            board[i] = "";
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

document.getElementById("reset").onclick = function() {
    boxes.forEach(function(b) {
        b.textContent = "";
    });
    board = ["", "", "", "", "", "", "", "", ""];
    gameover = false;
    
    const messageDiv = document.getElementById("gameMessage");
    if (messageDiv) {
        messageDiv.style.visibility = "hidden";
    }
}

document.getElementById("resetscore").onclick = function() {
    xscore = 0;
    oscore = 0;
    document.getElementById("varX").textContent = xscore;
    document.getElementById("varO").textContent = oscore;
}