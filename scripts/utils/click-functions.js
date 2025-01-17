const clickOnPiece = function (piece) {
  piece.findLegalMoves();
}

const clickToMove = function (event,piece) {

  let flag = 0;
  if (piece.positions.length > moveNum+1) {
    flag = 1;
    piecesArray.forEach(p => {
      p.positions = p.positions.slice(0, -(p.positions.length-moveNum-1));
    }
    );
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