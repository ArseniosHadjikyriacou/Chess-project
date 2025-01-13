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

const boardCoordinates = function () {
  document.querySelector('.js-sqr-a1').innerHTML = `<div class="text-a1">a</div>`;
  document.querySelector('.js-sqr-b1').innerHTML = `<div class="text-b1">b</div>`;
  document.querySelector('.js-sqr-c1').innerHTML = `<div class="text-c1">c</div>`;
  document.querySelector('.js-sqr-d1').innerHTML = `<div class="text-d1">d</div>`;
  document.querySelector('.js-sqr-e1').innerHTML = `<div class="text-e1">e</div>`;
  document.querySelector('.js-sqr-f1').innerHTML = `<div class="text-f1">f</div>`;
  document.querySelector('.js-sqr-g1').innerHTML = `<div class="text-g1">g</div>`;
  document.querySelector('.js-sqr-h1').innerHTML = `<div class="text-h1">h</div>`;
  document.querySelector('.js-sqr-h1').innerHTML += ` <div class="text-h1n">1</div>`;

  document.querySelector('.js-sqr-h2').innerHTML = `<p class="text-h2">2</p>`;
  document.querySelector('.js-sqr-h3').innerHTML = `<p class="text-h3">3</p>`;
  document.querySelector('.js-sqr-h4').innerHTML = `<p class="text-h4">4</p>`;
  document.querySelector('.js-sqr-h5').innerHTML = `<p class="text-h5">5</p>`;
  document.querySelector('.js-sqr-h6').innerHTML = `<p class="text-h6">6</p>`;
  document.querySelector('.js-sqr-h7').innerHTML = `<p class="text-h7">7</p>`;
  document.querySelector('.js-sqr-h8').innerHTML = `<p class="text-h8">8</p>`;
}

const clearBoard = function () {
  let imgIndex = 0;

  // remove current piece images and piece click functions
  pieces.forEach( piece => {
    if (piece.positions[num]) {
      const sqrElement = document.querySelector('.js-sqr'+piece.positions[num]);
      sqrElement.innerHTML = '';
      sqrElement.removeEventListener('click',piece.clickOnPiece);
    }
  }
  );

  boardCoordinates();

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
      if (piece.positions[num]) {
        piece.placePiece();
        board[Number(piece.positions[num][1])][Number(piece.positions[num][0])] = piece.type;
      }
    }

  }
  );

  return board;

}