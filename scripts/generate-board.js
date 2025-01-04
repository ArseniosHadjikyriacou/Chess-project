let HTML = '';
let boardHTML = '';
const boardElement = document.querySelector('.js-board');

for (let y = 0; y < 8; y++) {
  if (y % 2 === 0) {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div id="${x}${y}" class="sqrw sqr${x}${y} js-sqr${x}${y}"></div>`;
      } else {
        HTML = `<div id="${x}${y}" class="sqrb sqr${x}${y} js-sqr${x}${y}"></div>`;
      }
      boardHTML += HTML;
    }
  } else {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div id="${x}${y}" class="sqrb sqr${x}${y} js-sqr${x}${y}"></div>`;
      } else {
        HTML = `<div id="${x}${y}" class="sqrw sqr${x}${y} js-sqr${x}${y}"></div>`;
      }
      boardHTML += HTML;
    }
  }
}

const corner1 = boardHTML.indexOf('00');
boardHTML = boardHTML.slice(0,corner1+2) + ' sqr-corner1' + boardHTML.slice(corner1+2);

const corner2 = boardHTML.indexOf('70');
boardHTML = boardHTML.slice(0,corner2+2) + ' sqr-corner2' + boardHTML.slice(corner2+2);

const corner3 = boardHTML.indexOf('77');
boardHTML = boardHTML.slice(0,corner3+2) + ' sqr-corner3' + boardHTML.slice(corner3+2);

const corner4 = boardHTML.indexOf('07');
boardHTML = boardHTML.slice(0,corner4+2) + ' sqr-corner4' + boardHTML.slice(corner4+2);

boardElement.innerHTML = boardHTML;