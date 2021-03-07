//Define variables
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

//For Each array to go through each slide
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});


let counter = 0;
//Next Button with counter in positive (right) direction
nextBtn.addEventListener("click", function () {
  counter++;
  console.log(counter,'Next Button')
  carousel();
});

//Previous Button with counter in negative (left) direction
prevBtn.addEventListener("click", function () {
  counter--;
  console.log(counter,'Previous Button')
  carousel();
});


function carousel() {
  // working with slides
  // if (counter === slides.length) {
  //   counter = 0;
  // }
  // if (counter < 0) {
  //   counter = slides.length - 1;
  // }
  // working with buttons

  //IF Statements for previous button and next button
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = "none";
