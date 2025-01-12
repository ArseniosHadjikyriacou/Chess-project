const clickOnPiece = function (piece) {
  if (piece.type[0] === turn) {
      piece.findLegalMoves();
    }
}

const clickToMove = function (event,piece) {
  
  if (piece.positions.length > num+1) {
    pieces.forEach(p => {
      p.positions = p.positions.slice(0, -(p.positions.length-num-1));
    }
    );
  }

  piece.positions.push(event.currentTarget.id);

  const sqrElementOld = document.querySelector('.js-sqr'+coloredSqrs[0]);
  sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
 
  coloredSqrs[1].forEach( xy => {
    const sqrElementLegal = document.querySelector('.js-sqr'+xy);
    sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
    sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
  }
  );

  coloredSqrs = [];
  
  piece.movePiece()
}