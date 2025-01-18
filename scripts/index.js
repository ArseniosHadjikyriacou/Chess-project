/* Global variables */
let moveColor;   // color to move
let moveNum;     // move number
let newQueens;   // number of new queens
let piecesArray; // stores created piece objects
let boardState;  // 8x8 array to store the state of the board

/* 
coloredSqrs contains three elements:
1) the position of the last piece that was clicked, 
2) an array of the legal moves of that piece and
3) the clickToMove function of the last piece that was clicked
*/
let coloredSqrs;
/* -------------------------------------------------------------------- */
coloredSqrs = [];


/* Add event listeners to backward and forward buttons */
document.querySelector('.js-backward').addEventListener('click',clickMinusMove);
document.querySelector('.js-forward').addEventListener('click',clickPlusMove);
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