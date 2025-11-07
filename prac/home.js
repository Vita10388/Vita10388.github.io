document.addEventListener('DOMContentLoaded', () => {
  // Burger menu
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

  // Carousel functionality
  function setupCarousel(id) {
    const track = document.getElementById(`${id}-carousel`);
    const next = document.querySelector(`.carousel-btn.next[data-carousel="${id}"]`);
    const prev = document.querySelector(`.carousel-btn.prev[data-carousel="${id}"]`);

    if (!track || !next || !prev) return;

    const slides = track.querySelectorAll('img');
    let index = 0;
    const maxIndex = slides.length - 4; // 4 visible

    next.addEventListener('click', () => {
      if (index < maxIndex) index++;
      track.style.transform = `translateX(-${index * 25}%)`;
    });

    prev.addEventListener('click', () => {
      if (index > 0) index--;
      track.style.transform = `translateX(-${index * 25}%)`;
    });
  }

  setupCarousel('latest');
  setupCarousel('viewed');
});
