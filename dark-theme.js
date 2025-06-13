// Dark Theme Enforcer
document.addEventListener('DOMContentLoaded', function() {
    // Add dark theme stylesheet
    const darkThemeLink = document.createElement('link');
    darkThemeLink.rel = 'stylesheet';
    darkThemeLink.href = 'dark-theme.css';
    document.head.appendChild(darkThemeLink);

    // Add ambient background
    const ambientBg = document.createElement('div');
    ambientBg.className = 'ambient-background';
    document.body.insertBefore(ambientBg, document.body.firstChild);

    // Convert form containers to dark theme
    const formContainers = document.querySelectorAll('.form-container, form, .container');
    formContainers.forEach(container => {
        container.classList.add('glass-card');
    });

    // Update form inputs
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.classList.add('form-input');
    });

    // Update form labels
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.classList.add('form-label');
    });

    // Update submit buttons
    const buttons = document.querySelectorAll('button[type="submit"], input[type="submit"], .submit-btn');
    buttons.forEach(button => {
        button.classList.add('submit-btn');
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.glass-card, .submit-btn, .form-input');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
            element.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'none';
        });
    });

    // Add loading animation to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            form.classList.add('loading');
        });
    });

    // Update success and error messages
    const messages = document.querySelectorAll('.success, .error, .alert');
    messages.forEach(message => {
        if (message.classList.contains('success')) {
            message.classList.add('form-success');
        } else {
            message.classList.add('form-error');
        }
    });
}); 