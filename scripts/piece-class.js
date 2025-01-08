class Piece {

  constructor(type, oldPosition, newPosition) {
    this.type = type;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.clickOnPiece = () => clickOnPiece(this);
    this.clickToMove = (event) => clickToMove(event,this);
    this.hasMoved = 0;
  }

  startingPosition() {
    boardState[Number(this.newPosition[1])][Number(this.newPosition[0])] = this.type;
    pieceObjects[Number(this.newPosition[1])][Number(this.newPosition[0])] = this;
    clickOnPieceFuns[Number(this.newPosition[1])][Number(this.newPosition[0])] = this.clickOnPiece;

    const sqrElement = document.querySelector('.js-sqr'+this.newPosition);
    sqrElement.innerHTML += ` <img class="piece" src="svg-pieces/${this.type}.svg">`;

    sqrElement.addEventListener('click',this.clickOnPiece);
    
  }

  movePiece() {

    const sqrElementOld = document.querySelector('.js-sqr'+this.oldPosition);
    const sqrElementNew = document.querySelector('.js-sqr'+this.newPosition);
    
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

    if (clickOnPieceFuns[Number(this.newPosition[1])][Number(this.newPosition[0])] != '0') { 
      sqrElementNew.removeEventListener('click',clickOnPieceFuns[Number(this.newPosition[1])][Number(this.newPosition[0])]);
    }

    boardState[Number(this.oldPosition[1])][Number(this.oldPosition[0])] = '0';
    boardState[Number(this.newPosition[1])][Number(this.newPosition[0])] = this.type;

    pieceObjects[Number(this.oldPosition[1])][Number(this.oldPosition[0])] = '0';
    pieceObjects[Number(this.newPosition[1])][Number(this.newPosition[0])] = this;

    clickOnPieceFuns[Number(this.oldPosition[1])][Number(this.oldPosition[0])] = '0';
    clickOnPieceFuns[Number(this.newPosition[1])][Number(this.newPosition[0])] = this.clickOnPiece;

    this.hasMoved = 1;

    // castling handling
    if (this.type[1] == 'K' && Math.abs(Number(this.newPosition[0])-Number(this.oldPosition[0])) > 1) {
      //short castle
      if (Number(this.newPosition[0])-Number(this.oldPosition[0]) > 0) {
        const rookPosOld = '7' + this.newPosition[1];
        const rookPosNew = '5' + this.newPosition[1];

        let rookObject = pieceObjects[this.newPosition[1]][7];

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

        boardState[this.newPosition[1]][7] = '0';
        boardState[this.newPosition[1]][5] = rookObject.type;

        pieceObjects[this.newPosition[1]][7] = '0';
        pieceObjects[this.newPosition[1]][5] = rookObject;

        clickOnPieceFuns[this.newPosition[1]][7] = '0';
        clickOnPieceFuns[this.newPosition[1]][5] = rookObject.clickOnPiece;

        rookObject.hasMoved = 1;
        rookObject.oldPosition = rookPosOld;
        rookObject.newPosition = rookPosNew;

      } else { //long castle 
        const rookPosOld = '0' + this.newPosition[1];
        const rookPosNew = '3' + this.newPosition[1];

        let rookObject = pieceObjects[this.newPosition[1]][0];

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

        boardState[this.newPosition[1]][0] = '0';
        boardState[this.newPosition[1]][3] = rookObject.type;

        pieceObjects[this.newPosition[1]][0] = '0';
        pieceObjects[this.newPosition[1]][3] = rookObject;

        clickOnPieceFuns[this.newPosition[1]][0] = '0';
        clickOnPieceFuns[this.newPosition[1]][3] = rookObject.clickOnPiece;

        rookObject.hasMoved = 1;
        rookObject.oldPosition = rookPosOld;
        rookObject.newPosition = rookPosNew;
      }
    }

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

  colorLegalSqrs(legalMoves) {
    const sqrElementNew = document.querySelector('.js-sqr'+this.newPosition);

    if (coloredSqrs.length > 0) {

      if (coloredSqrs[0] == this.newPosition) {
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
        coloredSqrs.push(this.newPosition);
        coloredSqrs.push(legalMoves);
        coloredSqrs.push(this.clickToMove);
      }

    } else {

      coloredSqrs.push(this.newPosition);
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
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {

    let dir = 0;
    if (this.type === "wP") {
      dir = -1;
    } else {
      dir = 1;
    }

    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    if (this.hasMoved) {
      if (y+dir <= 7 && y+dir >= 0) {
        if (x-1 >= 0 && boardState[y+dir][x-1] != '0' &&  boardState[y+dir][x-1][0] != this.type[0]) {
          legalMoves.push(String(x-1)+String(y+dir));
        }
        if (x+1 <= 7 && boardState[y+dir][x+1] != 0 && boardState[y+dir][x+1][0] != this.type[0] ) {
          legalMoves.push(String(x+1)+String(y+dir));
        }
        if (boardState[y+dir][x] == '0') {
          legalMoves.push(String(x)+String(y+dir));
        }
      }
    } else {
      if (x-1 >= 0 && boardState[y+dir][x-1] != '0' &&  boardState[y+dir][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+dir));
      }
      if (x+1 <= 7 && boardState[y+dir][x+1] != '0' && boardState[y+dir][x+1][0] != this.type[0] ) {
        legalMoves.push(String(x+1)+String(y+dir));
      }
      if (boardState[y+dir][x] == '0') {
        legalMoves.push(String(x)+String(y+dir));
        if (boardState[y+2*dir][x] == '0') {
          legalMoves.push(String(x)+String(y+2*dir));
        }
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);
    
  }
}


class Rook extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {

    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    let sliderx = x;
    while (1) {
      sliderx -= 1;
      if (sliderx < 0) {
        break;
      }
      if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[y][sliderx] == '0') {
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
      } else if (boardState[y][sliderx] == '0') {
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
      } else if (boardState[slidery][x] == '0') {
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
      } else if (boardState[slidery][x] == '0') {
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
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    // x+1 , y+2
    if (x+1 <= 7 && y+2 <= 7) {
      if (boardState[y+2][x+1][0] == '0' || boardState[y+2][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y+2));
      }
    }

    // x-1 , y+2
    if (x-1 >= 0 && y+2 <= 7) {
      if (boardState[y+2][x-1][0] == '0' || boardState[y+2][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+2));
      }
    }

    // x+2 , y+1
    if (x+2 <= 7 && y+1 <= 7) {
      if (boardState[y+1][x+2][0] == '0' || boardState[y+1][x+2][0] != this.type[0]) {
        legalMoves.push(String(x+2)+String(y+1));
      }
    }

    // x+2 , y-1
    if (x+2 <= 7 && y-1 >= 0) {
      if (boardState[y-1][x+2][0] == '0' || boardState[y-1][x+2][0] != this.type[0]) {
        legalMoves.push(String(x+2)+String(y-1));
      }
    }

    // x+1 , y-2
    if (x+1 <= 7 && y-2 >= 0) {
      if (boardState[y-2][x+1][0] == '0' || boardState[y-2][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y-2));
      }
    }

    // x-1 , y-2
    if (x-1 >= 0 && y-2 >= 0) {
      if (boardState[y-2][x-1][0] == '0' || boardState[y-2][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y-2));
      }
    }

    // x-2 , y+1
    if (x-2 >= 0 && y+1 <= 7) {
      if (boardState[y+1][x-2][0] == '0' || boardState[y+1][x-2][0] != this.type[0]) {
        legalMoves.push(String(x-2)+String(y+1));
      }
    }

    // x-2 , y-1
    if (x-2 >= 0 && y-1 >= 0) {
      if (boardState[y-1][x-2][0] == '0' || boardState[y-1][x-2][0] != this.type[0]) {
        legalMoves.push(String(x-2)+String(y-1));
      }
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}


class Bishop extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    let sliderx = x;
    let slidery = y;
    while (1) {
      sliderx -= 1;
      slidery -= 1;
      if (sliderx < 0 || slidery < 0) {
        break;
      }
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[slidery][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(slidery));
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
      if (boardState[y][sliderx][0] == this.type[0]) {
        break;
      } else if (boardState[y][sliderx] == '0') {
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
      } else if (boardState[y][sliderx] == '0') {
        legalMoves.push(String(sliderx)+String(y));
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
      if (boardState[slidery][x][0] == this.type[0]) {
        break;
      } else if (boardState[slidery][x] == '0') {
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
      } else if (boardState[slidery][x] == '0') {
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


class King extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];

    // x+1 , y
    if (x+1 <= 7) {
      if (boardState[y][x+1][0] == '0' || boardState[y][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y));
      }
    }

    // x+1 , y+1
    if (x+1 <= 7 && y+1 <= 7) {
      if (boardState[y+1][x+1][0] == '0' || boardState[y+1][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y+1));
      }
    }

    // x , y+1
    if (y+1 <= 7) {
      if (boardState[y+1][x][0] == '0' || boardState[y+1][x][0] != this.type[0]) {
        legalMoves.push(String(x)+String(y+1));
      }
    }

    // x-1 , y
    if (x-1 >= 0) {
      if (boardState[y][x-1][0] == '0' || boardState[y][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y));
      }
    }

    // x-1 , y-1
    if (x-1 >= 0 && y-1 >= 0) {
      if (boardState[y-1][x-1][0] == '0' || boardState[y-1][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y-1));
      }
    }

    // x , y-1
    if (y-1 >= 0) {
      if (boardState[y-1][x][0] == '0' || boardState[y-1][x][0] != this.type[0]) {
        legalMoves.push(String(x)+String(y-1));
      }
    }

    // x+1 , y-1
    if (x+1 <= 7 && y-1 >= 0) {
      if (boardState[y-1][x+1][0] == '0' || boardState[y-1][x+1][0] != this.type[0]) {
        legalMoves.push(String(x+1)+String(y-1));
      }
    }

    // x-1 , y+1
    if (x-1 >= 0 && y+1 <= 7) {
      if (boardState[y+1][x-1][0] == '0' || boardState[y+1][x-1][0] != this.type[0]) {
        legalMoves.push(String(x-1)+String(y+1));
      }
    }

    // short castle
    if (!this.hasMoved && boardState[y][x+1] == '0' && boardState[y][x+2] == '0' && 
      (pieceObjects[y][x+3] != '0' && pieceObjects[y][x+3].hasMoved == 0) &&
      !isSqrInCheck(this.type,x,y,boardState) && !isSqrInCheck(this.type,x+1,y,boardState) && !isSqrInCheck(this.type,x+2,y,boardState)) {
      legalMoves.push(String(x+2)+String(y));
    }

    // long castle
    if (!this.hasMoved && boardState[y][x-1] == '0' && boardState[y][x-2] == '0' && boardState[y][x-3] == '0' &&
      (pieceObjects[y][x-4] != '0' && pieceObjects[y][x-4].hasMoved == 0) &&
      !isSqrInCheck(this.type,x,y,boardState) && !isSqrInCheck(this.type,x+1,y,boardState) && !isSqrInCheck(this.type,x+2,y,boardState)) {
      legalMoves.push(String(x-2)+String(y));
    }

    legalMoves = moveFiltering(x,y,legalMoves);
    this.colorLegalSqrs(legalMoves);

  }
}