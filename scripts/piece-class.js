class Piece {

  constructor(type, oldPosition, newPosition) {
    this.type = type;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.clickListener = () => clickOnPiece(this);
  }

  startingPosition() {
    const sqrElement = document.querySelector('.js-sqr'+this.newPosition);

    sqrElement.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    sqrElement.addEventListener('click',this.clickListener)
  };

  movePiece() {
    const sqrElementOld = document.querySelector('.js-sqr'+this.oldPosition);
    const sqrElementNew = document.querySelector('.js-sqr'+this.newPosition);

    sqrElementOld.innerHTML = ""
    sqrElementNew.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    sqrElementOld.removeEventListener('click',this.clickListener)
    sqrElementNew.addEventListener('click',this.clickListener)
  }

}


class Pawn extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
    this.hasMoved = 0;
  }
}


class Rook extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
    this.hasMoved = 0;
  }
}


class Knight extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }
}


class Bishop extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }
}


class Queen extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
  }
}


class King extends Piece {
  constructor(type, oldPosition, newPosition) {
    super(type, oldPosition, newPosition);
    this.hasMoved = 0;
  }
}