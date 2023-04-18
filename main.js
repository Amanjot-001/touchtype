const boat = document.querySelector('.boat');
const buttons = document.querySelector('.navbar-nav');
const wKey = document.querySelector('.w-key');
const aKey = document.querySelector('.a-key');
const sKey = document.querySelector('.s-key');
const dKey = document.querySelector('.d-key');
const bubbles = document.querySelector('.bubbles');


//for typewriter effect
const infoText = document.querySelector('.info-text');
const text = infoText.innerText;
infoText.innerHTML='';
for( let i=0; i<text.length; i++){
    const span = document.createElement('span');
    span.textContent = text[i];
    span.classList.add('opac');
    infoText.insertAdjacentElement('beforeend', span);
}
const spans = document.querySelectorAll('.info-text span');
let index = 0;

function revealText() {
    if (index >= spans.length) return;
    spans[index].classList.remove('opac');
    index++;
    setTimeout(revealText, 295);
}

setTimeout(() => {
    revealText();
  }, 2000);

// to hide when scrolling is not done
dKey.classList.add('hide');
sKey.classList.add('hide');
bubbles.classList.add('hide');

window.addEventListener('scroll', () => {
    // nav buttons
    if (window.scrollY > 1400)
        buttons.classList.add('hide');
    else
        buttons.classList.remove('hide');

    const value = window.scrollY;
    boat.style.marginRight = value * 1.25 + 'px';  // boat moving

    // to hide s and d before moving
    if (window.scrollY < 150) {
        dKey.classList.add('hide');
        sKey.classList.add('hide');
    }
    else {
        dKey.classList.remove('hide');
        sKey.classList.remove('hide');
    }

    // to hide bubbles before moving
    if (window.scrollY < 270)
        bubbles.classList.add('hide');
    else
        bubbles.classList.remove('hide');

    // bubbles moving
    if (window.scrollY > 270 && window.scrollY < 897) {
        bubbles.style.marginTop = (value - 270) * 1 + 'px';
    }

    // wasd moving
    if (window.scrollY < 897)
        wKey.style.marginTop = value * 1 + 'px';
    if (window.scrollY > 72 && window.scrollY < 948)
        aKey.style.marginTop = (value - 72) * 1 + 'px';
    if (window.scrollY > 144 && window.scrollY < 1020)
        sKey.style.marginTop = (value - 144) * 1 + 'px';
    if (window.scrollY > 213 && window.scrollY < 1090)
        dKey.style.marginTop = (value - 216) * 1 + 'px';
})

// to delay each card animation
// const cards = document.querySelectorAll('#about .card');

// cards.forEach((card) => {
//     const delay = Math.floor(Math.random() * 1000);

//     card.style.animationDelay = `${delay}ms`;
// });