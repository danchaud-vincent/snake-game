// init
const width = 625;

// document query
const gridEl = document.querySelector(".grid")


CreateGrid()

/* ----- Functions ------ */

function CreateGrid(){
    /*
     * Function which create a grid
     */
    for (let i=0; i<width; i++){
        const box = document.createElement('div')
        box.classList.add('box')
        gridEl.appendChild(box)
    }
}
