class Pieces {

  id;
  positions;
  moved;
  captured;
  created;
  imgHTML;
  clickOnPiece;
  clickToMove;

  constructor(id, positions) {
    this.id = id;
    this.positions = positions;
    this.moved = [0,0];
    this.captured = [0,0];
    this.created = -1;
    this.imgHTML = `<img class="piece js-piece-${this.id}" src="svg-pieces/${this.id.slice(0,2)}.svg">`
    this.clickOnPiece = () => this.findLegalMoves();
    this.clickToMove = (event) => clickToMove(event,this);
  }

  static updateBoardState() {
    let board = Array(8).fill().map(() => Array(8).fill(0));

    piecesArray.forEach( piece => {
      if (!piece.captured[0] || piece.captured[1] >= moveNum) {
        if ( piece.id[1] != 'Q' || (piece.id[1] === 'Q' && piece.created < moveNum) ) {
          piece.placePiece(piece.positions[moveNum]);
          board[Number(piece.positions[moveNum][1])][Number(piece.positions[moveNum][0])] = piece.id;
        }
      }
    });

    return board;
  }

  static clearBoard() {
    // remove current piece images
    // automatically removes the clickOnPiece event listeners attatched to the images
    piecesArray.forEach( piece => {
      if (document.querySelector('.js-piece-'+piece.id)) {
        document.querySelector('.js-piece-'+piece.id).remove();
      }
    });
  
    // remove highlighted squares
    if (coloredSqrs.length) {
      const sqrElementOld = document.querySelector('.js-sqr-'+coloredSqrs[0]);
      sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
      
      coloredSqrs[1].forEach( xy => {
        const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
        sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
        sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
      });
      coloredSqrs = [];
    }
  
  }

  static extendPositions() {
    piecesArray.forEach(piece => {
      if (piece.positions.length <= moveNum+1) {
        piece.positions.push(piece.positions.at(-1));
      }
    });
  }

  static pieceAtPosition(x,y) {
    let ind = -1;
    const xy = String(x) + String(y);

    piecesArray.forEach((piece,index) => {
      if (piece.positions[moveNum] === xy && (!piece.captured[0] || piece.captured[1] >= moveNum)) {
        ind = index;
      }
    });
  
    if (ind == -1) {
      return 0;
    } else {
      return piecesArray[ind];
    }
  }

  placePiece(newSqr) {
    const sqrElement = document.querySelector('.js-sqr-'+newSqr);
    sqrElement.innerHTML += this.imgHTML;

    const imgElement = document.querySelector(`.js-piece-${this.id}`);
    if (this.id[0] === moveColor) {
      imgElement.addEventListener('click',this.clickOnPiece);
    }
  }

  capturePiece() {
    this.captured[0] = 1;
    this.captured[1] = moveNum;
  }

  movePiece(oldPos,newPos) {

    this.moved[0] = 1;
    this.moved[1] = moveNum;

    const capturedPiece = Pieces.pieceAtPosition(Number(newPos[0]),Number(newPos[1]))
    if (capturedPiece) { 
      capturedPiece.capturePiece();
    }
    
    // en-passant handling
    if (boardState[Number(oldPos[1])][Number(oldPos[0])].slice(0,2) === 'wP' && 
        !boardState[Number(newPos[1])][Number(newPos[0])] && 
        oldPos[0] != newPos[0]) {
          
      const pawnObject = Pieces.pieceAtPosition(Number(newPos[0]),Number(newPos[1])+1);
      pawnObject.capturePiece();

    } else if (boardState[Number(oldPos[1])][Number(oldPos[0])].slice(0,2) === 'bP' && 
               !boardState[Number(newPos[1])][Number(newPos[0])] && 
               oldPos[0] != newPos[0]) {

      const pawnObject = Pieces.pieceAtPosition(Number(newPos[0]),Number(newPos[1])-1);
      pawnObject.capturePiece();

    }

    // promotion and double push handling
    if (this.id[1] === 'P' && (newPos[1] === '0' || newPos[1] === '7')) {
      this.pawnPromotion();

      newQueens++;
      const queen = new Queen(this.id[0] + 'Q' + String(newQueens),Array(moveNum+1).fill(newPos));
      queen.created = moveNum;
      piecesArray.push(queen);

    } else if (this.id[1] === 'P' && Math.abs(Number(newPos[1])-Number(oldPos[1])) === 2) {
      this.doublePush[0] = 1;
      this.doublePush[1] = moveNum;
    }

    // castling handling
    if (this.id[1] === 'K' && Math.abs(Number(newPos[0])-Number(oldPos[0])) > 1) {
      //short castle
      if (Number(newPos[0])-Number(oldPos[0]) > 0) {
        const rookPosNew = '5' + newPos[1];

        const rookObject = Pieces.pieceAtPosition(7,newPos[1]);

        rookObject.moved[0] = 1;
        rookObject.moved[1] = moveNum;
        rookObject.positions.push(rookPosNew);

      } else { //long castle 
        const rookPosNew = '3' + newPos[1];

        const rookObject = Pieces.pieceAtPosition(0,newPos[1]);

        rookObject.moved[0] = 1;
        rookObject.moved[1] = moveNum;
        rookObject.positions.push(rookPosNew);
      }
    }

    changeColor();
    Pieces.clearBoard();

    // add new position to moved piece and extend the positions array for all other pieces
    if (this.id[1] != 'P' || (newPos[1] != '0' && newPos[1] != '7')) {
      this.positions.push(newPos);
    }
    Pieces.extendPositions();

    moveNum += 1;
    boardState = Pieces.updateBoardState();
    
  }

  colorLegalSqrs(legalMoves) {
    const sqrElementPiece = document.querySelector('.js-sqr-'+this.positions[moveNum]);

    if (coloredSqrs.length) {

      if (coloredSqrs[0] === this.positions[moveNum]) {
        coloredSqrs = [];
        sqrElementPiece.classList.remove('js-sqrw-clicked','js-sqrb-clicked');

        legalMoves.forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
          sqrElementLegal.removeEventListener('click',this.clickToMove);
          sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
        }
        );

      } else {
        const sqrElementOld = document.querySelector('.js-sqr-'+coloredSqrs[0]);
        sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
       
        coloredSqrs[1].forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
          sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
          sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
        }
        );

        if (sqrElementPiece.classList.contains('sqrw')) {
          sqrElementPiece.classList.add('js-sqrw-clicked');
        } else {
          sqrElementPiece.classList.add('js-sqrb-clicked');
        }
        
        legalMoves.forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
          sqrElementLegal.addEventListener('click',this.clickToMove);
          if (sqrElementLegal.classList.contains('sqrw')) {
            sqrElementLegal.classList.add('js-sqrw-legal')
          } else {
            sqrElementLegal.classList.add('js-sqrb-legal')
          }
        }
        );

        coloredSqrs = [];
        coloredSqrs.push(this.positions[moveNum]);
        coloredSqrs.push(legalMoves);
        coloredSqrs.push(this.clickToMove);
      }

    } else {

      coloredSqrs.push(this.positions[moveNum]);
      coloredSqrs.push(legalMoves);
      coloredSqrs.push(this.clickToMove);

      if (sqrElementPiece.classList.contains('sqrw')) {
        sqrElementPiece.classList.add('js-sqrw-clicked')
      } else {
        sqrElementPiece.classList.add('js-sqrb-clicked')
      }

      legalMoves.forEach( xy => {
        const sqrElementLegal = document.querySelector('.js-sqr-'+xy);
        sqrElementLegal.addEventListener('click',this.clickToMove);
        if (sqrElementLegal.classList.contains('sqrw')) {
          sqrElementLegal.classList.add('js-sqrw-legal');
        } else {
          sqrElementLegal.classList.add('js-sqrb-legal');
        }
      });

    }
  }

}


class Pawn extends Pieces {

  doublePush;

  constructor(id, positions) {
    super(id, positions);
    this.doublePush = [0,0];
  }

  pawnPromotion() {
    this.captured[0] = 1;
    this.captured[1] = moveNum;
  }

  findLegalMoves() {

    let dir = 0;
    if (this.id.slice(0,2) === "wP") {
      dir = -1;
    } else {
      dir = 1;
    }

    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);

    let pseudoLegalMoves = [];

    // single space moves
    if (y+dir <= 7 && y+dir >= 0) {
      if (x-1 >= 0 && boardState[y+dir][x-1] &&  boardState[y+dir][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y+dir));
      }
      if (x+1 <= 7 && boardState[y+dir][x+1] && boardState[y+dir][x+1][0] != this.id[0] ) {
        pseudoLegalMoves.push(String(x+1)+String(y+dir));
      }
      if (!boardState[y+dir][x]) {
        pseudoLegalMoves.push(String(x)+String(y+dir));
      }
    }

    // double space moves
    if (y+2*dir <= 7 && y+2*dir >= 0) {
      if (!this.moved[0] || this.moved[1] >= moveNum) {
        if (!boardState[y+dir][x] && !boardState[y+2*dir][x]) {
          pseudoLegalMoves.push(String(x)+String(y+2*dir));
        }
      }
    }  

    // en-passant handling
    if (this.id[0] === 'w' && y === 3) {
      if (x+1 <= 7 && boardState[y][x+1] && boardState[y][x+1].slice(0,2) === 'bP' &&
        Pieces.pieceAtPosition(x+1,y).doublePush[0] === 1 && Pieces.pieceAtPosition(x+1,y).doublePush[1] === moveNum-1) {
        pseudoLegalMoves.push(String(x+1)+String(y-1));
      }
      if (x-1 >= 0 && boardState[y][x-1] && boardState[y][x-1].slice(0,2) === 'bP' &&
      Pieces.pieceAtPosition(x-1,y).doublePush[0] === 1 && Pieces.pieceAtPosition(x-1,y).doublePush[1] === moveNum-1) {
        pseudoLegalMoves.push(String(x-1)+String(y-1));
      }
    } else if (this.id[0] === 'b' && y === 4) {
      if (x+1 <= 7 && boardState[y][x+1] && boardState[y][x+1].slice(0,2) === 'wP' && 
      Pieces.pieceAtPosition(x+1,y).doublePush[0] === 1 && Pieces.pieceAtPosition(x+1,y).doublePush[1] === moveNum-1) {
        pseudoLegalMoves.push(String(x+1)+String(y+1));
      }
      if (x-1 >= 0 && boardState[y][x-1] && boardState[y][x-1].slice(0,2) === 'wP' &&  
      Pieces.pieceAtPosition(x-1,y).doublePush[0] === 1 && Pieces.pieceAtPosition(x-1,y).doublePush[1] === moveNum-1) {
        pseudoLegalMoves.push(String(x-1)+String(y+1));
      }
    }

    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));
    
  }
}


class Rook extends Pieces {

  constructor(id, positions) {
    super(id, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);

    let pseudoLegalMoves = [];

    let sliderx = x;
    while (1) {
      sliderx -= 1;
      if (sliderx < 0) {
        break;
      }
      if (boardState[y][sliderx][0] === this.id[0]) {
        break;
      } else if (!boardState[y][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(y));
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    sliderx = x;
    while (1) {
      sliderx += 1;
      if (sliderx > 7) {
        break;
      }
      if (boardState[y][sliderx][0] === this.id[0]) {
        break;
      } else if (!boardState[y][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(y));
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    let slidery = y;
    while (1) {
      slidery -= 1;
      if (slidery < 0) {
        break;
      }
      if (boardState[slidery][x][0] === this.id[0]) {
        break;
      } else if (!boardState[slidery][x]) {
        pseudoLegalMoves.push(String(x)+String(slidery));
      } else {
        pseudoLegalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    slidery = y;
    while (1) {
      slidery += 1;
      if (slidery > 7) {
        break;
      }
      if (boardState[slidery][x][0] === this.id[0]) {
        break;
      } else if (!boardState[slidery][x]) {
        pseudoLegalMoves.push(String(x)+String(slidery));
      } else {
        pseudoLegalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));

  }
}


class Knight extends Pieces {

  constructor(id, positions) {
    super(id, positions);
  }

  findLegalMoves() {
    
    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);
    
    let pseudoLegalMoves = [];

    // x+1 , y+2
    if (x+1 <= 7 && y+2 <= 7) {
      if (!boardState[y+2][x+1] || boardState[y+2][x+1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+1)+String(y+2));
      }
    }

    // x-1 , y+2
    if (x-1 >= 0 && y+2 <= 7) {
      if (!boardState[y+2][x-1] || boardState[y+2][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y+2));
      }
    }

    // x+2 , y+1
    if (x+2 <= 7 && y+1 <= 7) {
      if (!boardState[y+1][x+2] || boardState[y+1][x+2][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+2)+String(y+1));
      }
    }

    // x+2 , y-1
    if (x+2 <= 7 && y-1 >= 0) {
      if (!boardState[y-1][x+2] || boardState[y-1][x+2][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+2)+String(y-1));
      }
    }

    // x+1 , y-2
    if (x+1 <= 7 && y-2 >= 0) {
      if (!boardState[y-2][x+1] || boardState[y-2][x+1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+1)+String(y-2));
      }
    }

    // x-1 , y-2
    if (x-1 >= 0 && y-2 >= 0) {
      if (!boardState[y-2][x-1] || boardState[y-2][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y-2));
      }
    }

    // x-2 , y+1
    if (x-2 >= 0 && y+1 <= 7) {
      if (!boardState[y+1][x-2] || boardState[y+1][x-2][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-2)+String(y+1));
      }
    }

    // x-2 , y-1
    if (x-2 >= 0 && y-1 >= 0) {
      if (!boardState[y-1][x-2] || boardState[y-1][x-2][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-2)+String(y-1));
      }
    }
    
    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));
    
  }
}


class Bishop extends Pieces {

  constructor(id, positions) {
    super(id, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);

    let pseudoLegalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx += 1;
      slidery -= 1;
      if (sliderx > 7 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx += 1;
      slidery += 1;
      if (sliderx > 7 || slidery > 7) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx -= 1;
      slidery += 1;
      if (sliderx < 0 || slidery > 7) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));

  }
}


class Queen extends Pieces {

  constructor(id, positions) {
    super(id, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);

    let pseudoLegalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx += 1;
      slidery -= 1;
      if (sliderx > 7 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx += 1;
      slidery += 1;
      if (sliderx > 7 || slidery > 7) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    slidery = y;
    while (1) {
      sliderx -= 1;
      slidery += 1;
      if (sliderx < 0 || slidery > 7) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    sliderx = x;
    while (1) {
      sliderx -= 1;
      if (sliderx < 0) {
        break;
      }
      if (!boardState[y][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(y));
      } else if (boardState[y][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    sliderx = x;
    while (1) {
      sliderx += 1;
      if (sliderx > 7) {
        break;
      }
      if (!boardState[y][sliderx]) {
        pseudoLegalMoves.push(String(sliderx)+String(y));
      } else if (boardState[y][sliderx][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    slidery = y;
    while (1) {
      slidery -= 1;
      if (slidery < 0) {
        break;
      }
      if (!boardState[slidery][x]) {
        pseudoLegalMoves.push(String(x)+String(slidery));
      } else if (boardState[slidery][x][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    slidery = y;
    while (1) {
      slidery += 1;
      if (slidery > 7) {
        break;
      }
      if (!boardState[slidery][x]) {
        pseudoLegalMoves.push(String(x)+String(slidery));
      } else if (boardState[slidery][x][0] === this.id[0]) {
        break;
      } else {
        pseudoLegalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));

  }
}


class King extends Pieces {
  
  constructor(id, positions) {
    super(id, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[moveNum][0]);
    const y = Number(this.positions[moveNum][1]);

    let pseudoLegalMoves = [];

    // x+1 , y
    if (x+1 <= 7) {
      if (!boardState[y][x+1] || boardState[y][x+1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+1)+String(y));
      }
    }

    // x+1 , y+1
    if (x+1 <= 7 && y+1 <= 7) {
      if (!boardState[y+1][x+1] || boardState[y+1][x+1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+1)+String(y+1));
      }
    }

    // x , y+1
    if (y+1 <= 7) {
      if (!boardState[y+1][x] || boardState[y+1][x][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x)+String(y+1));
      }
    }

    // x-1 , y
    if (x-1 >= 0) {
      if (!boardState[y][x-1] || boardState[y][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y));
      }
    }

    // x-1 , y-1
    if (x-1 >= 0 && y-1 >= 0) {
      if (!boardState[y-1][x-1] || boardState[y-1][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y-1));
      }
    }

    // x , y-1
    if (y-1 >= 0) {
      if (!boardState[y-1][x] || boardState[y-1][x][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x)+String(y-1));
      }
    }

    // x+1 , y-1
    if (x+1 <= 7 && y-1 >= 0) {
      if (!boardState[y-1][x+1] || boardState[y-1][x+1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x+1)+String(y-1));
      }
    }

    // x-1 , y+1
    if (x-1 >= 0 && y+1 <= 7) {
      if (!boardState[y+1][x-1] || boardState[y+1][x-1][0] != this.id[0]) {
        pseudoLegalMoves.push(String(x-1)+String(y+1));
      }
    }
    
    // castling
    if (!this.moved[0] || this.moved[1] >= moveNum) {
      // short castle
      if (!boardState[y][x+1] && !boardState[y][x+2] && boardState[y][x+3] === this.id.slice(0,1)+'R2' &&
      (!Pieces.pieceAtPosition(x+3,y).moved[0] || Pieces.pieceAtPosition(x+3,y).moved[1] >= moveNum) &&
      !isSqrInCheck(this.id,x,y,boardState) && !isSqrInCheck(this.id,x+1,y,boardState) && !isSqrInCheck(this.id,x+2,y,boardState)) {
        pseudoLegalMoves.push(String(x+2)+String(y));
      }

      // long castle
      if (!boardState[y][x-1] && !boardState[y][x-2] && !boardState[y][x-3] && boardState[y][x-4] === this.id.slice(0,1)+'R1' && 
      (!Pieces.pieceAtPosition(x-4,y).moved[0] || Pieces.pieceAtPosition(x-4,y).moved[1] >= moveNum) &&
      !isSqrInCheck(this.id,x,y,boardState) && !isSqrInCheck(this.id,x-1,y,boardState) && !isSqrInCheck(this.id,x-2,y,boardState)) {
        pseudoLegalMoves.push(String(x-2)+String(y));
      }

    }

    this.colorLegalSqrs(moveFiltering(x,y,pseudoLegalMoves));

  }
}