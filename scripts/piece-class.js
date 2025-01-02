class Piece {

  constructor(type, oldPosition, newPosition) {
    this.type = type;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
  }

  startingPosition() {
    const sqrElement = document.querySelector('.js-sqr'+this.newPosition);

    sqrElement.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    /* sqrElement.addEventListener('click',clickOnPiece) */
  };

  movePiece() {
    const sqrElementOld = document.querySelector('.js-sqr'+this.oldPosition);
    const sqrElementNew = document.querySelector('.js-sqr'+this.newPosition);

    sqrElementOld.innerHTML = ""
    sqrElementNew.innerHTML = `<img class="piece" src="pieces/${this.type}.svg">`

    /* sqrElementOld.removeEventListener('click',clickOnPiece) */
    /* sqrElementNew.addEventListener('click',clickOnPiece) */
  }

}