const changeColor = function () {
  if (moveColor === "w") {
    moveColor = "b";
    document.querySelector('.js-moveColor-reminder').innerHTML = 'Black to move';
    document.querySelector('.js-moveColor-reminder').classList.remove('moveColor-reminder-w');
    document.querySelector('.js-moveColor-reminder').classList.add('moveColor-reminder-b');
  } else {
    moveColor = "w";
    document.querySelector('.js-moveColor-reminder').innerHTML = 'White to move';
    document.querySelector('.js-moveColor-reminder').classList.remove('moveColor-reminder-b');
    document.querySelector('.js-moveColor-reminder').classList.add('moveColor-reminder-w');
  }
}

const clickToMove = function (event,piece) {

  let flag = 0;
  if (piece.positions.length > moveNum+1) {
    flag = 1;
    piecesArray.forEach(p => {
      p.positions = p.positions.slice(0, -(p.positions.length-moveNum-1));
    });
  }

  if (flag) {
    // moved back and decided to move a piece...!
    // change piece parameters!!!
    let promIndex = 0;

    piecesArray.forEach((p,index) => {
      if (p.moved[1] >= moveNum) {
        p.moved = [0,0];
      }
      if (p.captured[1] >= moveNum) {
        p.captured = [0,0];
      }
      if (p.id[1] === 'P') {
        if (p.doublePush[1] >= moveNum) {
          p.doublePush = [0,0];
        }
      }
      if (p.id[1] === 'Q' && p.created > 0 && p.created >= moveNum) {
        promIndex = index;
      }
    });

    if (promIndex) {
      piecesArray.splice(promIndex, 1);
    }

  }

  // reverse square coloring and remove event listeners from colored squares
  const sqrElementOld = document.querySelector('.js-sqr-'+coloredSqrs[0]);
  sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
  coloredSqrs[1].forEach( xy => {
    const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
    sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
    sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
  });
  coloredSqrs = [];
  
  // push updated positions in all pieces
  piece.movePiece(piece.positions.at(-1),event.currentTarget.dataset.sqrPosition);
}

const clickMinusMove = function () {
  if (moveNum) {

    changeColor();
    Pieces.clearBoard();

    moveNum -= 1;
    boardState = Pieces.updateBoardState();
    
  }
}

const clickPlusMove = function () {
  if (moveNum+1 < piecesArray[0].positions.length) {

    changeColor();
    Pieces.clearBoard();

    moveNum += 1;
    boardState = Pieces.updateBoardState();
    
  }
}

const clickReset = function () {
  moveColor = 'b';
  changeColor();
  moveColor = 'w';
  Pieces.clearBoard();

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

  boardState = Pieces.updateBoardState();
}