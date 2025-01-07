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
boardHTML = boardHTML.slice(0,corner1+11) + 'sqr-corner1 ' + boardHTML.slice(corner1+11);

const corner2 = boardHTML.indexOf('70');
boardHTML = boardHTML.slice(0,corner2+11) + 'sqr-corner2 ' + boardHTML.slice(corner2+11);

const corner3 = boardHTML.indexOf('77');
boardHTML = boardHTML.slice(0,corner3+11) + 'sqr-corner3 ' + boardHTML.slice(corner3+11);

const corner4 = boardHTML.indexOf('07');
boardHTML = boardHTML.slice(0,corner4+11) + 'sqr-corner4 ' + boardHTML.slice(corner4+11);

const a1 = boardHTML.indexOf('07');
boardHTML = boardHTML.slice(0,a1+11) + 'js-sqr-a1 ' + boardHTML.slice(a1+11);

const b1 = boardHTML.indexOf('17');
boardHTML = boardHTML.slice(0,b1+11) + 'js-sqr-b1 ' + boardHTML.slice(b1+11);

const c1 = boardHTML.indexOf('27');
boardHTML = boardHTML.slice(0,c1+11) + 'js-sqr-c1 ' + boardHTML.slice(c1+11);

const d1 = boardHTML.indexOf('37');
boardHTML = boardHTML.slice(0,d1+11) + 'js-sqr-d1 ' + boardHTML.slice(d1+11);

const e1 = boardHTML.indexOf('47');
boardHTML = boardHTML.slice(0,e1+11) + 'js-sqr-e1 ' + boardHTML.slice(e1+11);

const f1 = boardHTML.indexOf('57');
boardHTML = boardHTML.slice(0,f1+11) + 'js-sqr-f1 ' + boardHTML.slice(f1+11);

const g1 = boardHTML.indexOf('67');
boardHTML = boardHTML.slice(0,g1+11) + 'js-sqr-g1 ' + boardHTML.slice(g1+11);

const h1 = boardHTML.indexOf('77');
boardHTML = boardHTML.slice(0,h1+11) + 'js-sqr-h1 ' + boardHTML.slice(h1+11);

const h2 = boardHTML.indexOf('76');
boardHTML = boardHTML.slice(0,h2+11) + 'js-sqr-h2 ' + boardHTML.slice(h2+11);

const h3 = boardHTML.indexOf('75');
boardHTML = boardHTML.slice(0,h3+11) + 'js-sqr-h3 ' + boardHTML.slice(h3+11);

const h4 = boardHTML.indexOf('74');
boardHTML = boardHTML.slice(0,h4+11) + 'js-sqr-h4 ' + boardHTML.slice(h4+11);

const h5 = boardHTML.indexOf('73');
boardHTML = boardHTML.slice(0,h5+11) + 'js-sqr-h5 ' + boardHTML.slice(h5+11);

const h6 = boardHTML.indexOf('72');
boardHTML = boardHTML.slice(0,h6+11) + 'js-sqr-h6 ' + boardHTML.slice(h6+11);

const h7 = boardHTML.indexOf('71');
boardHTML = boardHTML.slice(0,h7+11) + 'js-sqr-h7 ' + boardHTML.slice(h7+11);

const h8 = boardHTML.indexOf('70');
boardHTML = boardHTML.slice(0,h8+11) + 'js-sqr-h8 ' + boardHTML.slice(h8+11);


boardElement.innerHTML = boardHTML;


document.querySelector('.js-sqr-a1').innerHTML = `<div class="text-a1">a</div>`;
document.querySelector('.js-sqr-b1').innerHTML = `<div class="text-b1">b</div>`;
document.querySelector('.js-sqr-c1').innerHTML = `<div class="text-c1">c</div>`;
document.querySelector('.js-sqr-d1').innerHTML = `<div class="text-d1">d</div>`;
document.querySelector('.js-sqr-e1').innerHTML = `<div class="text-e1">e</div>`;
document.querySelector('.js-sqr-f1').innerHTML = `<div class="text-f1">f</div>`;
document.querySelector('.js-sqr-g1').innerHTML = `<div class="text-g1">g</div>`;
document.querySelector('.js-sqr-h1').innerHTML = `<div class="text-h1">h</div>`;
document.querySelector('.js-sqr-h1').innerHTML += ` <div class="text-h1n">1</div>`;

document.querySelector('.js-sqr-h2').innerHTML = `<p class="text-h2">2</p>`;
document.querySelector('.js-sqr-h3').innerHTML = `<p class="text-h3">3</p>`;
document.querySelector('.js-sqr-h4').innerHTML = `<p class="text-h4">4</p>`;
document.querySelector('.js-sqr-h5').innerHTML = `<p class="text-h5">5</p>`;
document.querySelector('.js-sqr-h6').innerHTML = `<p class="text-h6">6</p>`;
document.querySelector('.js-sqr-h7').innerHTML = `<p class="text-h7">7</p>`;
document.querySelector('.js-sqr-h8').innerHTML = `<p class="text-h8">8</p>`;