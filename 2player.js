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
        }
    };
});

function checkwinner() {
    
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
for(let j=0; j<=8; j++){
    console.log(board[j]);
}
}