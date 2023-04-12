const boat = document.querySelector('.boat');
// const fishes = document.querySelector('.fishes');
const buttons = document.querySelector('.navbar-nav');

window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if(window.scrollY > 1400)
        buttons.classList.add('hide');
    else
        buttons.classList.remove('hide');

    const value = window.scrollY;
    boat.style.marginRight = value * 1.25 + 'px';

    // var fishesWrapper = document.getElementById("fishes-wrapper");
    // var fishesWrapperTop = fishesWrapper.getBoundingClientRect().top;
    // var fishesWrapperBottom = fishesWrapper.getBoundingClientRect().bottom;
    
    // // Check if the fishes wrapper is visible on scroll
    // if(fishesWrapperTop < window.innerHeight && fishesWrapperBottom >= 0){
    //     const value2 = window.scrollY - fishesWrapperTop; // scroll value after the fishes is visible
    //     fishes.style.marginRight = value2 * 0.4 + 'px';
    // }
})

// to delay each card animation
const cards = document.querySelectorAll('#about .card');    

cards.forEach((card) => {
  const delay = Math.floor(Math.random() * 1000);
  
  card.style.animationDelay = `${delay}ms`;
});