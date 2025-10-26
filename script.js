document.addEventListener("DOMContentLoaded", () => {
  // hamburger toggle: open/close mobile menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.style.display === "block";
      mobileMenu.style.display = isOpen ? "none" : "block";
      mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
    });
    // close menu when link clicked
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      mobileMenu.setAttribute("aria-hidden", "true");
    }));
  }

  // fill year in footer
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  // category filter - show/hide cards by data-cat
  const catButtons = document.querySelectorAll(".cat-btn");
  const artCards = document.querySelectorAll(".art-card");
  function showCategory(cat) {
    artCards.forEach(card => {
      if (cat === "all") card.style.display = "";
      else {
        const c = card.getAttribute("data-cat");
        card.style.display = (c === cat) ? "" : "none";
      }
    });
  }
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-cat");
      showCategory(cat);
      // scroll to grid top on filter (nice UX)
      document.querySelector(".gallery-main").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // default: show all
  showCategory("all");
});
