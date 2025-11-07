document.addEventListener('DOMContentLoaded', () => {
  // BURGER MENU
  const burger = document.getElementById('burger');
  const navList = document.querySelector('.main-nav ul');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // FOOTER YEAR
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // MANUAL SLIDESHOW FUNCTION
  const slideGroups = {};
  document.querySelectorAll('.slideshow-container').forEach(container => {
    const slides = container.querySelectorAll('.slide');
    slideGroups[container.id] = {slides, index: 1};
    showSlides(container.id, 1);
  });

  window.plusSlides = function(n, id) {
    showSlides(id, slideGroups[id].index += n);
  };

  function showSlides(id, n) {
    const group = slideGroups[id];
    if (!group) return;
    const slides = group.slides;
    if (n > slides.length) group.index = 1;
    if (n < 1) group.index = slides.length;
    slides.forEach(slide => slide.style.display = 'none');
    slides[group.index - 1].style.display = 'block';
  }
});
