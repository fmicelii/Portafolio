// ==============================================
// PORTAFOLIO — Francisco Miceli
// script.js — Animaciones e interactividad
// ==============================================

/* -----------------------------------------------
   1. EFECTO DE TIPEO (Hero tagline)
----------------------------------------------- */
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
    // Pausa antes de borrar
    isDeleting = true;
    typingDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 450;
  }

  setTimeout(typeEffect, typingDelay);
}

/* -----------------------------------------------
   2. MENÚ MÓVIL
----------------------------------------------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen.toString());
});

// Cerrar el menú al hacer click en cualquier link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Cerrar el menú al hacer click fuera
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

/* -----------------------------------------------
   4. NAV LINK ACTIVO según sección visible
----------------------------------------------- */
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

/* -----------------------------------------------
   5. SCROLL REVEAL — IntersectionObserver
----------------------------------------------- */
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

/* -----------------------------------------------
   6. SKILL CARDS — Animación escalonada al entrar
----------------------------------------------- */
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Calcular índice para delay escalonado
        const siblings = Array.from(
          entry.target.parentElement.children
        );
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

/* -----------------------------------------------
   7. PROJECT CARDS — Animación escalonada al entrar
----------------------------------------------- */
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(
          entry.target.parentElement.children
        );
        const idx = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add("visible");
        }, idx * 110);

        projectObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

projectCards.forEach((card) => projectObserver.observe(card));

/* -----------------------------------------------
   8. BOTÓN SCROLL TOP
----------------------------------------------- */
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

/* -----------------------------------------------
   10. PARALLAX SUTIL en el fondo del Hero
----------------------------------------------- */
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

/* -----------------------------------------------
   INICIO
----------------------------------------------- */
// Arrancar el efecto de tipeo con un pequeño delay inicial
setTimeout(typeEffect, 600);

// Verificar scroll inicial por si la página carga con scroll
handleHeaderScroll();
handleScrollTopVisibility();
updateActiveNavLink();
