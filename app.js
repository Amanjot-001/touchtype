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
    const span = document.createElement('span')
    span.textContent = `|${originalString[0]}`;
    span.classList.add(`span${0}`)
    str.insertAdjacentElement('beforeend', span)
    for (let i = 1; i < originalString.length; i++) {
        const span = document.createElement('span')
        span.textContent = originalString[i];
        span.classList.add(`span${i}`)
        str.insertAdjacentElement('beforeend', span)
    }
}

// hiding the input field
str.addEventListener('click', () => {
    input.focus();
});

input.style.height = '0';
input.style.width = '0';
input.style.border = '0';
input.style.padding = '0';

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

//backspace stuff
input.addEventListener('keydown', (e) => {
    let ptr = input.value;
    let flag = false; // to check if removing notTyped class
    if (ptr.length < 1) return; //if no character is left
    if (e.key === 'Backspace') {
        let index = document.querySelector(`p.given-text span.span${ptr.length - 1}`);
        // remove notTyped class from all chars till the place where space was entered
        while (index.classList.contains('notTyped')) {
            index.classList.remove('notTyped')
            index.innerText = originalString[ptr.length - 1]
            ptr = ptr.slice(0, -1);
            index = document.querySelector(`p.given-text span.span${ptr.length - 1}`);
            flag = true;
        }
        if (flag) { // only if above loop ran
            // index = document.querySelector(`p.given-text span.span${ptr.length-1}`);
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

//handling the input
input.addEventListener('input', (e) => {
    let p = input.value;
    console.log(p);
    if (p.length < 1) {
        let index = document.querySelector(`p.given-text span.span${0}`);
        index.innerText = `|${originalString[0]}`;
        return;
    }
    let index = document.querySelector(`p.given-text span.span${p.length - 1}`);

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

    // if correct word is typed
    if (originalString[p.length - 1] === p[p.length - 1]) {
        if (p.length !== 0) {
            if (p.length > 1) {
                let beforeSpan = document.querySelector(`p.given-text span.span${p.length - 2}`);
                index.textContent = `${index.textContent}|`;
                beforeSpan.textContent = `${beforeSpan.textContent[0]}`;
            }
            else {
                if (index.textContent.length > 1) index.textContent = `${index.textContent[1]}|`;
                else {
                    index.textContent = `${index.textContent[0]}|`;
                }
            }
            index.classList.add('right');
        }
        if (visited[p.length - 1] === 0) correctWords++;
    }
    else {
        // if space is typed b/w word
        if (p[p.length - 1] == ' ') {
            input.value = input.value.slice(0, -1);
            let oneTime = true;
            // add notTyped to all till next word, and copy orginal text
            for (let i = p.length - 1; i < originalString.length; i++) {
                if (originalString[p.length - 1] == ' ') break;
                if (oneTime) {
                    let beforeSpan = document.querySelector(`p.given-text span.span${p.length - 2}`);
                    beforeSpan.textContent = `${beforeSpan.textContent[0]}`;
                }
                oneTime = false;
                index.classList.add('notTyped');
                p += originalString[i];
                input.value += originalString[i];
                index = document.querySelector(`p.given-text span.span${p.length - 1}`);
            }
            index.textContent = `${index.textContent}|`
            input.value += " ";
            index.classList.add('notTyped');
            return;
        }
        if (originalString[p.length - 1] == ' ' && p[p.length - 1] != ' ') {
            console.log(input.value);
            input.value = input.value.slice(0, -1);
            return;
        }
        if (p.length > 1) {
            let beforeSpan = document.querySelector(`p.given-text span.span${p.length - 2}`);
            index.textContent = `${index.textContent}|`;
            beforeSpan.textContent = `${beforeSpan.textContent[0]}`;
        }
        else {
            if (index.textContent.length > 1) index.textContent = `${index.textContent[1]}|`;
            else index.textContent = `${index.textContent[0]}|`;
        }
        index.classList.add('wrong');
        // index.innerText = p[p.length - 1]
    }

    if (p === originalString || count === 0) {
        input.disabled = true;
        over = true;
        score();
        return;
    }
    visited[p.length - 1] = 1;
})
