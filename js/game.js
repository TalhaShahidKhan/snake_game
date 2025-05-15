let inputDir = {x:0,y:0}
const dieSound = new Audio('../assets/audios/die.mp3')
const eatSound = new Audio('../assets/audios/eat.mp3')
const themeSound = new Audio('../assets/audios/theme.mp3')
let lastPaintTime = 0;
let speed = 9
let score = 0
// let board = document.getElementById('board')
// console.log(board)



let snakeArr = [
    { x: 10, y: 10 }
]

let food = { x: 20, y: 20 }

function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime
    gameEngine()
}



function isCollide(snake){
    for (let i =1; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if ((snake[0].x>=30 || snake[0].x <=0) && (snake[0].y >= 30 || snake[0].y <= 0)){
        return true;
    }
}

function gameEngine() {
    // Part 1 : Updating the snake array and food
    if (isCollide(snakeArr)){
        dieSound.play()
        themeSound.pause()
        inputDir = {x:0,y:0}
        alert("Game Over.")
        snakeArr=[{ x: 10, y: 10 }];
        score = 0
        window.location.href = window.location.origin

    }


    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 25;
        food.x = Math.round(a+(b-a)*Math.random())
        food.y = Math.round(a+(b-a)*Math.random())
    }

    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y


    // Part 2 : Display the snake and food 
    // Displaying the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head'); 
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Displaying the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild((foodElement))



}



window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:0}
    themeSound.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})