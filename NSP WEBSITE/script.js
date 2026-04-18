// ============================================
// NUSANTARA SURYA PANEL - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRELOADER ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 2000);
  });

  // ---- PARTICLES ----
  function createParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.4 + 0.1};
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER / MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Mobile submenu toggles
  document.querySelectorAll('.mobile-nav-link[data-sub]').forEach(link => {
    link.addEventListener('click', () => {
      const subId = link.getAttribute('data-sub');
      const sub = document.getElementById(subId);
      if (sub) {
        sub.classList.toggle('open');
        const arrow = link.querySelector('.m-arrow');
        if (arrow) arrow.style.transform = sub.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-sub-item').forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      const target = el.getAttribute('data-scroll');
      const section = document.getElementById(target);
      if (section) {
        e.preventDefault();
        const offset = 80;
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu if open
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- TYPING EFFECT ----
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['Penerangan Jalan', 'Solar Energy', 'Tiang PJU', 'Smart Lighting'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    function type() {
      const current = words[wordIdx];
      typingEl.textContent = isDeleting
        ? current.substring(0, charIdx - 1)
        : current.substring(0, charIdx + 1);
      if (!isDeleting) charIdx++;
      else charIdx--;
      if (!isDeleting && charIdx === current.length) {
        setTimeout(() => { isDeleting = true; }, 1600);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 60 : 100);
    }
    type();
  }

  // ---- COUNTER ANIMATION ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('id-ID');
    }, 16);
  }

  // ---- SCROLL REVEAL + COUNTER TRIGGER ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Counter
        const counter = entry.target.querySelector('[data-target]');
        if (counter && !counter.classList.contains('counted')) {
          counter.classList.add('counted');
          animateCounter(counter);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  // Stat blocks counter
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('[data-target]');
        if (counter && !counter.classList.contains('counted')) {
          counter.classList.add('counted');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-block').forEach(el => statObserver.observe(el));

  // ---- PRODUCT FILTER ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      productCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- BACK TO TOP ----
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backTop.classList.add('show');
    else backTop.classList.remove('show');
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- FORM SUBMIT ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fname').value;
      const msg = document.getElementById('fmessage').value;
      const product = document.getElementById('fproduct').value;
      const waMsg = encodeURIComponent(`Halo NSP Surabaya,\n\nSaya ${name} ingin menanyakan tentang produk ${product}.\n\n${msg}\n\nTerima kasih.`);
      window.open(`https://wa.me/6281553926665/?text=${waMsg}`, '_blank');
    });
  }

  // ---- PARALLAX ----
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroGrid = document.querySelector('.hero-grid-lines');
    if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.2}px)`;
  });

});
