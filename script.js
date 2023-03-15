const str = document.querySelector('.given-text')
const input = document.querySelector('#myInput')
const res = document.querySelector('.res')
const clock = document.querySelector('.clock')

const originalString = str.textContent
const visited = new Array(originalString.length).fill(0)
let words=0, seconds=0, flag=false;
makeHtml(originalString)

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
    const n = p.length;
    if(flag==false){
      updateClock();
    }

    const index = document.querySelector(`p.given-text span.span${n-1}`)

    if(originalString[n-1]===p[n-1]){
        index.classList.add('right')
        if(visited[n-1]===0) words++
    }
    else{
        index.classList.add('wrong')
        index.innerText=p[n-1]
    }
    if(p===originalString || seconds>=10){
        printScore();
        seconds=10;
        input.disabled = true
    } 
    visited[n-1] = 1
    flag = true
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

function printScore(){
    res.innerText=Math.floor((words/seconds)*100);
}

function updateClock(){
    let interval = setInterval(() =>{
        seconds++;
        clock.textContent=seconds;
        if(seconds>10){
            printScore()
            input.disabled = true;
            clearInterval(interval)
            clock.textContent=0;
        }
      },1000)
}
