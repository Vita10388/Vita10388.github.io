// Update copyright year
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Simple auto-scroll animation for card slider
  const slider = document.querySelector(".card-slider");
  let scrollAmount = 0;

  setInterval(() => {
    slider.scrollBy({ left: 320, behavior: "smooth" });
    scrollAmount += 320;

    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 4000);
});
