/* ----- variables ------ */
// init
const long = 625;
const width = 25;
let bestScore = []
let snake = [2,1,0]
let squares = []
let direction = 1
let indexApple = 0
let score = 0
let speed = 300
let timerId = 0


// document query
const gameEl = document.getElementById('game')
const menuEl = document.getElementById("start")
const gridEl = document.querySelector(".grid")
const scoreEl = document.getElementById("score")
const lifeEl = document.getElementById("life")
const playBtn = document.getElementById("play")
const easyBtn = document.getElementById("easy")
const mediumBtn = document.getElementById("medium")
const hardBtn = document.getElementById("hard")
const levelEl = document.getElementById("level-chosen")
const endMessage = document.getElementById("end")
const bestScoreMessage = document.getElementById("bestscore")
const bestScoreEl = document.getElementById("result")

// level by default
levelEl.innerHTML = "Easy"

/* ------------------------------------------ */
/* ----- Grid and snake initialisation ------ */
/* ------------------------------------------ */
easyBtn.addEventListener("click",function(){
    // set speed
    speed = 300

    // change classList
    mediumBtn.classList.remove("active")
    hardBtn.classList.remove("active")
    easyBtn.classList.add("active")
    
    // display level
    levelEl.innerHTML = "Easy"
})

mediumBtn.addEventListener("click",function(){
    // set speed
    speed = 200

    // change classList
    easyBtn.classList.remove("active")
    hardBtn.classList.remove("active")
    mediumBtn.classList.add("active")

    // display level
    levelEl.innerHTML = "Medium"
})

hardBtn.addEventListener("click",function(){
    // set speed
    speed = 100

    // change classList
    mediumBtn.classList.remove("active")
    easyBtn.classList.remove("active")
    hardBtn.classList.add("active")

    // display level
    levelEl.innerHTML = "Hard"
})


// Start the game
playBtn.addEventListener("click",set_game)


// End the game
endMessage.addEventListener("click",reset)
  

/* ----------------------------------- */
/* ------------ Functions ----------- */
/* ----------------------------------- */
function set_game(){
     /** 
     * Reset the game
     */

    // Display the game
    menuEl.style.display = "none";
    gameEl.style.display = "block";

    CreateGrid()
    Generate_Apple()
    snake.forEach(index => squares[index].classList.add("snake"))
    timerId = setInterval(move,speed)
    document.addEventListener('keydown',control)
}

function reset(){
    /** 
     * reset the variables and the game
     * 
     */

    // add score to bestScore
    bestScore.push(score)

    // stop interval
    clearInterval(timerId)
    
    // reset variables
    snake = [2,1,0]
    direction = 1
    score = 0
    speed = 300
    timerId = 0

    // remove classlist
    endMessage.style.display = "none";
    gridEl.classList.remove("inactive")
    squares.forEach(elem => elem.classList.remove("snake"))

    // reset score and remove appl
    squares[indexApple].innerHTML = ""
    scoreEl.innerHTML = "-"
    
    // reset level button
    mediumBtn.classList.remove("active")
    hardBtn.classList.remove("active")
    easyBtn.classList.add("active")
    levelEl.innerHTML = "Easy"

    // Display the menu
    gameEl.style.display = "none"
    menuEl.style.display = "block"

    // display bestscore
    bestScoreMessage.style.display = "block"
    bestScoreEl.innerHTML = Math.max.apply(null,bestScore)
    
}

function CreateGrid(){
    /** 
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
    /** 
     * move the snake with the board 
     * End the game when the snake hits a border
     */

    if ((snake[0] - width < 0 && direction === -25) ||
        (snake[0] + width > long && direction === 25) ||  
        (snake[0] % 25 === 0 && direction === -1) ||
        (snake[0] % 25 === 24 && direction === 1) ||
        (squares[snake[0] + direction].classList.contains('snake')) ){

        // Display Game Over message
        gridEl.classList.add("inactive")
        endMessage.style.display = "block";


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
        // delete the apple
        squares[indexApple].innerHTML = ""

        // add snake class
        snake.push(lastEl)
        
        // generate a new apple
        Generate_Apple()

        // display score
        score += 1
        scoreEl.textContent = score

        // change speed
        clearInterval(timerId)
        speed = speed * 0.9
        timerId = setInterval(move,speed)

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

    squares[indexApple].innerHTML =  `<span class="apple">${pomme}</span>`
}