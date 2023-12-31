const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-winning-message-button]");

let isCircleTurn;

const winningCombination = [
    // horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn){
        board.classList.add('circle');
    }
    else {
        board.classList.add('x');
    }
}

const startGame = () => {
    for(const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }

    isCircleTurn = false;

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) => {
    if(isDraw){
        winningMessageTextElement.innerText = "Draw";
    }
    else {
        winningMessageTextElement.innerText = isCircleTurn 
            ? "Circle Won"
            : "X Won";
    }

    setBoardHoverClass();
    winningMessage.classList.add("show-winning-message");
}

const checkForWin = (currentPlayer) => {
    return winningCombination.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    // put X or O

    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // verify winning
    // verify draw

    const isDraw = checkForDraw();
    const isWin = checkForWin(classToAdd);

    if(isWin){
        endGame(false);
    }
    else if(isDraw) {
        endGame(true);
    }
    else {
        // change next player
        swapTurns();
    }
}

for(const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true});
}

startGame();

restartButton.addEventListener("click", startGame);