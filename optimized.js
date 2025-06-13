// Performance optimized JavaScript

// Debounce function for performance
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

// Throttle function for performance
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

// Optimized scroll handler
const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 100);

// Optimized intersection observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Optimized event handlers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with optimized settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            disable: window.innerWidth < 768,
            startEvent: 'load',
            disableMutationObserver: true
        });
    }

    // Optimize loading animation
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingAnimation.classList.add('loaded');
                setTimeout(() => {
                    loadingAnimation.style.display = 'none';
                }, 300);
            }, 500);
        });
    }

    // Optimize mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            requestAnimationFrame(() => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        });
    }

    // Optimize scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Optimize scroll event
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimize image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }
});

// Optimize modal interactions
const modal = {
    init() {
        this.modal = document.getElementById('applicationModal');
        this.bindEvents();
    },

    bindEvents() {
        if (!this.modal) return;

        document.querySelectorAll('[data-modal-target]').forEach(button => {
            button.addEventListener('click', () => this.open());
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open() {
        requestAnimationFrame(() => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    },

    close() {
        requestAnimationFrame(() => {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
};

// Initialize modal
modal.init(); 