const str = document.querySelector('.given-text');
const input = document.querySelector('#myInput');
const dropdown = document.querySelector('.timerDropdown');
const res = document.querySelector('.wpm');
const clock = document.querySelector('.clock');

const originalString = str.textContent.replace(/\s+/g, ' ').trim(); // trimming all extra spaces from beg, end & b/w.
const visited = new Array(originalString.length).fill(0);

let over = false; // to stop timer if user finished typing
let startTimer = false; // to start timer when user started typing
let correctWords = 0;
let grossWords = 0;

//creating span in each char of given text
makeHtml(originalString);
function makeHtml(originalString){
    str.innerHTML=''
    for(let i=0; i<originalString.length; i++){
        const span = document.createElement('span')
        span.textContent = originalString[i];
        span.classList.add(`span${i}`)
        str.insertAdjacentElement('beforeend',span)
    }
}

//counting total words present in given text
const totalWords = tWords();
function tWords (){
    let words = 0;
    let char_flag = false;
    let space_flag = false;
    for(let ch of originalString){
        if(ch === ' ')
            space_flag = true;
        else
            char_flag = true;
        
        if(char_flag === true && space_flag === true){
            words++;
            char_flag = false;
            space_flag = false;
        } 
    }
    return words+1;
}
console.log(totalWords)

// selecting timer start value
let count = parseInt(dropdown.value);
dropdown.addEventListener('change', ()=> {
    count = parseInt(dropdown.value);
})

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

function score(){
    res.textContent = (correctWords/originalString.length)*100;
}

input.addEventListener('keydown',(e) => {
    const ptr = input.value;
    if(ptr.length===0) return;
    if(e.key==='Backspace'){
        const index = document.querySelector(`p.given-text span.span${ptr.length-1}`);
        index.classList.remove('right')
        index.classList.remove('wrong')
        index.innerText=originalString[ptr.length-1]
    }
})

input.addEventListener('input', () => {
    const p = input.value;
    if(!startTimer){
        setTimeout(timer, 1000);
        startTimer = true;
    }
    const index = document.querySelector(`p.given-text span.span${p.length-1}`);

    if(originalString[p.length-1]===p[p.length-1]){
        if(p.length !== 0)
            index.classList.add('right');
        if(visited[p.length-1]===0) correctWords++;
    }
    else{
        index.classList.add('wrong')
        index.innerText=p[p.length-1]
    }

    if(p === originalString || count===0){
        input.disabled = true;
        over = true;
        score();
        return;
    }
    visited[p.length-1]=1;
})
