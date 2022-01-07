/* ----- variables ------ */
// init
const long = 625;
const width = 25;
let lifes = ["❤️","❤️","❤️"]
let snake = [2,1,0]
let squares = []
let direction = 1
let indexApple = 0

// document query
const gridEl = document.querySelector(".grid")
const scoreEl = document.getElementById("score")
const lifeEl = document.getElementById("life")

/* ----- Grid and snake initialisation ------ */
CreateGrid()
Generate_Apple()
snake.forEach(index => squares[index].classList.add("snake"))
let timerId = setInterval(move,150)
document.addEventListener('keydown',control)

/* ----- Functions ------ */

function CreateGrid(){
    /*
     * Function which create a grid
     */
    for (let i=0; i<long; i++){
        // create square 
        const box = document.createElement('div')
        const span = document.createElement('span')
        box.classList.add('box')
        gridEl.appendChild(box)
        box.appendChild(span)

        
        // add squares in array
        squares.push(box)
    }
}

function move(){
    /*
     * move the snake with the board
     */

    if ((snake[0] - width < 0 && direction === -25) ||
        (snake[0] + width > long && direction === 25) ||  
        (snake[0] % 25 === 0 && direction === -1) ||
        (snake[0] % 25 === 24 && direction === 1) ){
        return clearInterval(timerId)
    }

   

    const lastEl = snake.pop()
    const newEl = snake[0] + direction

    // update snake array
    snake.unshift(newEl)

    // remove and add 'snake'
    squares[lastEl].classList.remove('snake')
    squares[snake[0]].classList.add('snake')

    // snake eats the apple
    if (snake[0] === indexApple){
        console.log("Pomme mangée")

        // delete the apple
        squares[indexApple].innerHTML = ""

        // add snake class
        snake.push(lastEl)
        
        // generate a new apple
        Generate_Apple()
    }

}


function control(event){
    /*
     * change the direction of the snake with the keyboard
     */ 

    if (event.key === "ArrowUp"){
        direction = -25
    }
    else if (event.key === "ArrowDown"){
        direction = 25
    }
    else if (event.key === "ArrowRight"){
        direction = 1
    }
    else if (event.key === "ArrowLeft"){
        direction = -1
    }
}

function Generate_Apple(){
    /*
     * Generate in the grid an apple "🍎"
     */
    indexApple = Math.floor(Math.random() * long)
    const pomme = "🍎"

    squares[indexApple].innerHTML =  `<span>${pomme}</span>`
}