const fs = require('fs');
const path = require('path');

// Common head content to be added to all HTML files
const commonHead = `
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- AOS Animation -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
`;

// Common scripts to be added before </body>
const commonScripts = `
    <!-- AOS Animation -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS
            AOS.init({
                duration: 800,
                once: true,
                disable: window.innerWidth < 768
            });

            // Hide loading animation
            setTimeout(() => {
                document.querySelector('.loading-animation').classList.add('loaded');
            }, 1000);

            // Header scroll effect
            const header = document.querySelector('header');
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > lastScroll && currentScroll > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });

            // Mobile menu toggle
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');
            
            mobileMenu?.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        });
    </script>
`;

// Loading animation HTML
const loadingAnimation = `
    <!-- Loading Animation -->
    <div class="loading-animation">
        <div class="loading-logo"></div>
    </div>
`;

// Function to update HTML files
function updateHtmlFiles(directory) {
    // Read all files in directory
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Filter for HTML files
        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

        // Process each HTML file
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                // Add common head content if not present
                if (!content.includes('style.css')) {
                    content = content.replace('</head>', `${commonHead}\n</head>`);
                }

                // Add loading animation if not present
                if (!content.includes('loading-animation')) {
                    content = content.replace('<body>', `<body>\n${loadingAnimation}`);
                }

                // Add common scripts if not present
                if (!content.includes('AOS.init')) {
                    content = content.replace('</body>', `${commonScripts}\n</body>`);
                }

                // Write updated content back to file
                fs.writeFile(filePath, content, 'utf8', (err) => {
                    if (err) {
                        console.error(`Error writing file ${file}:`, err);
                        return;
                    }
                    console.log(`Updated ${file}`);
                });
            });
        });
    });
}

// Run the update script
const workingDirectory = process.cwd();
updateHtmlFiles(workingDirectory);

// Performance-optimized JavaScript
'use strict';

// Debounce function to limit rate of function calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit rate of function calls
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Enhanced form validation
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = new Map();
    this.init();
  }

  init() {
    this.form.noValidate = true;
    this.form.addEventListener('submit', e => this.validateOnSubmit(e));
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', debounce(() => this.validateField(input), 300));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const rules = this.getValidationRules(field);
    let isValid = true;
    let errorMessage = '';

    rules.forEach(rule => {
      if (!rule.test(value)) {
        isValid = false;
        errorMessage = rule.message;
      }
    });

    this.updateFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  validateOnSubmit(e) {
    e.preventDefault();
    let isValid = true;

    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  getValidationRules(field) {
    const rules = [];
    
    if (field.required) {
      rules.push({
        test: value => value.length > 0,
        message: 'This field is required'
      });
    }

    if (field.type === 'email') {
      rules.push({
        test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
      });
    }

    if (field.type === 'tel') {
      rules.push({
        test: value => /^\+?[\d\s-]{10,}$/.test(value),
        message: 'Please enter a valid phone number'
      });
    }

    return rules;
  }

  updateFieldValidation(field, isValid, errorMessage) {
    const errorElement = field.nextElementSibling?.classList.contains('error-message') 
      ? field.nextElementSibling 
      : null;

    field.classList.toggle('error', !isValid);
    
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.toggle('visible', !isValid);
    }

    this.errors.set(field.name, !isValid);
  }

  async submitForm() {
    try {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      
      // Show loading state
      this.form.classList.add('loading');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle success
      this.showToast('Success', 'Form submitted successfully', 'success');
      this.form.reset();
    } catch (error) {
      this.showToast('Error', 'Failed to submit form. Please try again.', 'error');
    } finally {
      this.form.classList.remove('loading');
    }
  }

  showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
}

// Enhanced modal handling
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.modal) return;
    
    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    // Focus first focusable element
    const focusable = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.isOpen = false;
  }
}

// Enhanced image loading
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Enhanced scroll handling
const scrollHandler = throttle(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('header');
  
  if (header) {
    header.classList.toggle('scrolled', scrollTop > 50);
  }
}, 100);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Initialize form validation
  document.querySelectorAll('form').forEach(form => new FormValidator(form));
  
  // Initialize modals
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    const modalId = trigger.dataset.modal;
    const modal = new Modal(modalId);
    trigger.addEventListener('click', () => modal.open());
  });
  
  // Initialize lazy loading
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    lazyLoadImages();
  }
  
  // Initialize scroll handling
  window.addEventListener('scroll', scrollHandler);
  
  // Remove loading overlay
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => loadingOverlay.remove(), 300);
  }
});

// Add this script to all HTML files
const htmlFiles = document.querySelectorAll('link[rel="stylesheet"]');
htmlFiles.forEach(file => {
    if (!file.href.includes('style.css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);
    }
}); 