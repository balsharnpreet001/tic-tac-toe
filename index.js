console.log("welcome to tic tac toe")

let audioTurn = new Audio("ting.sound.mp3")
let gameover = new Audio("game.over.mp3")
let draw = new Audio("draw.mp3")
let turn = "X"
let gameOver = false;

const changeTurn = ()=>{
    return turn === "X"?"O":"X";
}

const checkWin = ()=>{

    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ]
    wins.forEach(e => {
        if(
            boxtext[e[0]].innerText === boxtext[e[1]].innerText && 
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !=="" 
       ){ 
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won🥳"
            
            gameOver = true; 
            draw.play();

            setTimeout(()=>{
                reset();
            }, 3000);

            document.querySelector(".line").style.transform = `translate(${e[3]}vw , ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    });

}

let boxes = document.getElementsByClassName("box");
let filled = 0;
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener("click" ,()=>{
        if(boxtext.innerText === '' && !gameOver){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.currentTime = 0;
            audioTurn.play();
            checkWin();
            filled++;

        if(!gameOver){
            document.querySelector(".info").innerText = "Turn for " + turn;
        }

        if(filled===9 && !gameOver){
            document.querySelector(".info").innerText = "Game draw !";
            gameover.play();

            setTimeout(()=>{
                reset();
            } , 2000);

        }

        }
    })
})
function reset(){
    let boxtext = document.querySelectorAll(".boxtext")
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameOver = false;
    filled = 0;
    document.querySelector(".line").style.width = "0vw";
    if(!gameOver){
        document.querySelector(".info").innerText = "Turn for " + turn;
    }
}

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click",()=>{
    reset();
});
