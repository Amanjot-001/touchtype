const str = document.querySelector('.given-text')
const input = document.querySelector('#myInput')
const res = document.querySelector('.res')

const originalString = str.textContent
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
    if(p.length===0) return
    if(originalString[p.length-1]===p[p.length-1]){
        const index = document.querySelector(`p.given-text span.span${p.length-1}`)
        index.classList.add('right')

    }
    else{
        const index = document.querySelector(`p.given-text span.span${p.length-1}`)
        index.classList.add('wrong')
        index.innerText=p[p.length-1]
    }
})

function print(){
    const message = document.createElement('p');
    message.innerText = 'correct'
    message.classList.add('.mess');
    res.appendChild(message);
}

function makeHtml(originalString){
    str.innerHTML=''
    for(let i=0; i<originalString.length; i++){
        const span = document.createElement('span')
        span.textContent = originalString[i];
        span.classList.add(`span${i}`)
        str.insertAdjacentElement('beforeend',span)
    }
    console.log(str)
}