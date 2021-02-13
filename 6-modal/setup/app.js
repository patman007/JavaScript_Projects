// select modal-btn,modal-overlay,close-btn
const modalBtn = document.querySelector('.modal-btn')
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn');

// listen for click event on modal-btn
modalBtn.addEventListener('click', function() {
    // when user clicks modal-btn add .open-modal to modal-overlay
    modalOverlay.classList.add('open-modal');
    console.log('checked')
})

// listen for click event on close-btn
closeBtn.addEventListener('click', function() {
    // when user clicks close-btn remove .open-modal from modal-overlay
    modalOverlay.classList.remove('open-modal');
    console.log('uncheck')
})
