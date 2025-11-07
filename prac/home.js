document.addEventListener('DOMContentLoaded', () => {
  // Burger Menu
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Manual Slideshow Logic
  const slideGroups = {};
  document.querySelectorAll('.slideshow-container').forEach(container => {
    const slides = container.querySelector('.slide-row');
    slideGroups[container.id] = { slides, index: 0 };
  });

  window.plusSlides = function(n, id) {
    const group = slideGroups[id];
    if (!group) return;
    const slideRow = group.slides;
    const totalSlides = slideRow.children.length;
    group.index = (group.index + n + totalSlides) % totalSlides;
    slideRow.style.transform = `translateX(-${group.index * 25}%)`;
  };
});
