//Set initial count
let count = 0;

//Select value and buttons
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');

//FOR EACH LOOP
btns.forEach(function(btn) {
    console.log(btn)
    btn.addEventListener('click', function(e) {
        //Select target as classList
        const styles = e.currentTarget.classList;
        console.log(styles);
        if (styles.contains('decrease')) {
            count--;

        } else if(styles.contains('increase')) {
            count++;

        } else {
            //Reset the count
            count = 0;
        }

        //Negative, Positive, and Zero
        if (count > 0) {
            value.style.color = 'green';

        } else if (count < 0){
            value.style.color ='red';

        } else{
            value.style.color = 'black'
        }
        value.textContent = count;
    });
})



console.log(btns);


