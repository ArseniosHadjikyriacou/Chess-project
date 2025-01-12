const wP1 = new Pawn("wP",["06"]);
const wP2 = new Pawn("wP",["16"]);
const wP3 = new Pawn("wP",["26"]);
const wP4 = new Pawn("wP",["36"]);
const wP5 = new Pawn("wP",["46"]);
const wP6 = new Pawn("wP",["56"]);
const wP7 = new Pawn("wP",["66"]);
const wP8 = new Pawn("wP",["76"]);

const wR1 = new Rook("wR",["07"]);
const wR2 = new Rook("wR",["77"]);

const wN1 = new Knight("wN",["17"]);
const wN2 = new Knight("wN",["67"]);

const wB1 = new Bishop("wB",["27"]);
const wB2 = new Bishop("wB",["57"]);

const wQ  = new Queen("wQ",["37"]);
const wK  = new King("wK",["47"]);


const bP1 = new Pawn("bP",["01"]);
const bP2 = new Pawn("bP",["11"]);
const bP3 = new Pawn("bP",["21"]);
const bP4 = new Pawn("bP",["31"]);
const bP5 = new Pawn("bP",["41"]);
const bP6 = new Pawn("bP",["51"]);
const bP7 = new Pawn("bP",["61"]);
const bP8 = new Pawn("bP",["71"]);

const bR1 = new Rook("bR",["00"]);
const bR2 = new Rook("bR",["70"]);

const bN1 = new Knight("bN",["10"]);
const bN2 = new Knight("bN",["60"]);

const bB1 = new Bishop("bB",["20"]);
const bB2 = new Bishop("bB",["50"]);

const bQ  = new Queen("bQ",["30"]);
const bK  = new King("bK",["40"]);


pieces = [wP1,wP2,wP3,wP4,wP5,wP6,wP7,wP8,
          wR1,wR2,wN1,wN2,wB1,wB2,wQ,wK,
          bP1,bP2,bP3,bP4,bP5,bP6,bP7,bP8,
          bR1,bR2,bN1,bN2,bB1,bB2,bQ,bK];


boardState = updateBoardState();