// script.js - burger, search, category navigation, footer year
document.addEventListener('DOMContentLoaded', () => {
  // Burger
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Automatic Slideshow ---
  let slideIndex = 0;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  function showSlides() {
    if (slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 3000); // Change every 3 seconds
  }

  showSlides();
});
