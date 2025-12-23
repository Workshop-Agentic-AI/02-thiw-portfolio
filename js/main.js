/**
 * Portfolio Website Main JavaScript
 * Vanilla JavaScript implementation with ES6+ syntax
 */

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================

/**
 * Initialize mobile menu functionality
 * Handles hamburger menu click and menu item clicks
 */
const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Return early if elements don't exist
  if (!hamburger || !navMenu) return;

  // Toggle menu open/close
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
};

// ============================================
// 2. SMOOTH SCROLL TO SECTIONS
// ============================================

/**
 * Enable smooth scrolling for navigation links
 * Works with anchor links (#section-id)
 */
const initSmoothScroll = () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Calculate offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ============================================
// 3. DARK MODE TOGGLE
// ============================================

/**
 * Initialize dark mode functionality
 * Saves preference to localStorage
 */
const initDarkMode = () => {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  if (!darkModeToggle) return;

  // Check for saved user preference, default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.classList.add('active');
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkModeToggle.classList.toggle('active');
  });
};

// ============================================
// 4. ACTIVE NAV LINK HIGHLIGHT
// ============================================

/**
 * Highlight active navigation link based on scroll position
 * Uses IntersectionObserver for better performance
 */
const initActiveNavHighlight = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');

        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
};

// ============================================
// 5. FADE-IN ANIMATION ON SCROLL
// ============================================

/**
 * Add fade-in animation to elements as they enter viewport
 * Uses IntersectionObserver for performance
 */
const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('visible');

        // Optional: Stop observing after animation (one-time animation)
        // observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements with animation classes
  animatedElements.forEach(element => {
    observer.observe(element);
  });
};

// ============================================
// 6. FORM VALIDATION
// ============================================

/**
 * Validate contact form with custom error messages
 * Handles email format, required fields, and min length
 */
const initFormValidation = () => {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Show error message for a field
   */
  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }

    input.classList.add('error');
    input.classList.remove('success');
  };

  /**
   * Show success state for a field
   */
  const showSuccess = (input) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }

    input.classList.remove('error');
    input.classList.add('success');
  };

  /**
   * Validate a single input field
   */
  const validateField = (input) => {
    const value = input.value.trim();
    const fieldName = input.getAttribute('name') || 'This field';

    // Required field check
    if (input.hasAttribute('required') && value === '') {
      showError(input, `${fieldName} is required`);
      return false;
    }

    // Email validation
    if (input.type === 'email' && value !== '') {
      if (!emailRegex.test(value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
    }

    // Min length validation
    const minLength = input.getAttribute('minlength');
    if (minLength && value.length < minLength) {
      showError(input, `${fieldName} must be at least ${minLength} characters`);
      return false;
    }

    // Max length validation
    const maxLength = input.getAttribute('maxlength');
    if (maxLength && value.length > maxLength) {
      showError(input, `${fieldName} must not exceed ${maxLength} characters`);
      return false;
    }

    showSuccess(input);
    return true;
  };

  // Real-time validation on blur
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Clear error on input
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate all fields
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // If all fields are valid, submit the form
    if (isValid) {
      console.log('Form is valid, submitting...');

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Thank you! Your message has been sent successfully.';
      form.insertAdjacentElement('beforebegin', successMessage);

      // Reset form after successful submission
      form.reset();
      inputs.forEach(input => {
        input.classList.remove('success', 'error');
      });

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);

      // Here you would typically send the form data to a server
      // Example: fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    } else {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });
};

// ============================================
// 7. HEADER SCROLL BEHAVIOR
// ============================================

/**
 * Add/remove shadow to header on scroll
 * Shrink header on scroll for better UX
 */
const initHeaderScroll = () => {
  const header = document.querySelector('header');

  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScroll > scrollThreshold) {
      if (currentScroll > lastScroll) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    }

    lastScroll = currentScroll;
  });
};

// ============================================
// 8. BACK TO TOP BUTTON
// ============================================

/**
 * Show/hide back to top button based on scroll position
 */
const initBackToTop = () => {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) return;

  // Show button after scrolling down
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ============================================
// 9. TYPING ANIMATION (BONUS)
// ============================================

/**
 * Create typewriter effect for hero text
 * Optional feature for dynamic text display
 */
const initTypingAnimation = () => {
  const typingElement = document.querySelector('.typing-text');

  if (!typingElement) return;

  const texts = typingElement.getAttribute('data-texts')?.split('|') || ['Developer', 'Designer', 'Creator'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  const type = () => {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine next action
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of text
      isDeleting = true;
      setTimeout(type, pauseDuration);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
  };

  // Start typing animation
  type();
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functions when DOM is ready
 * Uses DOMContentLoaded to ensure all elements are loaded
 */
const init = () => {
  initMobileMenu();
  initSmoothScroll();
  initDarkMode();
  initActiveNavHighlight();
  initScrollAnimations();
  initFormValidation();
  initHeaderScroll();
  initBackToTop();
  initTypingAnimation();

  console.log('Portfolio website initialized successfully! 🚀');
};

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already loaded
  init();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 * Useful for scroll and resize events
 */
const debounce = (func, wait = 20) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function execution rate
 * Alternative to debounce for continuous events
 */
const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initMobileMenu,
    initSmoothScroll,
    initDarkMode,
    initActiveNavHighlight,
    initScrollAnimations,
    initFormValidation,
    initHeaderScroll,
    initBackToTop,
    initTypingAnimation,
    debounce,
    throttle
  };
}
