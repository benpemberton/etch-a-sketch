const siteWrap = document.getElementById('site-wrap');
const gridContainer = document.getElementById('grid-container');
let gridCells = () => document.querySelectorAll('.grid-cell');
let cellsSquareRoot = 4;
const totalCells = () => cellsSquareRoot ** 2;
let root = document.documentElement;
root.style.setProperty('--user-grid-num', cellsSquareRoot);
const userButton = document.createElement('button');
userButton.textContent = 'Reset';
siteWrap.insertBefore(userButton, gridContainer);

buildGrid();

userButton.addEventListener('click', resetGrid);

function resetGrid() {
    gridCells().forEach(function(node) {
        node.remove();
    });
    askUser();
    buildGrid();
}

function changeCellColour(e) {
    let cellColour = getComputedStyle(e.target).backgroundColor;
    if (cellColour === 'rgba(0, 0, 0, 0)') {
        let newCellColour = random_rgb();
        e.target.style.backgroundColor = newCellColour;
        e.target.setAttribute('data-colour', newCellColour);
    } else {
        let colourArray = cellColour.slice(4, -1).split(',').map(item => item.trim());
        let r = colourArray[0];
        let g = colourArray[1];
        let b = colourArray[2];
        let dataColour = e.target.getAttribute('data-colour');
        let dataColourArray = dataColour.slice(4, -1).split(',').map(item => item.trim());
        let datar = dataColourArray[0];
        let datag = dataColourArray[1];
        let datab = dataColourArray[2];
        let subCellColour = 'rgb(' + (r - (Math.round(datar / 10))) + ', '
        + (g - (Math.round(datag / 10))) + ', ' + (b - (Math.round(datab / 10)))
        + ')';
        e.target.style.backgroundColor = subCellColour;
        console.log(this);
    }
}

function random_rgb() {
    let o = Math.round;
    let r = Math.random;
    let s = 255;
    return 'rgb(' + o(r()*s) + ', ' + o(r()*s) + ', ' + o(r()*s) + ')';
}

function buildGrid() {
    for (let i = 0; i < totalCells(); i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'grid-cell');
        gridContainer.appendChild(div);
    }
    gridCells().forEach(function(node) {
        node.addEventListener('mouseover', changeCellColour);
    });
}

function askUser() {
    cellsSquareRoot = prompt('How many cells per side?', '');
    if (cellsSquareRoot > 64) {
        askUser();
    }
    root.style.setProperty('--user-grid-num', cellsSquareRoot);
}

