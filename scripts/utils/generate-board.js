let HTML = '';
let boardHTML = '';
const boardElement = document.querySelector('.js-board');

for (let y = 0; y < 8; y++) {
  if (y % 2 === 0) {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div class="sqrw js-sqr-${x}${y}" data-sqr-position="${x}${y}"></div>`;
      } else {
        HTML = `<div class="sqrb js-sqr-${x}${y}" data-sqr-position="${x}${y}"></div>`;
      }
      boardHTML += HTML;
    }
  } else {
    for (let x = 0; x < 8; x++) {
      if (x % 2 === 0) {
        HTML = `<div class="sqrb js-sqr-${x}${y}" data-sqr-position="${x}${y}"></div>`;
      } else {
        HTML = `<div class="sqrw js-sqr-${x}${y}" data-sqr-position="${x}${y}"></div>`;
      }
      boardHTML += HTML;
    }
  }
}

boardElement.innerHTML = boardHTML;

document.querySelector('.js-sqr-00').classList.add('sqr-corner1');
document.querySelector('.js-sqr-70').classList.add('sqr-corner2');
document.querySelector('.js-sqr-77').classList.add('sqr-corner3');
document.querySelector('.js-sqr-07').classList.add('sqr-corner4');

document.querySelector('.js-sqr-07').classList.add('js-sqr-a1');
document.querySelector('.js-sqr-17').classList.add('js-sqr-b1');
document.querySelector('.js-sqr-27').classList.add('js-sqr-c1');
document.querySelector('.js-sqr-37').classList.add('js-sqr-d1');
document.querySelector('.js-sqr-47').classList.add('js-sqr-e1');
document.querySelector('.js-sqr-57').classList.add('js-sqr-f1');
document.querySelector('.js-sqr-67').classList.add('js-sqr-g1');
document.querySelector('.js-sqr-77').classList.add('js-sqr-h1');
document.querySelector('.js-sqr-76').classList.add('js-sqr-h2');
document.querySelector('.js-sqr-75').classList.add('js-sqr-h3');
document.querySelector('.js-sqr-74').classList.add('js-sqr-h4');
document.querySelector('.js-sqr-73').classList.add('js-sqr-h5');
document.querySelector('.js-sqr-72').classList.add('js-sqr-h6');
document.querySelector('.js-sqr-71').classList.add('js-sqr-h7');
document.querySelector('.js-sqr-70').classList.add('js-sqr-h8');

document.querySelector('.js-sqr-a1').innerHTML = '<div class="text-a1">a</div>';
document.querySelector('.js-sqr-b1').innerHTML = '<div class="text-b1">b</div>';
document.querySelector('.js-sqr-c1').innerHTML = '<div class="text-c1">c</div>';
document.querySelector('.js-sqr-d1').innerHTML = '<div class="text-d1">d</div>';
document.querySelector('.js-sqr-e1').innerHTML = '<div class="text-e1">e</div>';
document.querySelector('.js-sqr-f1').innerHTML = '<div class="text-f1">f</div>';
document.querySelector('.js-sqr-g1').innerHTML = '<div class="text-g1">g</div>';
document.querySelector('.js-sqr-h1').innerHTML = '<div class="text-h1">h</div>';
document.querySelector('.js-sqr-h1').innerHTML += '<div class="text-h1n">1</div>';

document.querySelector('.js-sqr-h2').innerHTML = '<p class="text-h2">2</p>';
document.querySelector('.js-sqr-h3').innerHTML = '<p class="text-h3">3</p>';
document.querySelector('.js-sqr-h4').innerHTML = '<p class="text-h4">4</p>';
document.querySelector('.js-sqr-h5').innerHTML = '<p class="text-h5">5</p>';
document.querySelector('.js-sqr-h6').innerHTML = '<p class="text-h6">6</p>';
document.querySelector('.js-sqr-h7').innerHTML = '<p class="text-h7">7</p>';
document.querySelector('.js-sqr-h8').innerHTML = '<p class="text-h8">8</p>';