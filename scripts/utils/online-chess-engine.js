// Create a function for sending requests:
async function postChessApi(data = {}) {
  const response = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  });
  return response.json();
}

const generateComputerMove = function() {
  // note: online API does not accept en-passant information in fes format :(
  postChessApi({ fen: fesNotation(boardState) }).then((data) => {
    
    const oldSqr = lettersToNumbers(data.from);
    const newSqr = lettersToNumbers(data.to);

    pieceToMove = Pieces.pieceAtPosition(Number(oldSqr[0]),Number(oldSqr[1]))

    pieceToMove.movePiece(oldSqr,newSqr);

  });

}

const fesNotation = function(board) {
  let fes = '';
  let emptyCounter = 0;

  for(i=0; i<=7; i++) {
    for(j=0; j<=7; j++) {
      if (board[i][j]) {
        if (emptyCounter) {
          fes += String(emptyCounter);
          emptyCounter = 0;
        }
        if (board[i][j][0] === 'b') {
          fes += board[i][j][1].toLowerCase();
        } else {
          fes += board[i][j][1];
        }
      } else {
        emptyCounter++;
      }
    }
    if (emptyCounter) {
      fes += String(emptyCounter);
      emptyCounter = 0;
    }
    fes += '/';
  }

  fes = fes.slice(0, -1);
  fes += ' ' + moveColor + ' ';

  let wK;
  let bK;
  let wR1;
  let wR2;
  let bR1;
  let bR2;
  piecesArray.forEach(element => {
    if (element.id === 'wK') {
      wK = element;
    } else if (element.id === 'bK') {
      bK = element;
    } else if (element.id === 'wR1') {
      wR1 = element;
    } else if (element.id === 'wR2') {
      wR2 = element;
    } else if (element.id === 'bR1') {
      bR1 = element;
    } else if (element.id === 'bR2') {
      bR2 = element;
    }
  });

  let castling = '';

  if (!wK.moved[0] || wK.moved[1] >= moveNum) {
    if (board[7][7] === 'wR2' && (!wR2.moved[0] || wR2.moved[1] >= moveNum)) {
      castling += 'K';
    }
    if (board[7][0] === 'wR1' && (!wR1.moved[0] || wR1.moved[1] >= moveNum)) {
      castling += 'Q';
    }
  }

  if (!bK.moved[0] || bK.moved[1] >= moveNum) {
    if (board[0][7] === 'bR2' && (!bR2.moved[0] || bR2.moved[1] >= moveNum)) {
      castling += 'k';
    }
    if (board[0][0] === 'bR1' && (!bR1.moved[0] || bR1.moved[1] >= moveNum)) {
      castling += 'q';
    }
  }

  if (castling) {
    fes += castling;
  } else {
    fes += '-';
  }

  let enPassant = ' - 0 ';
  // note: online API does not accept en-passant information in fes format :(
  /* piecesArray.forEach(element => {
    if (element.id[1] === 'P') {
      let dir = 0;
      if (element.id[0] === "w") {
        dir = 1;
      } else {
        dir = -1;
      }
      if (element.doublePush[0] && element.doublePush[1] === moveNum-1) {
        enPassant = ' ' + numbersToLetters(element.positions[moveNum][0] + String(Number(element.positions[moveNum][1])+dir)) + ' 0 ';
      }
    }
  }); */
  fes += enPassant;
  fes += Math.floor((moveNum+2)/2);

  return fes;
}

const numbersToLetters = function(xy) {
  const x = xy[0];
  const y = xy[1];
  let coordinates;

  switch(x) {
    case '0':
      coordinates = 'a';
      break;
    case '1':
      coordinates = 'b';
      break;
    case '2':
      coordinates = 'c';
      break;
    case '3':
      coordinates = 'd';
      break;
    case '4':
      coordinates = 'e';
      break;
    case '5':
      coordinates = 'f';
      break;
    case '6':
      coordinates = 'g';
      break;
    default:
      coordinates = 'h';
      break;
  }

  switch(y) {
    case '0':
      coordinates += '8';
      break;
    case '1':
      coordinates += '7';
      break;
    case '2':
      coordinates += '6';
      break;
    case '3':
      coordinates += '5';
      break;
    case '4':
      coordinates += '4';
      break;
    case '5':
      coordinates += '3';
      break;
    case '6':
      coordinates += '2';
      break;
    default:
      coordinates += '1';
      break;
  }

  return coordinates;
}

const lettersToNumbers = function(cr) {
  const c = cr[0];
  const r = cr[1];
  let coordinates;

  switch(c) {
    case 'a':
      coordinates = '0';
      break;
    case 'b':
      coordinates = '1';
      break;
    case 'c':
      coordinates = '2';
      break;
    case 'd':
      coordinates = '3';
      break;
    case 'e':
      coordinates = '4';
      break;
    case 'f':
      coordinates = '5';
      break;
    case 'g':
      coordinates = '6';
      break;
    default:
      coordinates = '7';
      break;
  }

  switch(r) {
    case '1':
      coordinates += '7';
      break;
    case '2':
      coordinates += '6';
      break;
    case '3':
      coordinates += '5';
      break;
    case '4':
      coordinates += '4';
      break;
    case '5':
      coordinates += '3';
      break;
    case '6':
      coordinates += '2';
      break;
    case '7':
      coordinates += '1';
      break;
    default:
      coordinates += '0';
      break;
  }

  return coordinates;
}