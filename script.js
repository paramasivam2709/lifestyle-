let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots span");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
  index = i;
}

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);

// MOBILE MENU
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}


// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

document.querySelector(".load-more-btn").addEventListener("click", () => {
  alert("Load more posts (dynamic loading can be added)");
});
