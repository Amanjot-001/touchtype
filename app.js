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
function makeHtml(originalString) {
    str.innerHTML = ''
    for (let i = 0; i < originalString.length; i++) {
        const span = document.createElement('span')
        span.textContent = originalString[i];
        span.classList.add(`span${i}`)
        str.insertAdjacentElement('beforeend', span)
    }
}

//counting total words present in given text
const totalWords = tWords();
function tWords() {
    let words = 0;
    let char_flag = false;
    let space_flag = false;
    for (let ch of originalString) {
        if (ch === ' ')
            space_flag = true;
        else
            char_flag = true;

        if (char_flag === true && space_flag === true) {
            words++;
            char_flag = false;
            space_flag = false;
        }
    }
    return words + 1;
}
// console.log(totalWords)

// selecting timer start value
let count = parseInt(dropdown.value);
dropdown.addEventListener('change', () => {
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

function score() {
    res.textContent = (correctWords / originalString.length) * 100;
}

input.addEventListener('keydown', (e) => {
    let ptr = input.value;
    let flag = false; // to check if removing notTyped class
    if (e.key === 'Backspace') {
        let index = document.querySelector(`p.given-text span.span${ptr.length - 1}`);
        // remove notTyped class from all chars till the place where space was entered
        while (index.classList.contains('notTyped')) {
            index.classList.remove('notTyped')
            index.innerText = originalString[ptr.length - 1]
            ptr = ptr.slice(0, -1);
            // console.log(ptr);
            index = document.querySelector(`p.given-text span.span${ptr.length - 1}`);
            flag = true;
        }
        if (flag) { // only if above loop ran
            // index = document.querySelector(`p.given-text span.span${ptr.length}`);
            input.value = ptr;
            input.value += originalString[ptr.length - 1]
        }
        else { // remove classes
            index.classList.remove('right')
            index.classList.remove('wrong')
            index.innerText = originalString[ptr.length - 1]
        }
    }
})

let p = '';

input.addEventListener('input', (e) => {
    // p += input.value[input.value.length-1];
    p = input.value;
    if (p[0] == ' ') { // to prevent typing space in start
        p = '';
        input.value = '';
        return;
    }
    if (p[p.length - 1] == ' ' && p[p.length - 2] == ' ') { // to prevent typing consecutive spaces
        input.value = input.value.slice(0, -1)
        return;
    }
    if (!startTimer) {
        setTimeout(timer, 1000);
        startTimer = true;
    }
    let index = document.querySelector(`p.given-text span.span${p.length - 1}`);

    if (originalString[p.length - 1] === p[p.length - 1]) {
        if (p.length !== 0)
            index.classList.add('right');
        if (visited[p.length - 1] === 0) correctWords++;
    }
    else {
        // if space is typed b/w word
        if (p[p.length - 1] == ' ') {
            input.value = input.value.slice(0, -1);
            // add notTyped to all till next word, and copy orginal text
            for (let i = p.length - 1; i < originalString.length; i++) {
                if (originalString[p.length - 1] == ' ') break;
                index.classList.add('notTyped');
                p += originalString[i];
                input.value += originalString[i];
                index = document.querySelector(`p.given-text span.span${p.length - 1}`);
            }
            input.value += " ";
            index.classList.add('notTyped');
            return;
        }
        index.classList.add('wrong')
        index.innerText = p[p.length - 1]
    }

    if (p === originalString || count === 0) {
        input.disabled = true;
        over = true;
        score();
        return;
    }
    visited[p.length - 1] = 1;
})