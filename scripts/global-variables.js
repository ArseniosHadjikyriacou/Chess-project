let turn = "w";
let num = 0; // turn number
let pieces = []; // hold created piece objects
let boardState = Array(8).fill().map(() => Array(8).fill(0));

/* 
coloredSqrs contains three elements:
1) the position of the last piece that was clicked, 
2) an array of the legal moves of that piece and
3) the clickToMove function of the last piece that was clicked
*/
let coloredSqrs = [];


const pieceAtPosition = function (x,y) {

  let ind = -1;

  pieces.forEach((piece,index) => {
    if (piece.positions[num] == (String(x)+String(y)) && (!piece.wasCaptured[0] || piece.wasCaptured[1] >= num)) {
      ind = index;
    }
  }
  );

  if (ind == -1) {
    return 0;
  } else {
    return pieces[ind];
  }

}

const updatePiecePositions = function () {

  pieces.forEach(piece => {

    if (piece.positions.length <= num+1) {
      piece.positions.push(piece.positions.at(-1));
    }
  }
  );

}

const changeColor = function () {
  if (turn === "w") {
    turn = "b";
    document.querySelector('.js-turn-reminder').innerHTML = 'Black to move';
    document.querySelector('.js-turn-reminder').classList.remove('turn-reminder-w');
    document.querySelector('.js-turn-reminder').classList.add('turn-reminder-b');
  } else {
    turn = "w";
    document.querySelector('.js-turn-reminder').innerHTML = 'White to move';
    document.querySelector('.js-turn-reminder').classList.remove('turn-reminder-b');
    document.querySelector('.js-turn-reminder').classList.add('turn-reminder-w');
  }
}

const clearBoard = function () {
  let imgIndex = 0;

  // remove current piece images and piece click functions
  pieces.forEach( piece => {
    if (piece.positions[num]) {
      const sqrElement = document.querySelector('.js-sqr'+piece.positions[num]);
      imgIndex = sqrElement.innerHTML.indexOf('<img');
      sqrElement.innerHTML = sqrElement.innerHTML.slice(0,imgIndex) + sqrElement.innerHTML.slice(imgIndex+44);
      sqrElement.removeEventListener('click',piece.clickOnPiece);
    }
  }
  );

  // remove highlighted squares
  if (coloredSqrs.length) {
    const sqrElementOld = document.querySelector('.js-sqr'+coloredSqrs[0]);
    sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
    
    coloredSqrs[1].forEach( xy => {
    const sqrElementLegal = document.querySelector('.js-sqr'+xy);
    sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
    sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
    }
    );

    coloredSqrs = [];
  }

}

const updateBoardState = function () {

  let board = Array(8).fill().map(() => Array(8).fill(0));

  pieces.forEach( piece => {

    if (!piece.wasCaptured[0] || piece.wasCaptured[1] >= num) {
      piece.placePiece();
      board[Number(piece.positions[num][1])][Number(piece.positions[num][0])] = piece.type;
    }

  }
  );

  return board;

}