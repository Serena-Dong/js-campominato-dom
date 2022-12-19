//Recupero gli elementi
const pagina = document.getElementById('game');
const form = document.getElementById('form');
const startText = document.getElementById('click');
const btn =  document.getElementById("btn-play");


// * FUNZIONI *//
//Generatore di gliglia
const createGrid = () => {
    const grid = document.createElement('div')
    grid.setAttribute('id','grid')
    return grid
}

//Generatore di celle
const createCell = (content) => {
    const cell = document.createElement('div');
    cell.append(content);
    cell.classList.add('cell');
    return cell;
}

//Creo la gliglia premendo il bottone play
form.addEventListener('submit', function(event){
    event.preventDefault()

    //Disattivo il buttone
    btn.disabled = true;
    
    //Rimuovo il testo
    startText.remove()
    
    //Parametri per la griglia
    const rows = 10;
    const cols = 10;
    const totalCells = rows * cols;

    for (let i = 0; i < 1; i++){

        //Creo una griglia
        const grid = createGrid(i);

        //Appendo in pagina
        pagina.appendChild(grid);
    }

    
    for (let i = 0; i < totalCells; i++){
        
        //Creo una cella
        const cell = createCell (i + 1);

        //Aggiungo event listener per il click
        cell.addEventListener('click', function() {
            cell.classList.toggle('clicked');
            console.log(i + 1);
        });

        //Appendo in pagina
        grid.appendChild(cell);

    }
})
