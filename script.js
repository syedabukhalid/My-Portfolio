document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Role Typing Animation Implementation
  const typedRoleElement = document.getElementById('typedRole');
  if (typedRoleElement) {
    const roles = [
      "Software Developer",
      "Specializing in Agentic AI integrations",
      "Data Analyst",
      "Cybersecurity enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBetween = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseBetween;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 500;
      }

      setTimeout(typeEffect, timeout);
    }

    typeEffect();
  }

  // Global reference for tsParticles instance
  let particlesInstance = null;

  // Helper function to dynamically calculate theme color hex values
  const getParticleColor = (isLight) => {
    return isLight ? '#0077b6' : '#00ff87';
  };

  // Helper function to update logos depending on active theme
  const updateLogosForTheme = (isLight) => {
    // Certifications & Slider Section Logos
    const oracleLogos = document.querySelectorAll('img[src*="Oracle_d_logo"], img[src*="Oracle_l_logo"]');
    const anthropicLogos = document.querySelectorAll('img[src*="Anthropic_d_logo"], img[src*="Anthropic_l_logo"]');
    const ciscoLogos = document.querySelectorAll('img[src*="Cisco_logo"], img[src*="Cisco_l_logo"]');
    const ibmLogos = document.querySelectorAll('img[src*="IBM_logo"], img[src*="IBM_lt_logo"]');

    oracleLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/Oracle_l_logo.png' : 'Logos/Oracle_d_logo.webp';
    });
    anthropicLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/Anthropic_l_logo.png' : 'Logos/Anthropic_d_logo.png';
    });
    ciscoLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/Cisco_l_logo.png' : 'Logos/Cisco_logo.webp';
    });
    ibmLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/IBM_lt_logo.png' : 'Logos/IBM_logo.webp';
    });

    // Education & Slider Section Logos
    const iceLogos = document.querySelectorAll('img[src*="ICE_dt_1"], img[src*="ICE_lt_1"]');
    const olevelsLogos = document.querySelectorAll('img[src*="Olevels_dt_logo"], img[src*="olevels_lt_logo"]');

    iceLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/ICE_lt_1.png' : 'Logos/ICE_dt_1.png';
    });

    olevelsLogos.forEach(logo => {
      logo.src = isLight ? 'Logos/olevels_lt_logo.png' : 'Logos/Olevels_dt_logo.png';
    });
  };

  // Function to initialize tsParticles Neural Network Grid
  const initTsParticles = (isLight) => {
    if (typeof tsParticles === 'undefined') return;

    const particleColor = getParticleColor(isLight);

    tsParticles.load("tsparticles", {
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: {
          value: 65,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: particleColor
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: { min: 1.5, max: 3.5 }
        },
        links: {
          enable: true,
          distance: 140,
          color: particleColor,
          opacity: 0.35,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce"
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "attract"]
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.75
            }
          },
          attract: {
            distance: 220,
            duration: 0.4,
            factor: 3,
            speed: 1
          }
        }
      },
      detectRetina: true
    }).then(container => {
      particlesInstance = container;
    });
  };

  // Setup Profile Picture Gravity Attraction to Node Lines
  const setupProfileAttraction = () => {
    const profilePic = document.getElementById('profilePic');
    if (!profilePic) return;

    profilePic.addEventListener('mousemove', (e) => {
      if (!particlesInstance) return;
      const rect = profilePic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Pulse particle links attraction towards profile picture center
      if (particlesInstance.particles && particlesInstance.particles.quadTree) {
        const particlesList = particlesInstance.particles.filter();
        particlesList.forEach(p => {
          const dx = centerX - p.position.x;
          const dy = centerY - p.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            p.velocity.x += (dx / dist) * 0.15;
            p.velocity.y += (dy / dist) * 0.15;
          }
        });
      }
    });
  };

  // 0. Dark / Light Mode Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve existing user setting from LocalStorage or default to dark mode
  const savedTheme = localStorage.getItem('theme');
  const isInitialLight = savedTheme === 'light';

  if (isInitialLight) {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
    updateLogosForTheme(true);
  }

  // Initialize particles with active theme setting
  initTsParticles(isInitialLight);
  setupProfileAttraction();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const isLight = currentTheme !== 'light';

      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
        updateLogosForTheme(false);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
        updateLogosForTheme(true);
      }

      // Re-initialize particle background colors according to theme
      initTsParticles(isLight);
    });
  }

  // 1. Mobile Navigation Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navLinks.classList.toggle('nav-active');
    });

    // Close mobile menu automatically when a link is clicked
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('nav-active');
      });
    });
  }

  // 2. Rotate Profile Gear Ring on Scroll (Optimized for Mobile Smoothness)
  const gearRing = document.querySelector('.gear-ring');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (gearRing && !ticking) {
      window.requestAnimationFrame(() => {
        const scrollAngle = window.scrollY * 0.4;
        gearRing.style.setProperty('--gear-angle', `${scrollAngle}deg`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 3. Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Certificate & Snapshot Lightbox Modal logic (Grouped Per Provider)
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imgFull');
  const certImages = document.querySelectorAll('.cert-modal-trigger');
  const closeModal = document.querySelector('.modal-close');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');

  let currentModalGroup = [];
  let currentModalIndex = 0;

  function openModalWithGroup(group, index) {
    if (!modal || !modalImg || group.length === 0) return;
    currentModalGroup = group;
    currentModalIndex = index;
    modalImg.src = currentModalGroup[currentModalIndex].src;
    modal.style.display = 'flex';
  }

  function showNextModalImage() {
    if (currentModalGroup.length === 0) return;
    currentModalIndex = (currentModalIndex + 1) % currentModalGroup.length;
    modalImg.src = currentModalGroup[currentModalIndex].src;
  }

  function showPrevModalImage() {
    if (currentModalGroup.length === 0) return;
    currentModalIndex = (currentModalIndex - 1 + currentModalGroup.length) % currentModalGroup.length;
    modalImg.src = currentModalGroup[currentModalIndex].src;
  }

  // Bind certificate triggers scoped strictly within their respective provider block (.cert-provider)
  certImages.forEach((img) => {
    img.addEventListener('click', () => {
      const providerContainer = img.closest('.cert-provider') || img.closest('.section') || document;
      const group = Array.from(providerContainer.querySelectorAll('.cert-modal-trigger'));
      const index = group.indexOf(img);
      openModalWithGroup(group, index >= 0 ? index : 0);
    });
  });

  if (modalNextBtn) modalNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextModalImage(); });
  if (modalPrevBtn) modalPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevModalImage(); });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Mobile Touch Swipe Navigation for Lightbox Modal
  let touchStartX = 0;
  let touchEndX = 0;

  if (modal) {
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 40;
      if (touchEndX < touchStartX - swipeThreshold) {
        showNextModalImage();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        showPrevModalImage();
      }
    }, { passive: true });
  }

  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === 'flex') {
      if (e.key === 'ArrowRight') showNextModalImage();
      if (e.key === 'ArrowLeft') showPrevModalImage();
      if (e.key === 'Escape') modal.style.display = 'none';
    }
  });

  // 5. Contact Form Submission (Formspree Integration)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Thank you! Your message has been sent successfully.');
          contactForm.reset();
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
        }
      } catch (error) {
        alert('Oops! There was a network error sending your message.');
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // 6. Interactive 3D Snapshot Carousels (Clickable Snapshots + Dynamic Timer Switching)
  function setupSnapshotCarousel(carouselId) {
    const carouselContainer = document.getElementById(carouselId);
    if (!carouselContainer) return;

    const images = Array.from(carouselContainer.querySelectorAll('.snapshot-img'));
    if (images.length === 0) return;

    let currentIndex = 0;
    let timerId = null;

    function updateCarousel() {
      const total = images.length;

      images.forEach((img, index) => {
        img.classList.remove('active', 'prev', 'next');
        img.style.pointerEvents = 'none';

        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        if (index === currentIndex) {
          img.classList.add('active');
          img.style.pointerEvents = 'auto';
        } else if (index === prevIndex) {
          img.classList.add('prev');
          img.style.pointerEvents = 'auto';
        } else if (index === nextIndex) {
          img.classList.add('next');
          img.style.pointerEvents = 'auto';
        }
      });
    }

    function scheduleNextSlide(delayMs) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        scheduleNextSlide(2500); // Resume 2.5 second automatic loop
      }, delayMs);
    }

    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        const total = images.length;
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        if (index === currentIndex) {
          // Open active snapshot in full modal with its group
          openModalWithGroup(images, index);
        } else if (index === nextIndex || index === prevIndex) {
          // Switch immediately to clicked next/prev snapshot (loops seamlessly)
          currentIndex = index;
          updateCarousel();
          scheduleNextSlide(9500); // Hold manual selection for 9.5 seconds
        }
      });
    });

    updateCarousel();
    scheduleNextSlide(2500); // Initial 2.5 second start loop
  }

  setupSnapshotCarousel('shoaibCarousel');
  setupSnapshotCarousel('zubairCarousel');
});