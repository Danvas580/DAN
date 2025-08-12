// Performance Optimizations
document.documentElement.classList.add('performance-mode');

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) {
      console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
    }
  }
});

perfObserver.observe({ entryTypes: ['measure'] });

// Debounce function
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

// Throttle function
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

// Cache DOM elements
const elements = {};
function cacheElements() {
  const elementIds = [
    'loadingOverlay',
    'currentShiftStatus',
    'shiftTimer',
    'startShiftBtn',
    'endShiftBtn',
    'taskList',
    'chatBox',
    'calendarBody',
    'currentMonth'
  ];
  
  elementIds.forEach(id => {
    elements[id] = document.getElementById(id);
  });
}

// Optimize rendering with DocumentFragment
function optimizedRender(container, items, renderFunction) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const element = renderFunction(item);
    fragment.appendChild(element);
  });
  container.innerHTML = '';
  container.appendChild(fragment);
}

// Intersection Observer for lazy loading
const lazyLoadObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.dataset.src) {
        entry.target.src = entry.target.dataset.src;
      }
      lazyLoadObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '50px',
  threshold: 0.1
});

// Initialize performance optimizations
function initPerformanceOptimizations() {
  // Cache DOM elements
  cacheElements();
  
  // Add lazy loading to images
  document.querySelectorAll('img[data-src]').forEach(img => {
    lazyLoadObserver.observe(img);
  });
  
  // Add lazy loading to sections
  document.querySelectorAll('.lazy-section').forEach(section => {
    lazyLoadObserver.observe(section);
  });
  
  // Optimize scroll and resize handlers
  window.addEventListener('scroll', throttle(() => {
    // Add scroll-based optimizations here
  }, 100), { passive: true });
  
  window.addEventListener('resize', debounce(() => {
    // Add resize-based optimizations here
  }, 250));
  
  // Add content-visibility to improve rendering performance
  document.querySelectorAll('.section').forEach(section => {
    section.style.contentVisibility = 'auto';
    section.style.containIntrinsicSize = '0 500px';
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

// Export utilities for use in other files
window.perfUtils = {
  debounce,
  throttle,
  optimizedRender,
  elements
}; 