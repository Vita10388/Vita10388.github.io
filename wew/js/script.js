document.addEventListener("DOMContentLoaded", () => {
  // === Navbar ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // === Greeting & year ===
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = "Welcome to ArtCatalog";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";
    else greeting = "Good evening!";
    greetingEl.textContent = greeting;
  }
  document.querySelectorAll("#year").forEach(y => y.textContent = new Date().getFullYear());

  // === Sign Up ===
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (!email || !password) return alert("Please fill all fields.");

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.email === email)) return alert("Email already registered!");

      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully!");
      window.location.href = "login.html";
    });
  }

  // === Log In ===
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const validUser = users.find(u => u.email === email && u.password === password);

      if (validUser) {
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
});
