/**
 * MOLT ACADEMY - MAIN JAVASCRIPT
 * Shared functionality for all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoader();
    initNavigation();
    initBackToTop();
    initFooterYear();
});





/**
 * Page Loader
 */
function initLoader() {
    const loader = createLoader();
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 300);
    }, 1500);
}

function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-header">Wait for it...</div>
        <div class="progress"></div>
    `;
    return loader;
}





/**
 * Navigation Functionality
 */
function initNavigation() {
    const coursesLink = document.getElementById('courses-link');
    const submenu = document.getElementById('courses-submenu');
    const navBar = document.getElementById('nav-bar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = document.getElementById('toggle-icon');

    // Submenu toggle functionality
    if (coursesLink && submenu && navBar) {
        setupSubmenu(coursesLink, submenu, navBar);
    }

    // Mobile menu functionality
    if (mobileToggle && navMenu && toggleIcon) {
        setupMobileMenu(mobileToggle, navMenu, toggleIcon, submenu);
    }

    // Handle window resize
    setupResizeHandler(navMenu, toggleIcon, submenu);
}

function setupSubmenu(coursesLink, submenu, navBar) {
    coursesLink.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('active');
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });

    // Prevent clicks inside submenu from closing it
    submenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function setupMobileMenu(mobileToggle, navMenu, toggleIcon, submenu) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('mobile-open');
        
        if (navMenu.classList.contains('mobile-open')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden';
        } else {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
            if (submenu) submenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking links
    navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 980) {
                // Don't close menu if clicking the "Courses" toggle or a submenu link
                if (!link.classList.contains('submenu-link') && link.id !== 'courses-link') {
                    closeMobileMenu(navMenu, toggleIcon, submenu);
                }
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 980 &&
            navMenu.classList.contains('mobile-open') &&
            !navMenu.contains(e.target) &&
            e.target !== mobileToggle) {
            closeMobileMenu(navMenu, toggleIcon, submenu);
        }
    });
}

function closeMobileMenu(navMenu, toggleIcon, submenu) {
    navMenu.classList.remove('mobile-open');
    toggleIcon.classList.remove('fa-xmark');
    toggleIcon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
    if (submenu) submenu.classList.remove('active');
}

function setupResizeHandler(navMenu, toggleIcon, submenu) {
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 980;
        
        if (!isMobile && navMenu && navMenu.classList.contains('mobile-open')) {
            // If resizing to desktop and mobile menu is open, close it
            navMenu.classList.remove('mobile-open');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        }
        
        // Always close submenu on resize
        if (submenu) {
            submenu.classList.remove('active');
        }
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const toTopButton = document.getElementById('back-to-top');
    
    if (toTopButton) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                toTopButton.classList.add('show');
            } else {
                toTopButton.classList.remove('show');
            }
        });

        toTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Footer Year
 */
function initFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}










(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Check if user previously closed the image
    if (localStorage.getItem('footerBannerHidden') === 'true') {
      return;
    }
    
    try {
      // Create container
      const container = document.createElement('div');
      container.id = 'footer-banner-container';
      container.style.position = 'fixed';
      container.style.bottom = '0px';    // No padding at bottom
      container.style.left = '40px';     // 20px from left
      container.style.zIndex = '9999';
      
      // Create link
      const link = document.createElement('a');
      link.href = 'https://openclaw.ai';
      link.target = '_blank';
      link.style.display = 'block';
      
      // Create image
      const img = document.createElement('img');
      img.src = 'https://bucket.mlcdn.com/a/3336/3336910/images/b881d7f20934412469af14f445d502e590599415.gif';
      img.alt = 'OpenClaw';
      img.style.maxWidth = '200px';      // Adjust as needed
      img.style.height = 'auto';
      img.style.display = 'block';
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '-5px';
      closeBtn.style.right = '-5px';
      closeBtn.style.width = '20px';
      closeBtn.style.height = '20px';
      closeBtn.style.background = '#fff';
      closeBtn.style.border = '1px solid #ccc';
      closeBtn.style.borderRadius = '50%';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.fontSize = '15px';
      closeBtn.style.lineHeight = '1';
      closeBtn.style.padding = '0';
      closeBtn.style.textAlign = 'center';
      closeBtn.style.zIndex = '10000';
      
      // Close button hover effects
      closeBtn.onmouseover = function() {
        this.style.background = '#f0f0f0';
        this.style.transform = 'scale(1.1)';
      };
      closeBtn.onmouseout = function() {
        this.style.background = '#fff';
        this.style.transform = 'scale(1)';
      };
      
      // Close button click handler
      closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        container.style.display = 'none';
        localStorage.setItem('footerBannerHidden', 'true');
      };
      
      // Assemble elements
      link.appendChild(img);
      container.appendChild(link);
      container.appendChild(closeBtn);
      document.body.appendChild(container);
      
    } catch (error) {
      console.error('Error adding footer banner:', error);
    }
  }
})();
