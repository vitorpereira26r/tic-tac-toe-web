const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');

let isCircleTurn;

const startGame = () => {
    for(const cell of cellElements){
        cell.addEventListener("click", handleClick, {once: true});
    }

    isCircleTurn = false;

    board.classList.add('x');
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn){
        board.classList.add('circle');
    }
    else {
        board.classList.add('x');
    }
}

const handleClick = (e) => {
    // put X or O
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // verify winning

    // verify draw

    // change next player
    swapTurns();
}

for(const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true});
}

startGame();
