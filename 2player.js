const boxes = document.querySelectorAll(".divbox");
let xtrue = true;
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

boxes.forEach(function(b) {
    b.onclick = function() {
        if(gameover == false) {
        if (b.textContent == ''){
            if (xtrue) {
                xshow(b);
                xtrue = false;
            } else {
                oshow(b);
                xtrue = true;
            }
            checkwinner();
        }
    };
}
});

function checkwinner() {
    for (let i=0; i<=7; i++) {
        if (board[winningcombo[i][0]] !== "" && board[winningcombo[i][0]] === board[winningcombo[i][1]] && board[winningcombo[i][1]] === board[winningcombo[i][2]]) {
            document.getElementById("divp").textContent = board[winningcombo[i][0]] + " has won!";
            document.getElementById("divp").style.visibility = "visible";
            gameover = true;
    }
}
}

function xshow(box) {
    box.textContent = "X";
    let i = parseInt(box.id);
    board[i] = box.textContent;
}

function oshow(box) {
    box.textContent = "O";
    let i = parseInt(box.id);
    board[i] = box.textContent;
}

document.getElementById("reset").onclick = function() {
    boxes.forEach(function(b) {
        b.textContent = "";
    });
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("divp").textContent = "Who Wins";
    document.getElementById("divp").style.visibility = "hidden";
    gameover = false;
}

