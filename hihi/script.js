// Smooth scroll reveal for each section
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
});

// Add animation class
const style = document.createElement('style');
style.innerHTML = `
section {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;
}
section.visible {
  opacity: 1;
  transform: translateY(0);
}`;
document.head.appendChild(style);
