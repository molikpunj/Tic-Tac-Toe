const boxes = document.querySelectorAll(".divbox");
let xtrue = true;

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

function xshow(box) {
    box.textContent = "X";
}

function oshow(box) {
    box.textContent = "O";
}

document.getElementById("reset").onclick = function() {
    boxes.forEach(function(b) {
        b.textContent = "";
    });
}