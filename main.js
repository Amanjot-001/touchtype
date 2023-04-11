const boat = document.querySelector('.boat');

window.addEventListener('scroll', () => {
    const value = window.scrollY;
    boat.style.marginRight = value * 1.25 + 'px';
})