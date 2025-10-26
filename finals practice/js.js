// ===== Dynamic Greeting (Home Page) =====
document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  if (greeting) {
    const hour = new Date().getHours();
    let message = 'Welcome to ArtCatalog';
    if (hour < 12) message = 'Good Morning, welcome to ArtCatalog!';
    else if (hour < 18) message = 'Good Afternoon, welcome to ArtCatalog!';
    else message = 'Good Evening, welcome to ArtCatalog!';
    greeting.textContent = message;
  }
});

// ===== Responsive Menu Toggle =====
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ===== Signup Form =====
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('signupMessage');

    if (!name || !email || !password) {
      msg.textContent = "Please fill all fields.";
      msg.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      msg.textContent = "Email already exists. Try logging in.";
      msg.style.color = "red";
    } else {
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      msg.textContent = "Account created successfully!";
      msg.style.color = "green";
      signupForm.reset();
    }
  });
}

// ===== Login Form =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const msg = document.getElementById('loginMessage');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      msg.textContent = `Welcome back, ${user.name}!`;
      msg.style.color = "green";
    } else {
      msg.textContent = "Invalid email or password.";
      msg.style.color = "red";
    }
  });
}
