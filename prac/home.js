document.addEventListener("DOMContentLoaded", () => {
  // Burger
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');
  burger?.addEventListener('click', () => navList.classList.toggle('show'));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Manual horizontal slides
  const slideshows = document.querySelectorAll('.slideshow-container');
  const state = {};

  slideshows.forEach(container => {
    const wrapper = container.querySelector('.slides-wrapper');
    const slides = wrapper.querySelectorAll('img');
    const id = container.id;
    state[id] = { index: 0, total: slides.length, wrapper };
    updateSlide(id);
  });

  window.plusSlides = function (n, id) {
    const s = state[id];
    s.index = (s.index + n + s.total) % s.total;
    updateSlide(id);
  };

  function updateSlide(id) {
    const s = state[id];
    const offset = -s.index * 100;
    s.wrapper.style.transform = `translateX(${offset}%)`;
  }
});
