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
//Generatore di numeri casuali
const randomNumberGenerator = (min, max, blacklist) => {

    let randomNumber;

    do{
       randomNumber = Math.floor(Math.random() * (max + 1 - min) + min);
    } while (blacklist.includes(randomNumber));

    return randomNumber;
}


for (i = 0; i <= 16; i++){
    console.log(randomNumberGenerator(1,100, ''));
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


    let numbersClicked = [];

    for (let i = 0; i < totalCells; i++){
        
        //Creo una cella
        const cell = createCell (i + 1);
        
        //Aggiungo event listener per il click
        cell.addEventListener('click', function() {
            cell.classList.add('clicked');
            
            numbersClicked.push( i + 1);
            console.log(numbersClicked.length);
        });

    //Appendo in pagina
    grid.appendChild(cell);

    }
})
/* # MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)

# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
*/