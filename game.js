let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let newGameBtn = document.querySelector(".newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true //player X, playerY

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO===true){
            box.innerText="O";
            turnO = false;
        } else {
            box.innerText="X";
            box.style.color = "#323031";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })
});
const enableBtns = () => {    // for new game btn 
    for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    box.style.color = "";
   }
};
const disableBtns = () => {
    for(let box of boxes){
    box.disabled = true;
   }
};
const showWinner = (winner) => {
    msg.innerText = `Congrats ! \nWinner is ${winner}` ;
    msg.style.fontFamily = "Snap ITC";
    msg.style.fontSize = "2rem";
    msgContainer.classList.remove("hide");
    disableBtns();
}

const showDraw = () => {
    msg.innerText = "It's a Draw !";
    msg.style.fontFamily = "Snap ITC";
    msg.style.fontSize = "2rem";
    msgContainer.classList.remove("hide");
    disableBtns();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Stop checking further patterns
        }
    }

    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
       showDraw();
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

