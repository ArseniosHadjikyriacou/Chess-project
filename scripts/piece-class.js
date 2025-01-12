class Piece {

  constructor(type, positions) {
    this.type = type;
    this.positions = positions;
    this.hasMoved = [0,0];
    this.wasCaptured = [0,0];
    this.createdAt = num+1;
    this.clickOnPiece = () => clickOnPiece(this);
    this.clickToMove = (event) => clickToMove(event,this);
  }

  placePiece() {
    const sqrElement = document.querySelector('.js-sqr'+this.positions[num]);
    sqrElement.innerHTML += ` <img class="piece" src="svg-pieces/${this.type}.svg">`;
    sqrElement.addEventListener('click',this.clickOnPiece);
  }

  movePiece() {
    
    const oldPos = this.positions.at(-2);
    const newPos = this.positions.at(-1);

    const sqrElementOld = document.querySelector('.js-sqr'+oldPos);
    const sqrElementNew = document.querySelector('.js-sqr'+newPos);
    
    let imgIndex = sqrElementOld.innerHTML.indexOf('<img');
    sqrElementOld.innerHTML = sqrElementOld.innerHTML.slice(0,imgIndex) + sqrElementOld.innerHTML.slice(imgIndex+44);

    imgIndex = sqrElementNew.innerHTML.indexOf('<img');
    if (imgIndex == -1) {
      sqrElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${this.type}.svg">`;
    } else {
      sqrElementNew.innerHTML = sqrElementNew.innerHTML.slice(0,imgIndex) + sqrElementNew.innerHTML.slice(imgIndex+44);
      sqrElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${this.type}.svg">`;
    }
    
    sqrElementOld.removeEventListener('click',this.clickOnPiece);
    sqrElementNew.addEventListener('click',this.clickOnPiece);

    const capturedPiece = pieceAtPosition(Number(newPos[0]),Number(newPos[1]))
    if (capturedPiece) { 
      sqrElementNew.removeEventListener('click',capturedPiece.clickOnPiece);
      capturedPiece.wasCaptured[0] = 1;
      capturedPiece.wasCaptured[1] = num;
    }

    // en-passant handling
    if (boardState[Number(oldPos[1])][Number(oldPos[0])] == 'wP' && 
        !boardState[Number(newPos[1])][Number(newPos[0])] && 
        oldPos[0] != newPos[0]) {
          
      const pawnObject = pieceAtPosition(Number(newPos[0]),Number(newPos[1])+1);
      pawnObject.wasCaptured[0] = 1;
      pawnObject.wasCaptured[1] = num;
      const pawnElementOld = document.querySelector('.js-sqr'+pawnObject.positions.at(-1));

      imgIndex = pawnElementOld.innerHTML.indexOf('<img');
      pawnElementOld.innerHTML = pawnElementOld.innerHTML.slice(0,imgIndex) + pawnElementOld.innerHTML.slice(imgIndex+44);
      pawnElementOld.removeEventListener('click',pawnObject.clickOnPiece);

      boardState[Number(newPos[1])+1][Number(newPos[0])] = 0;

    } else if (boardState[Number(oldPos[1])][Number(oldPos[0])] == 'bP' && 
               !boardState[Number(newPos[1])][Number(newPos[0])] && 
               oldPos[0] != newPos[0]) {

      const pawnObject = pieceAtPosition(Number(newPos[0]),Number(newPos[1])-1);
      pawnObject.wasCaptured[0] = 1;
      pawnObject.wasCaptured[1] = num;
      const pawnElementOld = document.querySelector('.js-sqr'+pawnObject.positions.at(-1));
          
      imgIndex = pawnElementOld.innerHTML.indexOf('<img');
      pawnElementOld.innerHTML = pawnElementOld.innerHTML.slice(0,imgIndex) + pawnElementOld.innerHTML.slice(imgIndex+44);
      pawnElementOld.removeEventListener('click',pawnObject.clickOnPiece);
          
      boardState[Number(newPos[1])-1][Number(newPos[0])] = 0;

    }

    boardState[Number(oldPos[1])][Number(oldPos[0])] = 0;
    boardState[Number(newPos[1])][Number(newPos[0])] = this.type;

    this.hasMoved[0] = 1;
    this.hasMoved[1] = num;

    // promotion and double push handling
    if (this.type[1] == 'P' && (newPos[1] == '0' || newPos[1] == '7')) {
      imgIndex = sqrElementNew.innerHTML.indexOf('<img');
      sqrElementNew.innerHTML = sqrElementNew.innerHTML.slice(0,imgIndex) + sqrElementNew.innerHTML.slice(imgIndex+44);
      sqrElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${this.type[0]}Q.svg">`;
      sqrElementNew.removeEventListener('click',this.clickOnPiece);
      this.wasCaptured[0] = 1;
      this.wasCaptured[1] = num;

      boardState[Number(newPos[1])][Number(newPos[0])] = this.type[0] + 'Q';
      const queen = new Queen(this.type[0] + 'Q',Array(num+1).fill(0).concat([newPos]));
      pieces.push(queen);
      
      sqrElementNew.addEventListener('click',queen.clickOnPiece);

    } else if (this.type[1] == 'P' && Math.abs(Number(newPos[1])-Number(oldPos[1])) == 2) {
      this.doublePush[0] = 1;
      this.doublePush[1] = num;
    }

    // castling handling
    if (this.type[1] == 'K' && Math.abs(Number(newPos[0])-Number(oldPos[0])) > 1) {
      //short castle
      if (Number(newPos[0])-Number(oldPos[0]) > 0) {
        const rookPosOld = '7' + newPos[1];
        const rookPosNew = '5' + newPos[1];

        let rookObject = pieceAtPosition(7,newPos[1]);

        const rookElementOld = document.querySelector('.js-sqr'+rookPosOld);
        const rookElementNew = document.querySelector('.js-sqr'+rookPosNew);

        imgIndex = rookElementOld.innerHTML.indexOf('<img');
        rookElementOld.innerHTML = rookElementOld.innerHTML.slice(0,imgIndex) + rookElementOld.innerHTML.slice(imgIndex+44);

        imgIndex = rookElementNew.innerHTML.indexOf('<img');
        if (imgIndex == -1) {
          rookElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${rookObject.type}.svg">`;
        } else {
          rookElementNew.innerHTML = rookElementNew.innerHTML.slice(0,imgIndex) + rookElementNew.innerHTML.slice(imgIndex+44);
          rookElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${rookObject.type}.svg">`;
        }

        rookElementOld.removeEventListener('click',rookObject.clickOnPiece);
        rookElementNew.addEventListener('click',rookObject.clickOnPiece);

        boardState[newPos[1]][7] = 0;
        boardState[newPos[1]][5] = rookObject.type;

        rookObject.hasMoved[0] = 1;
        rookObject.hasMoved[1] = num;
        rookObject.positions.push(rookPosNew);

      } else { //long castle 
        const rookPosOld = '0' + newPos[1];
        const rookPosNew = '3' + newPos[1];

        let rookObject = pieceAtPosition(0,newPos[1]);

        const rookElementOld = document.querySelector('.js-sqr'+rookPosOld);
        const rookElementNew = document.querySelector('.js-sqr'+rookPosNew);

        imgIndex = rookElementOld.innerHTML.indexOf('<img');
        rookElementOld.innerHTML = rookElementOld.innerHTML.slice(0,imgIndex) + rookElementOld.innerHTML.slice(imgIndex+44);

        imgIndex = rookElementNew.innerHTML.indexOf('<img');
        if (imgIndex == -1) {
          rookElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${rookObject.type}.svg">`;
        } else {
          rookElementNew.innerHTML = rookElementNew.innerHTML.slice(0,imgIndex) + rookElementNew.innerHTML.slice(imgIndex+44);
          rookElementNew.innerHTML += ` <img class="piece" src="svg-pieces/${rookObject.type}.svg">`;
        }

        rookElementOld.removeEventListener('click',rookObject.clickOnPiece);
        rookElementNew.addEventListener('click',rookObject.clickOnPiece);

        boardState[newPos[1]][0] = 0;
        boardState[newPos[1]][3] = rookObject.type;

        rookObject.hasMoved[0] = 1;
        rookObject.hasMoved[1] = num;
        rookObject.positions.push(rookPosNew);
      }
    }

    changeColor();

    // fill in positions of pieces that have not moved in this turn
    updatePiecePositions();

    num += 1;
    
    
  }

  colorLegalSqrs(legalMoves) {
    const sqrElementNew = document.querySelector('.js-sqr'+this.positions[num]);

    if (coloredSqrs.length) {

      if (coloredSqrs[0] == this.positions[num]) {
        coloredSqrs = [];
        sqrElementNew.classList.remove('js-sqrw-clicked','js-sqrb-clicked');

        legalMoves.forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr'+xy);
          sqrElementLegal.removeEventListener('click',this.clickToMove);
          sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
        }
        );

      } else {
        const sqrElementOld = document.querySelector('.js-sqr'+coloredSqrs[0]);
        sqrElementOld.classList.remove('js-sqrw-clicked','js-sqrb-clicked');
       
        coloredSqrs[1].forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr'+xy);
          sqrElementLegal.removeEventListener('click',coloredSqrs[2]);
          sqrElementLegal.classList.remove('js-sqrw-legal','js-sqrb-legal');
        }
        );

        if (sqrElementNew.classList.contains('sqrw')) {
          sqrElementNew.classList.add('js-sqrw-clicked');
        } else {
          sqrElementNew.classList.add('js-sqrb-clicked');
        }
        
        legalMoves.forEach( xy => {
          const sqrElementLegal = document.querySelector('.js-sqr'+xy);
          sqrElementLegal.addEventListener('click',this.clickToMove);
          if (sqrElementLegal.classList.contains('sqrw')) {
            sqrElementLegal.classList.add('js-sqrw-legal')
          } else {
            sqrElementLegal.classList.add('js-sqrb-legal')
          }
        }
        );

        coloredSqrs = [];
        coloredSqrs.push(this.positions[num]);
        coloredSqrs.push(legalMoves);
        coloredSqrs.push(this.clickToMove);
      }

    } else {

      coloredSqrs.push(this.positions[num]);
      coloredSqrs.push(legalMoves);
      coloredSqrs.push(this.clickToMove);

      if (sqrElementNew.classList.contains('sqrw')) {
        sqrElementNew.classList.add('js-sqrw-clicked')
      } else {
        sqrElementNew.classList.add('js-sqrb-clicked')
      }

      legalMoves.forEach( xy => {
        const sqrElementLegal = document.querySelector('.js-sqr'+xy);
        sqrElementLegal.addEventListener('click',this.clickToMove);
        if (sqrElementLegal.classList.contains('sqrw')) {
          sqrElementLegal.classList.add('js-sqrw-legal');
        } else {
          sqrElementLegal.classList.add('js-sqrb-legal');
        }

      }
      );

    }
  }

}


class Pawn extends Piece {
  constructor(type, positions) {
    super(type, positions);
    this.doublePush = [0,0];
  }

  findLegalMoves() {

    let dir = 0;
    if (this.type === "wP") {
      dir = -1;
    } else {
      dir = 1;
    }

    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);

    let legalMoves = [];

    if (this.hasMoved[0] && this.hasMoved[1] < num) {
      if (y+dir <= 7 && y+dir >= 0) {
        if (x-1 >= 0 && boardState[y+dir][x-1] &&  boardState[y+dir][x-1][0] != this.type[0]) {
          legalMoves.push(String(x-1)+String(y+dir));
        }
        if (x+1 <= 7 && boardState[y+dir][x+1] && boardState[y+dir][x+1][0] != this.type[0] ) {
          legalMoves.push(String(x+1)+String(y+dir));
        }
        if (!boardState[y+dir][x]) {
          legalMoves.push(String(x)+String(y+dir));
        }
      }
    } else {
      if (x-1 >= 0 && boardState[y+dir][x-1] &&  boardState[y+dir][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+dir));
      }
      if (x+1 <= 7 && boardState[y+dir][x+1] && boardState[y+dir][x+1][0] != this.type[0] ) {
        legalMoves.push(String(x+1)+String(y+dir));
      }
      if (!boardState[y+dir][x]) {
        legalMoves.push(String(x)+String(y+dir));
        if (!boardState[y+2*dir][x]) {
          legalMoves.push(String(x)+String(y+2*dir));
        }
      }
    }

    // en-passant handling
    if (this.type[0] == 'w' && y == 3) {
      if (x+1 <= 7 && boardState[y][x+1] == 'bP' && pieceAtPosition(x+1,y).type == 'bP' &&
        pieceAtPosition(x+1,y).doublePush[0] == 1 && pieceAtPosition(x+1,y).doublePush[1] == num-1) {
        legalMoves.push(String(x+1)+String(y-1));
      } else if (x-1 >= 0 && boardState[y][x-1] == 'bP' && pieceAtPosition(x-1,y).type == 'bP' &&
        pieceAtPosition(x-1,y).doublePush[0] == 1 && pieceAtPosition(x-1,y).doublePush[1] == num-1) {
        legalMoves.push(String(x-1)+String(y-1));
      }
    } else if (this.type[0] == 'b' && y == 4) {
      if (x+1 <= 7 && boardState[y][x+1] == 'wP' && pieceAtPosition(x+1,y).type == 'wP' && 
        pieceAtPosition(x+1,y).doublePush[0] == 1 && pieceAtPosition(x+1,y).doublePush[1] == num-1) {
        legalMoves.push(String(x+1)+String(y+1));
      } else if (x-1 >= 0 && boardState[y][x-1] == 'wP' && pieceAtPosition(x-1,y).type == 'wP' &&  
        pieceAtPosition(x-1,y).doublePush[0] == 1 && pieceAtPosition(x-1,y).doublePush[1] == num-1) {
        legalMoves.push(String(x-1)+String(y+1));
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);
    
  }
}


class Rook extends Piece {
  constructor(type, positions) {
    super(type, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);

    let legalMoves = [];

    let sliderx = x;
    while (1) {
      sliderx -= 1;
      if (sliderx < 0) {
        break;
      }
      if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else if (!boardState[y][sliderx]) {
        legalMoves.push(String(sliderx)+String(y));
      } else {
        legalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    sliderx = x;
    while (1) {
      sliderx += 1;
      if (sliderx > 7) {
        break;
      }
      if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else if (!boardState[y][sliderx]) {
        legalMoves.push(String(sliderx)+String(y));
      } else {
        legalMoves.push(String(sliderx)+String(y));
        break;
      }
    }

    let slidery = y;
    while (1) {
      slidery -= 1;
      if (slidery < 0) {
        break;
      }
      if (boardState[slidery][x][0] == this.type[0]) {
        break;
      } else if (!boardState[slidery][x]) {
        legalMoves.push(String(x)+String(slidery));
      } else {
        legalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    slidery = y;
    while (1) {
      slidery += 1;
      if (slidery > 7) {
        break;
      }
      if (boardState[slidery][x][0] == this.type[0]) {
        break;
      } else if (!boardState[slidery][x]) {
        legalMoves.push(String(x)+String(slidery));
      } else {
        legalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}


class Knight extends Piece {
  constructor(type, positions) {
    super(type, positions);
  }

  findLegalMoves() {
    
    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);
    
    let legalMoves = [];

    // x+1 , y+2
    if (x+1 <= 7 && y+2 <= 7) {
      if (!boardState[y+2][x+1] || boardState[y+2][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y+2));
      }
    }

    // x-1 , y+2
    if (x-1 >= 0 && y+2 <= 7) {
      if (!boardState[y+2][x-1] || boardState[y+2][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+2));
      }
    }

    // x+2 , y+1
    if (x+2 <= 7 && y+1 <= 7) {
      if (!boardState[y+1][x+2] || boardState[y+1][x+2][0] != this.type[0]) {
        legalMoves.push(String(x+2)+String(y+1));
      }
    }

    // x+2 , y-1
    if (x+2 <= 7 && y-1 >= 0) {
      if (!boardState[y-1][x+2] || boardState[y-1][x+2][0] != this.type[0]) {
        legalMoves.push(String(x+2)+String(y-1));
      }
    }

    // x+1 , y-2
    if (x+1 <= 7 && y-2 >= 0) {
      if (!boardState[y-2][x+1] || boardState[y-2][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y-2));
      }
    }

    // x-1 , y-2
    if (x-1 >= 0 && y-2 >= 0) {
      if (!boardState[y-2][x-1] || boardState[y-2][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y-2));
      }
    }

    // x-2 , y+1
    if (x-2 >= 0 && y+1 <= 7) {
      if (!boardState[y+1][x-2] || boardState[y+1][x-2][0] != this.type[0]) {
        legalMoves.push(String(x-2)+String(y+1));
      }
    }

    // x-2 , y-1
    if (x-2 >= 0 && y-1 >= 0) {
      if (!boardState[y-1][x-2] || boardState[y-1][x-2][0] != this.type[0]) {
        legalMoves.push(String(x-2)+String(y-1));
      }
    }
    
    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);
    
  }
}


class Bishop extends Piece {
  constructor(type, positions) {
    super(type, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);

    let legalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
        break;
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}


class Queen extends Piece {
  constructor(type, positions) {
    super(type, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);

    let legalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (!boardState[slidery][sliderx]) {
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(slidery));
      } else if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(slidery));
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
        legalMoves.push(String(sliderx)+String(y));
      } else if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(y));
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
        legalMoves.push(String(sliderx)+String(y));
      } else if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(sliderx)+String(y));
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
        legalMoves.push(String(x)+String(slidery));
      } else if (boardState[slidery][x][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(x)+String(slidery));
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
        legalMoves.push(String(x)+String(slidery));
      } else if (boardState[slidery][x][0] == this.type[0]) {
        break;
      } else {
        legalMoves.push(String(x)+String(slidery));
        break;
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}


class King extends Piece {
  constructor(type, positions) {
    super(type, positions);
  }

  findLegalMoves() {

    const x = Number(this.positions[num][0]);
    const y = Number(this.positions[num][1]);

    let legalMoves = [];

    // x+1 , y
    if (x+1 <= 7) {
      if (!boardState[y][x+1] || boardState[y][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y));
      }
    }

    // x+1 , y+1
    if (x+1 <= 7 && y+1 <= 7) {
      if (!boardState[y+1][x+1] || boardState[y+1][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y+1));
      }
    }

    // x , y+1
    if (y+1 <= 7) {
      if (!boardState[y+1][x] || boardState[y+1][x][0] != this.type[0]) {
        legalMoves.push(String(x)+String(y+1));
      }
    }

    // x-1 , y
    if (x-1 >= 0) {
      if (!boardState[y][x-1] || boardState[y][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y));
      }
    }

    // x-1 , y-1
    if (x-1 >= 0 && y-1 >= 0) {
      if (!boardState[y-1][x-1] || boardState[y-1][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y-1));
      }
    }

    // x , y-1
    if (y-1 >= 0) {
      if (!boardState[y-1][x] || boardState[y-1][x][0] != this.type[0]) {
        legalMoves.push(String(x)+String(y-1));
      }
    }

    // x+1 , y-1
    if (x+1 <= 7 && y-1 >= 0) {
      if (!boardState[y-1][x+1] || boardState[y-1][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y-1));
      }
    }

    // x-1 , y+1
    if (x-1 >= 0 && y+1 <= 7) {
      if (!boardState[y+1][x-1] || boardState[y+1][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+1));
      }
    }

    // castling
    if (!this.hasMoved[0] || this.hasMoved[1] <= num) {
      // short castle
      if (!boardState[y][x+1] && !boardState[y][x+2] && 
      pieceAtPosition(x+3,y) && 
      (!pieceAtPosition(x+3,y).hasMoved[0] || pieceAtPosition(x+3,y).hasMoved[1] <= num) &&
      !isSqrInCheck(this.type,x,y,boardState) && !isSqrInCheck(this.type,x+1,y,boardState) && !isSqrInCheck(this.type,x+2,y,boardState)) {
        legalMoves.push(String(x+2)+String(y));
      }

      // long castle
      if (!boardState[y][x-1] && !boardState[y][x-2] && !boardState[y][x-3] && 
      pieceAtPosition(x-4,y) && 
      (!pieceAtPosition(x-4,y).hasMoved[0] || pieceAtPosition(x-4,y).hasMoved[1] <= num) &&
      !isSqrInCheck(this.type,x,y,boardState) && !isSqrInCheck(this.type,x-1,y,boardState) && !isSqrInCheck(this.type,x-2,y,boardState)) {
        legalMoves.push(String(x-2)+String(y));
      }

    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}