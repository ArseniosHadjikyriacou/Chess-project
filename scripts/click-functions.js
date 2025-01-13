const clickOnPiece = function (piece) {
  if (piece.type[0] === turn) {
      piece.findLegalMoves();
    }
}

const clickToMove = function (event,piece) {
  let flag = 0;
  if (piece.positions.length > num+1) {
    flag = 1;
    pieces.forEach(p => {
      p.positions = p.positions.slice(0, -(p.positions.length-num-1));
    }
    );
  }

  piece.positions.push(event.currentTarget.id);

  if (flag) {
    // moved back and decided to move a piece...!
    // change piece parameters!!!
    let promIndex = 0;

    pieces.forEach((p,index) => {
      if (p.hasMoved[1] >= num) {
        p.hasMoved = [0,0];
      }
      if (p.wasCaptured[1] >= num) {
        p.wasCaptured = [0,0];
      }
      if (p.type[1] == 'P') {
        if (p.doublePush[1] >= num) {
          p.doublePush = [0,0];
        }
      }
    }
    );

    if (promIndex) {
      pieces.splice(promInd, 1);
    }

  }

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