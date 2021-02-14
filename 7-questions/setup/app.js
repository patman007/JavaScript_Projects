//Way 1
//Using selectors inside the element
const btns = document.querySelectorAll('.question-btn');

//Use forEach loop to go through all selectors of
//questions using question-btn
btns.forEach(function(btn) {

    // traversing the dom
    //Button Event Listener for each element in loop
    //that can be selected for the element(e)
    btn.addEventListener('click', function(e) {

        //e.current.parentElement.parentElement is important to know for future.
        //parent Elements are selected for minus or plus classes
        const question = e.currentTarget.parentElement.parentElement;
        console.log(question);
        question.classList.toggle("show-text");
    });
});

//////////////////////////////////////////////////////////////////////

//Way 2
// //Using selectors inside the element
// const questions = document.querySelectorAll('.question');
// // console.log(questions);

// //Use forEach loop to go through all selectors of
// //questions using question-btn
// questions.forEach(function(question) {
//     const btn = question.querySelector('.question-btn');

//     //console.log(btn);
//     btn.addEventListener('click', function() {
//     console.log(question)

//         //ForEach loop for questions and item is a name we gave
//         questions.forEach(function(item) {
//             // console.log(item)
//             if(item !== question) {
//                 item.classList.remove('show-text')
//             }
//         })
//         question.classList.toggle('show-text');
//     });
// });

