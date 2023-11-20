const cellElements = document.querySelectorAll('[data-cell]');

for(const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true});
}

const handleClick = () => {
    // put X or O

    // verify winning

    // verify draw

    // change next player
}