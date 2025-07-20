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
const windiv = document.getElementById("windiv")

boxes.forEach(function(b) {
    b.onclick = function() {
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
});

function checkwinner() {
    for (let i=0; i<=7; i++) {
        if (board[winningcombo[i][0]] !== "" && board[winningcombo[i][0]] === board[winningcombo[i][1]] && board[winningcombo[i][1]] === board[winningcombo[i][2]]) {
            let wintext = document.createElement('p');
            wintext.textContent = board[winningcombo[i][0]] + " has won!";
            windiv.getElementById("winp").innerText(wintext);
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
}

document.getElementById("resetscore").onclick = function() {
for(let j=0; j<=7; j++){
    for(let k=0; k<=2; k++)
    console.log(winningcombo[j][k]);
}
}