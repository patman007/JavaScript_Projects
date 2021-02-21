//Define variables
const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll(".content");

//About Event Listener
about.addEventListener('click', function(e) {
    //Allows us to see the buttons clicked in console
    //console.log(e.target);
    //Event Target used
    const id = e.target.dataset.id;
    console.log(id);
    if(id) {
        //Remove active from other
        //using forEach method
        btns.forEach(function(btn) {
            btn.classList.remove('active');
            e.target.classList.add('active')
        });
        //hide other articles
        //using forEach method
        articles.forEach(function(articles) {
            articles.classList.remove('active')
        })
        const element = document.getElementById(id)
        element.classList.add('active')
    }
})