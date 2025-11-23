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

  // Search
  const searchInput = document.getElementById('gallery-search');
  function doSearch() {
    const value = (searchInput?.value || '').trim().toLowerCase();
    const tiles = document.querySelectorAll('.tile');
    if (!tiles) return;
    tiles.forEach(tile => {
      const category = (tile.dataset.category || '').toLowerCase();
      const creator = (tile.dataset.creator || '').toLowerCase();
      const title = (tile.dataset.title || tile.querySelector('h3')?.textContent || '').toLowerCase();
      if (!value) {
        tile.style.display = '';
      } else {
        if (category.includes(value) || creator.includes(value) || title.includes(value)) {
          tile.style.display = '';
        } else {
          tile.style.display = 'none';
        }
      }
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', doSearch);
  }

  // Category buttons => scroll to section
  const catButtons = document.querySelectorAll('.cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat || 'all';
      if (cat === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // map category to section id (sluggified)
      const id = cat.toLowerCase().replace(/\s+/g, '-');
      const section = document.getElementById(id) || document.querySelector(`.category-section[data-cat="${cat}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

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
