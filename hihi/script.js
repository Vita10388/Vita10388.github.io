// Burger menu toggle
const burger = document.getElementById('burger');
const navList = document.querySelector('.main-nav ul');

burger.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Lightbox functionality
const tiles = document.querySelectorAll('.tile');
const lightbox = document.getElementById('lightbox');
const lbContent = document.getElementById('lb-content');
const lbClose = document.getElementById('lb-close');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    lbContent.innerHTML = '';
    const video = tile.querySelector('video');
    const img = tile.querySelector('img');
    if(video){
      const clone = video.cloneNode(true);
      clone.controls = true;
      clone.autoplay = true;
      lbContent.appendChild(clone);
    } else if(img){
      const clone = img.cloneNode(true);
      lbContent.appendChild(clone);
    }
    lightbox.style.display = 'flex';
  });
});

lbClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lbContent.innerHTML = '';
});

// Search functionality
const searchInput = document.getElementById('gallery-search');
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  tiles.forEach(tile => {
    const category = tile.dataset.category.toLowerCase();
    const creator = tile.dataset.creator.toLowerCase();
    if(category.includes(value) || creator.includes(value)){
      tile.style.display = 'block';
    } else {
      tile.style.display = 'none';
    }
  });
});

// Category filter
const catButtons = document.querySelectorAll('.cat-btn');
catButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    catButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat.toLowerCase();
    tiles.forEach(tile => {
      if(cat === 'all' || tile.dataset.category.toLowerCase() === cat){
        tile.style.display = 'block';
      } else {
        tile.style.display = 'none';
      }
    });
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
