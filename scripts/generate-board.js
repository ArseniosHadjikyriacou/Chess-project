let HTML = '';
let boardHTML = '';
const boardElement = document.querySelector('.js-board');

for (let y = 0; y < 8; y++) {
  if (y % 2 === 0) {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div class="sqrw sqr${x}${y}">sqr${x}${y}</div>`;
      } else {
        HTML = `<div class="sqrb sqr${x}${y}">sqr${x}${y}</div>`;
      }
      boardHTML += HTML;
    }
  } else {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div class="sqrb sqr${x}${y}">sqr${x}${y}</div>`;
      } else {
        HTML = `<div class="sqrw sqr${x}${y}">sqr${x}${y}</div>`;
      }
      boardHTML += HTML;
    }
  }
}

boardElement.innerHTML = boardHTML;