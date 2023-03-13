const str = document.querySelector('.given-text')
const input = document.querySelector('#myInput')
const res = document.querySelector('.res')

const originalString = str.textContent

input.addEventListener('keydown',(e) => {
    const ptr = input.value
    if(e.key==='Backspace'){
        console.log(ptr)
        const string = str.textContent;
        const chars = string.split('')
        chars[ptr.length-1]=originalString[ptr.length-1]
        str.textContent = chars.join('');
    }
})

input.addEventListener('input', () => {
    const p = input.value;
    const s = str.textContent;
    if(s[p.length]===p[p.length-1]){
        const chars = s.split('')
        chars[p.length-1]=p[p.length-1];
        str.textContent = chars.join('');
    }
    else{
        const chars = s.split('')
        chars[p.length-1]=p[p.length-1];
        str.textContent = chars.join('')
    }
})

function print(){
    const message = document.createElement('p');
    message.innerText = 'correct'
    message.classList.add('.mess');
    res.appendChild(message);
}
