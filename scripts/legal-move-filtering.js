const moveFiltering = function (x,y,pseudoLegal) {

  let illegalInd = [];
  let legalMoves = [];

  let newBoard = JSON.parse(JSON.stringify(boardState));
  let xNew = 0;
  let yNew = 0;

  pseudoLegal.forEach((move,index) => {
    newBoard = JSON.parse(JSON.stringify(boardState));
    xNew = Number(move[0]);
    yNew = Number(move[1]);

    newBoard[yNew][xNew] = newBoard[y][x];
    newBoard[y][x] = '0';

    // castling handling
    if (boardState[y][x][1] == 'K' && Math.abs(move[0]-x) > 1) {
      if (move[0]-x > 0) {
        newBoard[y][xNew-1] = newBoard[y][7];
        newBoard[y][7] = '0';
      } else {
        newBoard[y][xNew+1] = newBoard[y][0];
        newBoard[y][0] = '0';
      }
    }

    if (turn == 'w') {
      for (let i=0; i<=7; i++){
        for (let j=0; j<=7; j++){
          if (newBoard[i][j] == 'wK') {
            if (isSqrInCheck('wK',j,i,newBoard)){
              illegalInd.push(index);
            }
            break;
          }
        }
      }
    } else {
      for (let i=0; i<=7; i++){
        for (let j=0; j<=7; j++){
          if (newBoard[i][j] == 'bK') {
            if (isSqrInCheck('bK',j,i,newBoard)){
              illegalInd.push(index);
            }
            break;
          }
        }
      }
    }
  }
  );

  for (let i=0; i<pseudoLegal.length; i++) {
    if (illegalInd.indexOf(i) == -1) {
      legalMoves.push(pseudoLegal[i]);
    }
  }

  return legalMoves;

}



let isSqrInCheck = function (color,x,y,board) {
  let sliderx = x;
  let slidery = y;
  
  // horizontally and vertically
  sliderx = x;
  while (1) {
    sliderx -= 1;
    if (sliderx < 0 || board[y][sliderx][0] == color[0]) {
      break;
    }
        if (board[y][sliderx] != '0') {
      if (board[y][sliderx][1] == 'R' || board[y][sliderx][1] == 'Q') {
        return true;
      } else if (board[y][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  sliderx = x;
  while (1) {
    sliderx += 1;
    if (sliderx > 7 || board[y][sliderx][0] == color[0]) {
      break;
    }
    if (board[y][sliderx] != '0') {
      if (board[y][sliderx][1] == 'R' || board[y][sliderx][1] == 'Q') {
        return true;
      } else if (board[y][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  slidery = y;
  while (1) {
    slidery -= 1;
    if (slidery < 0 || board[slidery][x][0] == color[0]) {
      break;
    }
    if (board[slidery][x] != '0') {
      if (board[slidery][x][1] == 'R' || board[slidery][x][1] == 'Q') {
        return true;
      } else if (board[slidery][x][1] == 'K' && Math.abs(slidery-y) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  slidery = y;
  while (1) {
    slidery += 1;
    if (slidery > 7 || board[slidery][x][0] == color[0]) {
      break;
    }
    if (board[slidery][x] != '0') {
      if (board[slidery][x][1] == 'R' || board[slidery][x][1] == 'Q') {
        return true;
      } else if (board[slidery][x][1] == 'K' && Math.abs(slidery-y) == 1) {
        return true;
      } else {
        break;
      }
    }
  }
  // horizontally and vertically

  // diagonally and pawns
  sliderx = x;
  slidery = y;
  while (1) {
    sliderx -= 1;
    slidery -= 1;
    if (sliderx < 0 || slidery < 0 || board[slidery][sliderx][0] == color[0]) {
      break;
    }
    if (board[slidery][sliderx] != '0') {
      if (board[slidery][sliderx][1] == 'B' || board[slidery][sliderx][1] == 'Q') {
        return true;
      } else if (board[slidery][sliderx][1] == 'P' && Math.abs(sliderx-x) == 1) {
        if (color[0] == 'w') {
          return true;
        }
      } else if (board[slidery][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  sliderx = x;
  slidery = y;
  while (1) {
    sliderx += 1;
    slidery += 1;
    if (sliderx > 7 || slidery > 7 || board[slidery][sliderx][0] == color[0]) {
      break;
    }
    if (board[slidery][sliderx] != '0') {
      if (board[slidery][sliderx][1] == 'B' || board[slidery][sliderx][1] == 'Q') {
        return true;
      } else if (board[slidery][sliderx][1] == 'P' && Math.abs(sliderx-x) == 1) {
        if (color[0] == 'b') {
          return true;
        }
      } else if (board[slidery][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  sliderx = x;
  slidery = y;
  while (1) {
    sliderx += 1;
    slidery -= 1;
    if (sliderx > 7 || slidery < 0 || board[slidery][sliderx][0] == color[0]) {
      break;
    }
    if (board[slidery][sliderx] != '0') {
      if (board[slidery][sliderx][1] == 'B' || board[slidery][sliderx][1] == 'Q') {
        return true;
      } else if (board[slidery][sliderx][1] == 'P' && Math.abs(sliderx-x) == 1) {
        if (color[0] == 'w') {
          return true;
        }
      } else if (board[slidery][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }

  sliderx = x;
  slidery = y;
  while (1) {
    sliderx -= 1;
    slidery += 1;
    if (sliderx < 0 || slidery > 7 || board[slidery][sliderx][0] == color[0]) {
      break;
    }
    if (board[slidery][sliderx] != '0') {
      if (board[slidery][sliderx][1] == 'B' || board[slidery][sliderx][1] == 'Q') {
        return true;
      } else if (board[slidery][sliderx][1] == 'P' && Math.abs(sliderx-x) == 1) {
        if (color[0] == 'b') {
          return true;
        }
      } else if (board[slidery][sliderx][1] == 'K' && Math.abs(sliderx-x) == 1) {
        return true;
      } else {
        break;
      }
    }
  }
  // diagonally and pawns

  // knights
  // x+1 , y+2
  if (x+1 <= 7 && y+2 <= 7) {
    if (board[y+2][x+1] != '0' && board[y+2][x+1][0] != color[0] && board[y+2][x+1][1] == 'N') {
      return true;
    }
  }

  // x-1 , y+2
  if (x-1 >= 0 && y+2 <= 7) {
    if (board[y+2][x-1] != '0' && board[y+2][x-1][0] != color[0] && board[y+2][x-1][1] == 'N') {
      return true;
    }
  }

  // x+2 , y+1
  if (x+2 <= 7 && y+1 <= 7) {
    if (board[y+1][x+2] != '0' && board[y+1][x+2][0] != color[0] && board[y+1][x+2][1] == 'N') {
      return true;
    }
  }

  // x+2 , y-1
  if (x+2 <= 7 && y-1 >= 0) {
    if (board[y-1][x+2] != '0' && board[y-1][x+2][0] != color[0] && board[y-1][x+2][1] == 'N') {
      return true;
    }
  }

  // x+1 , y-2
  if (x+1 <= 7 && y-2 >= 0) {
    if (board[y-2][x+1] != '0' && board[y-2][x+1][0] != color[0] && board[y-2][x+1][1] == 'N') {
      return true;
    }
  }

  // x-1 , y-2
  if (x-1 >= 0 && y-2 >= 0) {
    if (board[y-2][x-1] != '0' && board[y-2][x-1][0] != color[0] && board[y-2][x-1][1] == 'N') {
      return true;
    }
  }

  // x-2 , y+1
  if (x-2 >= 0 && y+1 <= 7) {
    if (board[y+1][x-2] != '0' && board[y+1][x-2][0] != color[0] && board[y+1][x-2][1] == 'N') {
      return true;
    }
  }

  // x-2 , y-1
  if (x-2 >= 0 && y-1 >= 0) {
    if (board[y-1][x-2] != '0' && board[y-1][x-2][0] != color[0] && board[y-1][x-2][1] == 'N') {
      return true;
    }
  }
  // knights

  return false;
}