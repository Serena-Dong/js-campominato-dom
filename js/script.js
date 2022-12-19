//Recupero gli elementi
const pagina = document.getElementById('game');
const form = document.getElementById('form');
const startText = document.getElementById('click');
const btn =  document.getElementById("btn-play");

//* VARIABILI //

let numbersClicked = [];
const bomb = [];
console.log(bomb);


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
const randomNumberGenerator = (min, max, blackList) => {
    let randomNumber;
    do{
       randomNumber = Math.floor(Math.random() * (max + 1 - min) + min);
    } while (blackList.includes(randomNumber));

    return randomNumber;
}


//Creo la gliglia premendo il bottone play
form.addEventListener('submit', function(event){
    event.preventDefault()

    //Disattivo il buttone
    btn.disabled = true;
    
    //Rimuovo il testo
    startText.remove()
    
    // * GRIGLIA
    const rows = 10;
    const cols = 10;
    const totalCells = rows * cols;

    for (let i = 0; i < 1; i++){

        //Creo una griglia
        const grid = createGrid(i);

        //Appendo in pagina
        pagina.appendChild(grid);
    }

    //Numeri delle bombe
    const bombDoubles = [];
    for (i = 1; i <= 16; i++){

        const bombNumbers = randomNumberGenerator(1, totalCells, bombDoubles);
        bombDoubles.push(bombNumbers);
        bomb.push(bombNumbers);
    }

    
    // * CELLE

    //Contenitore per i doppi
    const doubles = [];

    for (let i = 1; i <= totalCells; i++){
        
        //Creo una cella
        const cellNumbers = randomNumberGenerator(1, totalCells, doubles);

        doubles.push(cellNumbers);

        const cell = createCell (cellNumbers);
        
        //Aggiungo event listener per il click
        cell.addEventListener('click', function() {

            //Inserisco il numero cliccato nell'array dei numeri cliccati
            numbersClicked.push(cellNumbers);

            //Conteggio punteggio
            console.log(numbersClicked.length);

            //Rivelazione del numero al click
            //cell.append(cellNumbers);

            // * CHECK
            
            //isABomb = false;

            for (i = 0; i < bomb.length; i++){
                const bombNumbers = bomb[i];
                console.log(bombNumbers, numbersClicked);

                if (numbersClicked !== bombNumbers){
                    cell.classList.add('neutral');
                } else{
                    cell.classList.add('bomb');
                }
            }

            /*
            if (isABomb = true){
                cell.classList.add('bomb');
            } else {
                cell.classList.add('neutral');
            }
            */
             
            
        }, {once : true});

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