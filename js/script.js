//Recupero gli elementi
const pagina = document.getElementById('grid');
const form = document.getElementById('form');
const startText = document.getElementById('click');
const btn =  document.getElementById("btn-play");
const score =  document.getElementById("score");


const levelSelect = document.getElementById('select-level');

//* VARIABILI //

let numbersClicked = [];
let bomb = [];
console.log(bomb);

// * FUNZIONI *//

//Generatore di celle
const createCell = (number) => {
    const cell = document.createElement('div');
    //cell.append(content);
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

    //Cambiamo il testo del bottone
    btn.innerText = 'Ricomincia';

    //Svuotiamo la griglia
    grid.innerHTML = '';
    bomb = [];
    numbersClicked = [];
    result.innerText = '';
    score.innerText = '';
    
    //Rimuovo il testo
    startText.remove()
    
    
    //Recupero il valore del livello
    const level = levelSelect.value;

    //Aggiungo la classe livello nella grid
    grid.classList.add(level)

    //Calcolo le COLS e ROWS
    let cols;
    let rows;

    switch (level){
        case 'easy':
            default:
            cols = rows = 10;
            break;
        case 'normal':
            cols = rows = 9;
            break;
        case 'hard':
            cols = rows = 7;
            break;
    }

    const totalCells = cols * rows;

    //Numeri delle bombe
    const bombDoubles = [];
    for (i = 1; i <= 16; i++){

        const bombNumbers = randomNumberGenerator(1, totalCells, bombDoubles);
        bombDoubles.push(bombNumbers);
        bomb.push(bombNumbers);
    }
    
    //PUNTEGGIO MAX
    const maxScore = totalCells - 16;
    console.log(maxScore);


    // * CELLE
    
    for (let i = 0; i < totalCells; i++){
        
        //Creo una cella
        const cellNumbers = (i + 1);
        const cell = createCell (cellNumbers);
        
        //Numeri dei normali
        const neutralNumbers = [i + 1];
        for ( let i = 0; i < cellNumbers.length; i++){
            if (bomb.includes(neutralNumbers)){
                neutralNumbers.shift(bomb)
                console.log(neutralNumbers)
            }
        }

        //Aggiungo event listener per il click
        cell.addEventListener('click', function() {
            
            //Inserisco il numero cliccato nell'array dei numeri cliccati
            numbersClicked.push(cellNumbers);

            //Conteggio punteggio
            let points = numbersClicked.length
            score.innerText = `Score: ${points}`;

            //Rivelazione del numero al click
            cell.append(cellNumbers);

            // * CHECK
        
            for (i = 0; i < bomb.length; i++){
                let bombNumbers = bomb[i];
                console.log(bombNumbers, numbersClicked);

                if ( numbersClicked.includes(bombNumbers) ){
                    cell.classList.add('bomb');   
                    result.innerText = `Hai Perso! Partita Terminata. 
                    
                    Punteggio: ${points}`;

                } else {
                    cell.classList.add('neutral');
                }

                if (numbersClicked.length == maxScore){
                    result.innerText = `Hai Vinto! Partita Terminata.`;
                    
                }
            }



        }, {once : true});

        //Appendo in pagina
        pagina.appendChild(cell);

    }
    

})
/* # MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter pi?? cliccare la stessa cella.

# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella ?? presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
Quando l'utente clicca su una cella, e questa non ?? una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perch?? in quel caso la partita termina. Raccogliamo quindi il messaggio ?? scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)

# MILESTONE 5
Quando la partita termina dobbiamo capire se ?? terminata perch?? ?? stata cliccata una bomba o se perch?? l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
*/