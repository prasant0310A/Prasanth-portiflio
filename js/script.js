/* ==========================================================================
   Prasanth P — Portfolio Interactions
   Vanilla JS: particles, typing effect, scroll reveal, nav, counters
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add("hidden"), 2000);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Mobile hamburger ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("mobile-active");
  });
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("mobile-active");
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navAnchors = document.querySelectorAll(".nav-link");
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((sec) => spyObserver.observe(sec));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Typing effect ---------- */
  const typedText = document.getElementById("typedText");
  const roles = [
    "D365 F&O Technical Consultant",
    "X++ Developer",
    "Copilot & MCP Agent Builder",
    "Software Developer",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    if (!typedText) return;
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedText.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  typeLoop();

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          let count = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const tick = () => {
            count += step;
            if (count >= target) {
              el.textContent = target;
            } else {
              el.textContent = count;
              requestAnimationFrame(tick);
            }
          };
          tick();
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Cursor glow (desktop only) ---------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (window.matchMedia("(min-width: 900px)").matches && cursorGlow) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ---------- Contact form (static-site friendly) ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      const mailto = `mailto:praspras6360@gmail.com?subject=${encodeURIComponent(
        subject || `Portfolio message from ${name}`
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

      window.location.href = mailto;
      formStatus.textContent = "Opening your email client…";
      setTimeout(() => (formStatus.textContent = ""), 4000);
      contactForm.reset();
    });
  }

  /* ---------- Particle canvas (hero background) ---------- */
  const canvas = document.getElementById("particleCanvas");
  if (canvas) initParticles(canvas);
});

function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 70;
  const colors = ["255, 138, 61", "255, 182, 115", "91, 140, 255"];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.4 + 0.1,
      driftX: Math.random() * 0.6 - 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - width / 2) / width;
    mouseY = (e.clientY - rect.top - height / 2) / height;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const parallaxX = mouseX * 14;
    const parallaxY = mouseY * 14;

    particles.forEach((p) => {
      p.phase += 0.01;
      const wobble = Math.sin(p.phase) * 0.5;

      p.y -= p.speedY;
      p.x += p.driftX * 0.3 + wobble * 0.1;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x + parallaxX, p.y + parallaxY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color}, 0.6)`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}
