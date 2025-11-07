// home.js
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

  // ---------- Carousel setup ----------
  function setupCarousel(id) {
    const container = document.querySelector(`#${id}-carousel`)?.parentElement; // the .carousel-container
    const track = document.getElementById(`${id}-carousel`);
    const nextBtn = document.querySelector(`.carousel-btn.next[data-carousel="${id}"]`);
    const prevBtn = document.querySelector(`.carousel-btn.prev[data-carousel="${id}"]`);
    if (!track || !nextBtn || !prevBtn || !container) return;

    const slides = Array.from(track.querySelectorAll('img'));
    let index = 0;
    let visibleCount = 1;
    let slideOffset = 0; // px to move per index

    function calculateMetrics() {
      if (slides.length === 0) return;
      // measure first slide width + horizontal margins
      const first = slides[0];
      const style = window.getComputedStyle(first);
      const marginLeft = parseFloat(style.marginLeft) || 0;
      const marginRight = parseFloat(style.marginRight) || 0;
      const slideWidth = first.getBoundingClientRect().width + marginLeft + marginRight;
      // visible count = how many slides fit in container width
      visibleCount = Math.max(1, Math.floor(container.getBoundingClientRect().width / slideWidth));
      slideOffset = slideWidth;
      // ensure index not out of bounds
      const maxIndex = Math.max(0, slides.length - visibleCount);
      if (index > maxIndex) index = maxIndex;
      updateTrack();
    }

    function updateTrack() {
      const moveX = index * slideOffset;
      track.style.transform = `translateX(-${moveX}px)`;
      // disable buttons at edges for clarity
      const maxIndex = Math.max(0, slides.length - visibleCount);
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex;
      prevBtn.style.opacity = prevBtn.disabled ? '0.4' : '0.95';
      nextBtn.style.opacity = nextBtn.disabled ? '0.4' : '0.95';
    }

    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, slides.length - visibleCount);
      if (index < maxIndex) index++;
      updateTrack();
    });

    prevBtn.addEventListener('click', () => {
      if (index > 0) index--;
      updateTrack();
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      // debounce
      clearTimeout(container._carouselResizeTimeout);
      container._carouselResizeTimeout = setTimeout(calculateMetrics, 80);
    });

    // initial calc
    calculateMetrics();
  }

  setupCarousel('latest');
  setupCarousel('viewed');
});
