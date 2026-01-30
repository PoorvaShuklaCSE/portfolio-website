// ========== Elements ==========
const sections = document.querySelectorAll(".section");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

// Hire Me popup elements
const hireBtn = document.querySelector("#hireBtn");
const hirePopup = document.querySelector("#hirePopup");
const hireClose = document.querySelector("#hireClose");

// Glow element
const glow = document.querySelector("#glow");

// Typing elements
const typing = document.querySelector("#typing");
const words = ["~Web Developer  ~UI Designer  ~Backend Learner"]; // kept EXACTLY as you wrote
let wi = 0, ci = 0, deleting = false;

const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
const PAUSE_AFTER_TYPE = 1000;


// ========== 1) Scroll reveal sections ==========
function revealOnScroll() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 120) {
      section.classList.add("show");
    }
  });
}


// ========== 2) Active nav link on scroll ==========
function setActiveNavLink() {
  let currentId = "";

  document.querySelectorAll("section.section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = sec.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}


// ========== 3) Navbar background change on scroll ==========
function navbarScrolled() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}


// ========== 4) One scroll listener (same results, cleaner) ==========
window.addEventListener("scroll", () => {
  revealOnScroll();
  setActiveNavLink();
  navbarScrolled();
});


// ========== 5) Mobile menu toggle ==========
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // close menu after clicking any link
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("active"));
  });
}


// ========== 6) Hire Me popup (kept same behavior) ==========
function openHirePopup() {
  if (!hirePopup) return;
  hirePopup.classList.add("show");
  hirePopup.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeHirePopup() {
  if (!hirePopup) return;
  hirePopup.classList.remove("show");
  hirePopup.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (hireBtn && hirePopup && hireClose) {
  hireBtn.addEventListener("click", openHirePopup);
  hireClose.addEventListener("click", closeHirePopup);

  // click outside card closes
  hirePopup.addEventListener("click", (e) => {
    if (e.target === hirePopup) closeHirePopup();
  });

  // ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeHirePopup();
  });
}


// ========== 7) Glow follows mouse ==========
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});


// ========== 8) Typewriter effect (same speeds & pause) ==========
function typeLoop() {
  if (!typing) return;

  const word = words[wi];

  if (!deleting) {
    typing.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      setTimeout(() => deleting = true, PAUSE_AFTER_TYPE);
    }
  } else {
    typing.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? DELETING_SPEED : TYPING_SPEED);
}

typeLoop();


// ========== 9) Trigger initial scroll effects on load ==========
window.dispatchEvent(new Event("scroll"));
