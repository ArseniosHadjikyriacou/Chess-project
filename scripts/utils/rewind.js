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

const clearBoard = function () {
  // remove current piece images
  piecesArray.forEach( piece => {
    const x = Number(piece.positions[moveNum][0]);
    const y =Number(piece.positions[moveNum][1]);
    if (document.querySelector('.js-piece-'+piece.id)) {
      document.querySelector('.js-piece-'+piece.id).remove();
    }
  }
  );

  // remove highlighted squares
  if (coloredSqrs.length) {
    const sqrElementOld = document.querySelector('.js-sqr-'+coloredSqrs[0]);
    sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
    
    coloredSqrs[1].forEach( xy => {
    const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
    sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
    sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
    }
    );

    coloredSqrs = [];
  }

}

const minusMove = function () {
  if (moveNum) {

    changeColor();
    clearBoard();

    moveNum -= 1;
    boardState = Pieces.updateBoardState();
    
  }
}

const plusMove = function () {
  if (moveNum+1 < piecesArray[0].positions.length) {

    clearBoard();
    changeColor();

    moveNum += 1;
    boardState = Pieces.updateBoardState(piecesArray);
    
  }
}