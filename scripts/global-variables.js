let turn = "w"

let boardState = Array(8).fill().map(() => Array(8).fill('0'));
let pieceObjects = Array(8).fill().map(() => Array(8).fill('0'));
let clickOnPieceFuns = Array(8).fill().map(() => Array(8).fill('0'));

/* 
coloredSqrs contains three elements:
1) the position of the last piece that was clicked, 
2) an array of the legal moves of that piece and
3) the clickToMove function of the last piece that was clicked
*/
let coloredSqrs = [];