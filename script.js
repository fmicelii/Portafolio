// portafolio — francisco miceli

// efecto de tipeo
const typedTextEl = document.getElementById("typed-text");

const phrases = [
  "Técnico en Computación",
  "Full Stack Junior",
  "Aprendizaje Constante 🚀",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedTextEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 55;
  } else {
    typedTextEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 115;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 450;
  }

  setTimeout(typeEffect, typingDelay);
}

// menú móvil
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen.toString());
});

// cerrar al hacer click en un link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// cerrar al hacer click fuera
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* -----------------------------------------------
   3. HEADER: Cambio de fondo al hacer scroll
----------------------------------------------- */
const header = document.getElementById("header");

function handleHeaderScroll() {
  if (window.scrollY > 60) {
    header.style.background = "rgba(15, 10, 6, 0.99)";
  } else {
    header.style.background = "rgba(15, 10, 6, 0.92)";
  }
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });

// nav link activo según sección visible
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function updateActiveNavLink() {
  const scrollMid = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      if (scrollMid >= sectionTop && scrollMid < sectionBottom) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });

// scroll reveal
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealItems.forEach((el) => revealObserver.observe(el));

// skill cards — animación escalonada
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add("visible");
        }, idx * 90);

        skillObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  }
);

skillCards.forEach((card) => skillObserver.observe(card));

// scroll top
const scrollTopBtn = document.getElementById("scroll-top");

function handleScrollTopVisibility() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", handleScrollTopVisibility, { passive: true });

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// parallax sutil en el hero
const heroGlows = document.querySelectorAll(".hero__glow");

function handleHeroParallax() {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroGlows.forEach((glow, i) => {
      const factor = i === 0 ? 0.2 : -0.15;
      glow.style.transform = `translateY(${scrolled * factor}px)`;
    });
  }
}

window.addEventListener("scroll", handleHeroParallax, { passive: true });

// inicio
setTimeout(typeEffect, 600);
handleHeaderScroll();
handleScrollTopVisibility();
updateActiveNavLink();
