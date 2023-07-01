let directions={x:0, y:0};
const foodSound=new Audio('./music/food.mp3');
const gameOverSound=new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/music.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[{x: 13, y:15}];
food={x:6, y: 7};



function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function iscollide(snake){
    // if snake touch body{
        for(let i=1; i<snakeArr.length; i++){
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        // if touches wall
        if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0){
            return true;
        }
    
    return false;
}


function gameEngine(){
    //updating snake array 
    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y: 0};
        alert("Game Over! Score: "+ score);
        alert("press any key to start the game again");
        score=0;
        scoreBox.innerHTML="Score: "+score;
        snakeArr=[{x: 13, y: 15}];
        musicSound.play();
    }

    //if food is eaten
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscoreval", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Hi Score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y});//adds element to beginning of the array
        let a=2;
        let b=18;
        food={x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())};
    }

    //Moving the snake
    for (let i = snakeArr.length -2 ; i >=0; i--) {
        // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};//new object snake[i]
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;





    //display snake
    board.innerHTML= "";//clearing board
    snakeArr.forEach((e, index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })

    //display food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hi Score: "+hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    //input dir==velocity
    inputDir={x:13, y:15};//game starts
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("arrow up");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            // console.log("arrow down");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            // console.log("arrow left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
            // console.log("arrow right");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});