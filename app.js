const str = document.querySelector('.given-text')
const input = document.querySelector('#myInput')
const res = document.querySelector('.wpm')
const clock = document.querySelector('.clock');
const inputLength = input.value;
let over = false;
let flag = 0
const originalString = str.textContent;
const arr = new Array(originalString.length).fill(0);
let correctWords = 0;

makeHtml(originalString)

let count = 60;

function timer() {
  if (count === 0 || over === true) {
    clock.textContent = count;
    input.disabled = true;
    score();
  } else {
    clock.textContent = count;
    count--;
    setTimeout(timer, 1000);
  }
}

input.addEventListener('keydown',(e) => {
    const ptr = input.value
    if(ptr.length===0) return
    if(e.key==='Backspace'){
        const index = document.querySelector(`p.given-text span.span${ptr.length-1}`)
        index.classList.remove('right')
        index.classList.remove('wrong')
        index.innerText=originalString[ptr.length-1]
    }
})

input.addEventListener('input', () => {
    const p = input.value;
    flag++;
    if(flag ===1) setTimeout(timer, 1000)

    const index = document.querySelector(`p.given-text span.span${p.length-1}`)

    if(originalString[p.length-1]===p[p.length-1]){
        index.classList.add('right')
        if(arr[p.length-1]===0) correctWords++;
    }
    else{
        index.classList.add('wrong')
        index.innerText=p[p.length-1]
    }

    if(p === originalString || count===0){
        input.disabled = true;
        over = true;
        return;
    }
    arr[p.length-1]=1;
})

function makeHtml(originalString){
    str.innerHTML=''
    for(let i=0; i<originalString.length; i++){
        const span = document.createElement('span')
        span.textContent = originalString[i];
        span.classList.add(`span${i}`)
        str.insertAdjacentElement('beforeend',span)
    }
}

function score(){
    res.textContent = (correctWords/originalString.length)*100;
}