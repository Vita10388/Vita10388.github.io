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
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
  showSlides();
