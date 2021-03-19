const siteWrap = document.getElementById('site-wrap');
const gridContainer = document.getElementById('grid-container');
let gridCells = document.querySelectorAll('.grid-cell');
let numberOfCells = 16;

const userButton = document.createElement('button');
userButton.textContent = 'Reset';
siteWrap.insertBefore(userButton, gridContainer);

buildGrid();

userButton.addEventListener('click', resetGrid);

function resetGrid() {
    gridCells.forEach(function(node) {
        node.remove();
    });
    askUser();
    buildGrid();
}

function changeCellColour(e) {
    e.target.classList.add('cell-colour');
}

function buildGrid() {
    for (let i = 0; i < numberOfCells; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'grid-cell');
        gridContainer.appendChild(div);
    }
    gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(function(node) {
        node.addEventListener('mouseover', changeCellColour);
    });
}

function askUser() {
    numberOfCells = prompt('How many cells per side?', '');
}

