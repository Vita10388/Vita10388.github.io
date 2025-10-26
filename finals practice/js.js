// script.js - shared across pages
document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle (for mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Dynamic greeting on home page (element id="greeting")
  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = 'Welcome to ArtCatalog';
    if (hour < 12) greeting = 'Good morning — welcome to ArtCatalog';
    else if (hour < 18) greeting = 'Good afternoon — welcome to ArtCatalog';
    else greeting = 'Good evening — welcome to ArtCatalog';
    // If a user is logged in, prefer personalized
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.name) greeting = `Welcome back, ${currentUser.name}!`;
    greetingEl.textContent = greeting;
  }

  // Insert current year in footer spans (if used)
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

  /* -------------------------
     SIGNUP
     - saves list of users to localStorage under 'users'
     - checks for existing email
     ------------------------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const password = (document.getElementById('password') || {}).value || '';
      const out = document.getElementById('signupMessage');
      // simple validation
      if (!name.trim() || !email.trim() || !password.trim()) {
        if (out) { out.textContent = 'Please complete all fields.'; out.className='msg error'; }
        return;
      }
      // get users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        if (out) { out.textContent = 'Email already registered. Try logging in.'; out.className='msg error'; }
        return;
      }
      // create user object (NOTE: simple demo - passwords stored in localStorage are not secure)
      users.push({ name: name.trim(), email: email.trim().toLowerCase(), password: password });
      localStorage.setItem('users', JSON.stringify(users));
      if (out) { out.textContent = 'Account created successfully! You can now log in.'; out.className='msg success'; }
      signupForm.reset();
    });
  }

  /* -------------------------
     LOGIN
     - checks email existence first
     - then verifies password
     - sets localStorage 'currentUser' on success
     ------------------------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (document.getElementById('loginEmail') || {}).value || '';
      const password = (document.getElementById('loginPassword') || {}).value || '';
      const out = document.getElementById('loginMessage');

      if (!email.trim() || !password.trim()) {
        if (out) { out.textContent = 'Please provide email and password.'; out.className='msg error'; }
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        if (out) { out.textContent = 'No account found with that email. Please sign up.'; out.className='msg error'; }
        return;
      }
      if (found.password !== password) {
        if (out) { out.textContent = 'Incorrect password. Try again.'; out.className='msg error'; }
        return;
      }
      // success
      const currentUser = { name: found.name, email: found.email };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (out) { out.textContent = `Welcome back, ${found.name}!`; out.className='msg success'; }

      // Optionally redirect to home after 800ms
      setTimeout(()=> {
        window.location.href = 'index.html';
      }, 800);
    });
  }

  /* -------------------------
     LOGOUT BUTTON (optional)
     If you add a button with id="logoutBtn" it will clear currentUser
     ------------------------- */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    });
  }

}); // DOMContentLoaded end
