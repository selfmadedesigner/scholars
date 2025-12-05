// Initialize nav toggle (called after nav.html is injected)
function initNavToggle() {
  const navLogo = document.querySelector('.nav-logo');
  const navLinks = document.querySelector('.nav-links');
  if (!navLogo || !navLinks) return;

  // ensure accessible role/tabindex
  navLogo.setAttribute('role', 'button');
  navLogo.setAttribute('tabindex', '0');
  if (!navLogo.hasAttribute('aria-expanded')) navLogo.setAttribute('aria-expanded', 'false');

  const openMenu = () => {
    navLinks.classList.add('open');
    navLogo.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    navLinks.classList.remove('open');
    navLogo.setAttribute('aria-expanded', 'false');
  };
  const toggleMenu = () => {
    if (navLinks.classList.contains('open')) closeMenu(); else openMenu();
  };

  navLogo.addEventListener('click', toggleMenu);
  navLogo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (!navLinks.contains(e.target) && !navLogo.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Load navigation
fetch('nav.html')
  .then(res => res.text())
  .then(data => {
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) placeholder.innerHTML = data;
    initNavToggle(); // init after nav injected
  })
  .catch(err => console.error('Failed to load nav.html', err));

// Load footer
fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

// Load scholar hero if placeholder exists
const scholarHeroPlaceholder = document.getElementById('scholar-hero-placeholder');
if (scholarHeroPlaceholder) {
  fetch('scholar-hero.html')
    .then(res => res.text())
    .then(data => {
      scholarHeroPlaceholder.innerHTML = data;
      // Get data attributes
      const name = scholarHeroPlaceholder.getAttribute('data-scholar-name') || "Scholar Name";
      const desc = scholarHeroPlaceholder.getAttribute('data-scholar-description') || "Scholar description here.";
      const img = scholarHeroPlaceholder.getAttribute('data-scholar-image');
      // Set name and description
      document.getElementById('scholar-name').textContent = name;
      document.getElementById('scholar-description').textContent = desc;
      // Set background image if provided
      if (img) {
        document.getElementById('shared-scholar-hero').style.backgroundImage = `url('${img}')`;
      }
    });
}

// Scholar tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Hide all content
            tabContents.forEach(tc => tc.style.display = 'none');
            // Activate this tab and show content
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-tab')).style.display = 'block';
        });
    });
});

// Video thumbnail functionality
document.addEventListener('DOMContentLoaded', function() {
    const mainIframe = document.getElementById('main-video-iframe');
    const thumbs = document.querySelectorAll('.video-thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            if (mainIframe && videoId) {
                mainIframe.src = `https://www.youtube.com/embed/${videoId}`;
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    if (thumbs.length) thumbs[0].classList.add('active');
});

// Image gallery lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Use .gallery-img for both galleries, or if you want to scope only to single-scholar-gallery:
    // const galleryImgs = document.querySelectorAll('.single-gallery-grid .gallery-img');
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryImgs.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.style.display = 'flex';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
});