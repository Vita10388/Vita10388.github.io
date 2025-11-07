// script.js - burger, footer year, manual slides for multiple containers
document.addEventListener('DOMContentLoaded', () => {
  // Burger
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav .nav-list');
  if (burger && navList) {
    burger.addEventListener('click', () => navList.classList.toggle('show'));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Manual slideshow groups
  const slideGroups = {};

  document.querySelectorAll('.slideshow-container').forEach(container => {
    const id = container.id;
    const slides = Array.from(container.querySelectorAll('.slide'));
    slideGroups[id] = { slides, index: 1 };
    // show first slide
    showSlidesFor(id, 1);
  });

  // expose plusSlides globally for inline onclick handlers
  window.plusSlides = function(n, id) {
    if (!slideGroups[id]) return;
    slideGroups[id].index += n;
    showSlidesFor(id, slideGroups[id].index);
  };

  function showSlidesFor(id, n) {
    const group = slideGroups[id];
    if (!group) return;
    const slides = group.slides;
    if (slides.length === 0) return;
    if (n > slides.length) group.index = 1;
    if (n < 1) group.index = slides.length;
    slides.forEach(s => s.style.display = 'none');
    slides[group.index - 1].style.display = 'block';
    // add fade class (reflow to restart animation)
    slides[group.index - 1].classList.remove('fade');
    void slides[group.index - 1].offsetWidth;
    slides[group.index - 1].classList.add('fade');
  }
});
