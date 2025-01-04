class Piece {

  constructor(type, oldPosition, newPosition) {
    this.type = type;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.clickOnPiece = () => clickOnPiece(this);
    this.clickToMove = (event) => clickToMove(event,this);
  }

  startingPosition() {
    const sqrElement = document.querySelector('.js-sqr'+this.newPosition);

    sqrElement.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    sqrElement.addEventListener('click',this.clickOnPiece)
  }

  movePiece() {
    const sqrElementOld = document.querySelector('.js-sqr'+this.oldPosition);
    const sqrElementNew = document.querySelector('.js-sqr'+this.newPosition);

    sqrElementOld.innerHTML = ""
    sqrElementNew.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    sqrElementOld.removeEventListener('click',this.clickOnPiece)
    sqrElementNew.addEventListener('click',this.clickOnPiece)
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
    this.hasMoved = 0;
  }

  findLegalMoves() {
    const x = Number(this.newPosition[0]);
    const y = Number(this.newPosition[1]);

    let legalMoves = [];
    legalMoves.push(String(x)+String(y-1));
    legalMoves.push(String(x)+String(y-2));

    this.colorLegalSqrs(legalMoves);
    
  }
}


class Rook extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
    this.hasMoved = 0;
  }

  findLegalMoves() {
    console.log("Rook")
  }
}


class Knight extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    console.log("Knight")
  }
}


class Bishop extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    console.log("Bishop")
  }
}


class Queen extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }

  findLegalMoves() {
    console.log("Queen")
  }
}


class King extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
    this.hasMoved = 0;
  }

  findLegalMoves() {
    console.log("King")
  }
}