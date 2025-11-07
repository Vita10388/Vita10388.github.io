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
// ------------ SLIDESHOWS ------------
const slideshows = {
  latest: { index: 1 },
  viewed: { index: 1 }
};

function showSlides(n, id) {
  const slideshow = document.getElementById(`${id}-slideshow`);
  const slides = slideshow.getElementsByClassName("mySlides");
  const dotsContainer = document.getElementById(`${id}-dots`);

  if (n > slides.length) slideshows[id].index = 1;
  if (n < 1) slideshows[id].index = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

  // create dots if not created
  if (dotsContainer.childElementCount === 0) {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        showSlides((slideshows[id].index = i + 1), id);
      });
      dotsContainer.appendChild(dot);
    }
  }

  const dots = dotsContainer.getElementsByClassName("dot");
  for (let d of dots) d.classList.remove("active-dot");

  slides[slideshows[id].index - 1].style.display = "block";
  dots[slideshows[id].index - 1].classList.add("active-dot");
}

function plusSlides(n, id) {
  showSlides((slideshows[id].index += n), id);
}

// initialize
document.addEventListener("DOMContentLoaded", () => {
  showSlides(1, "latest");
  showSlides(1, "viewed");
});

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
