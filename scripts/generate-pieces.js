const wP1 = new Piece("wP","06","06");
const wP2 = new Piece("wP","16","16");
const wP3 = new Piece("wP","26","26");
const wP4 = new Piece("wP","36","36");
const wP5 = new Piece("wP","46","46");
const wP6 = new Piece("wP","56","56");
const wP7 = new Piece("wP","66","66");
const wP8 = new Piece("wP","76","76");

const wR1 = new Piece("wR","07","07");
const wR2 = new Piece("wR","77","77");

const wN1 = new Piece("wN","17","17");
const wN2 = new Piece("wN","67","67");

const wB1 = new Piece("wB","27","27");
const wB2 = new Piece("wB","57","57");

const wQ  = new Piece("wQ","37","37");
const wK  = new Piece("wK","47","47");


const bP1 = new Piece("bP","01","01");
const bP2 = new Piece("bP","11","11");
const bP3 = new Piece("bP","21","21");
const bP4 = new Piece("bP","31","31");
const bP5 = new Piece("bP","41","41");
const bP6 = new Piece("bP","51","51");
const bP7 = new Piece("bP","61","61");
const bP8 = new Piece("bP","71","71");

const bR1 = new Piece("bR","00","00");
const bR2 = new Piece("bR","70","70");

const bN1 = new Piece("bN","10","10");
const bN2 = new Piece("bN","60","60");

const bB1 = new Piece("bB","20","20");
const bB2 = new Piece("bB","50","50");

const bQ  = new Piece("bQ","30","30");
const bK  = new Piece("bK","40","40");


const pieces = [wP1,wP2,wP3,wP4,wP5,wP6,wP7,wP8,
                wR1,wR2,wN1,wN2,wB1,wB2,wQ,wK,
                bP1,bP2,bP3,bP4,bP5,bP6,bP7,bP8,
                bR1,bR2,bN1,bN2,bB1,bB2,bQ,bK]


pieces.forEach( pieceObject => {
  pieceObject.startingPosition();
}
);