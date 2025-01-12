backwardButton = document.querySelector('.js-backward');
forwardButton = document.querySelector('.js-forward');

const minusMove = function () {
  if (num) {

    clearBoard();

    num -= 1;
    changeColor();

    boardState = updateBoardState();
    
  }
}

const plusMove = function () {
  if (num+1 < pieces[0].positions.length) {

    clearBoard();

    num += 1;
    changeColor();

    boardState = updateBoardState();
    
  }
}

backwardButton.addEventListener('click',minusMove);
forwardButton.addEventListener('click',plusMove);