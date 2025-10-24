// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? 'none' : 'block';
    });
  }

  // 2) Dynamic greeting
  const greet = document.getElementById('greeting');
  if(greet){
    const h = new Date().getHours();
    const greetingText = h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
    greet.textContent = `${greetingText} — welcome to ArtCatalog`;
  }

  // 3) Footer year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // 4) Simple latest-art auto-rotate
  const latest = document.getElementById('latest-list');
  if(latest){
    const cards = Array.from(latest.querySelectorAll('.art-card'));
    let idx = 0;
    if(cards.length > 0){
      setInterval(()=>{
        cards.forEach((c,i) => c.style.opacity = i===idx ? '1' : '0.3');
        idx = (idx+1) % cards.length;
      }, 3000);
    }
  }
});
