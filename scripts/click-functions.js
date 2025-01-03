const clickOnPiece = function (piece) {
  switch (piece.type[0]) {
    case "w":

      console.log("white");

      switch (piece.type[1]) {
        case "P":
          console.log("pawn");
          break;
        case "R":
          console.log("rook");
          break;
        case "N":
          console.log("knight");
          break;
        case "B":
          console.log("bishop");
          break;
        case "Q":
          console.log("queen");
          break;
        case "K":
          console.log("king");
          break;
      }

      break;

    case "b":

      console.log("black");

      switch (piece.type[1]) {
        case "P":
          console.log("pawn");
          break;
        case "R":
          console.log("rook");
          break;
        case "N":
          console.log("knight");
          break;
        case "B":
          console.log("bishop");
          break;
        case "Q":
          console.log("queen");
          break;
        case "K":
          console.log("king");
          break;
      }
      
      break;

  }
}