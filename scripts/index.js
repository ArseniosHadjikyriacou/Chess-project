/* Global variables */
let moveColor;   // color to move
let moveNum;     // move number
let newQueens;   // number of new queens
let piecesArray; // stores created piece objects
let boardState;  // 8x8 array to store the state of the board

/* const wP1 = new Pawn("wP1",["06"]);
const wP2 = new Pawn("wP2",["16"]);
const wP3 = new Pawn("wP3",["26"]);
const wP4 = new Pawn("wP4",["36"]);
const wP5 = new Pawn("wP5",["46"]);
const wP6 = new Pawn("wP6",["56"]);
const wP7 = new Pawn("wP7",["66"]);
const wP8 = new Pawn("wP8",["76"]);
const wR1 = new Rook("wR1",["07"]);
const wR2 = new Rook("wR2",["77"]);
const wN1 = new Knight("wN1",["17"]);
const wN2 = new Knight("wN2",["67"]);
const wB1 = new Bishop("wB1",["27"]);
const wB2 = new Bishop("wB2",["57"]);
const wQ = new Queen("wQ",["37"]);
const wK = new King("wK",["47"])

const bP1 = new Pawn("bP1",["01"]);
const bP2 = new Pawn("bP2",["11"]);
const bP3 = new Pawn("bP3",["21"]);
const bP4 = new Pawn("bP4",["31"]);
const bP5 = new Pawn("bP5",["41"]);
const bP6 = new Pawn("bP6",["51"]);
const bP7 = new Pawn("bP7",["61"]);
const bP8 = new Pawn("bP8",["71"]);
const bR1 = new Rook("bR1",["00"]);
const bR2 = new Rook("bR2",["70"]);
const bN1 = new Knight("bN1",["10"]);
const bN2 = new Knight("bN2",["60"]);
const bB1 = new Bishop("bB1",["20"]);
const bB2 = new Bishop("bB2",["50"]);
const bQ = new Queen("bQ",["30"]);
const bK = new King("bK",["40"]); */

/* 
coloredSqrs contains three elements:
1) the position of the last piece that was clicked, 
2) an array of the legal moves of that piece and
3) the clickToMove function of the last piece that was clicked
*/
let coloredSqrs;
/* -------------------------------------------------------------------- */
coloredSqrs = [];


/* Add event listeners to backward, forward and reset buttons */
document.querySelector('.js-backward').addEventListener('click',clickMinusMove);
document.querySelector('.js-forward').addEventListener('click',clickPlusMove);
document.querySelector('.js-reset').addEventListener('click',clickReset);
/* -------------------------------------------------------------------- */


/* Handle transition from analysis board to engine backend and vice-versa */
const buttonAnalysis = document.getElementById("radio-analysis")
const buttonComputer = document.getElementById("radio-computer")
/* -------------------------------------------------------------------- */


/* Create starting piece objects */
if (JSON.parse(localStorage.getItem('moveNumber'))) {

  Pieces.getFromLocalStorage();
  if (moveColor === 'b') {
    moveColor = 'w';
    changeColor();
    moveColor = 'b';
  }

} else {

  piecesArray = [ 

    new Pawn("wP1",["06"]),new Pawn("wP2",["16"]),new Pawn("wP3",["26"]),new Pawn("wP4",["36"]),
    new Pawn("wP5",["46"]),new Pawn("wP6",["56"]),new Pawn("wP7",["66"]),new Pawn("wP8",["76"]),
    new Rook("wR1",["07"]),new Rook("wR2",["77"]),
    new Knight("wN1",["17"]),new Knight("wN2",["67"]),
    new Bishop("wB1",["27"]),new Bishop("wB2",["57"]),
    new Queen("wQ",["37"]),new King("wK",["47"]),

    new Pawn("bP1",["01"]),new Pawn("bP2",["11"]),new Pawn("bP3",["21"]),new Pawn("bP4",["31"]),
    new Pawn("bP5",["41"]),new Pawn("bP6",["51"]),new Pawn("bP7",["61"]),new Pawn("bP8",["71"]),
    new Rook("bR1",["00"]),new Rook("bR2",["70"]),
    new Knight("bN1",["10"]),new Knight("bN2",["60"]),
    new Bishop("bB1",["20"]),new Bishop("bB2",["50"]),
    new Queen("bQ",["30"]),new King("bK",["40"])

  ];

  moveNum = 0;
  newQueens = 0;
  moveColor = 'w';

}
/* -------------------------------------------------------------------- */


// generate boardState array and place svg images on the html board  
boardState = Pieces.updateBoardState();


/* document.querySelector(".select-radio-container").addEventListener('change',() => {
  
}); */


/* console.log("Hello, world!");
console.log(buttonAnalysis.checked);
console.log(buttonComputer.checked);
if (buttonComputer.checked) {
  buttonAnalysis.checked = true;
  buttonComputer.checked = false;
}
console.log(buttonAnalysis.checked);
console.log(buttonComputer.checked); */