/**
 * Modern AlphaLine Techs Application
 * ES6+ Module-based Architecture
 */

// Modern utility functions with optional chaining and nullish coalescing
const Utils = {
    /**
     * Debounce function for performance optimization
     */
    debounce(func, wait = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
     * Throttle function for scroll events
     */
    throttle(func, limit = 100) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Smooth scroll to element with modern API
     */
    scrollToElement(selector, offset = 80) {
        const element = document.querySelector(selector);
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -threshold &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Validate email with modern regex
     */
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Validate phone number
     */
    validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && /^[\d\s\-\+\(\)]+$/.test(phone);
    },

    /**
     * Format phone number
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
};

/**
 * Modern Navigation Controller
 */
class NavigationController {
    constructor() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupDropdowns();
        this.setupScrollEffect();
        this.setupActiveLinks();
    }

    setupMobileMenu() {
        if (!this.mobileMenuToggle || !this.navMenu) return;

        const toggleMenu = () => {
            const isExpanded = this.navMenu.classList.contains('active');
            this.navMenu.classList.toggle('active');
            this.mobileMenuToggle.classList.toggle('active');
            this.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        };

        this.mobileMenuToggle.addEventListener('click', toggleMenu);

        // Close on link click
        this.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.mobileMenuToggle?.classList.remove('active');
        this.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || !href) return;

                e.preventDefault();
                Utils.scrollToElement(href, 80);
                this.closeMobileMenu();
            });
        });
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (!link) return;

            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    setupScrollEffect() {
        if (!this.header) return;

        const handleScroll = Utils.throttle(() => {
            const scrolled = window.scrollY > 100;
            this.header.classList.toggle('scrolled', scrolled);
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupActiveLinks() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath?.includes(currentPath)) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Modern Form Handler with validation
 */
class FormController {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            if (form.id === 'contactForm') {
                this.setupContactForm(form);
            }
        });
    }

    setupContactForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                await this.handleSubmit(form);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField?.value && !Utils.validateEmail(emailField.value)) {
            this.showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation (if provided)
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField?.value && !Utils.validatePhone(phoneField.value)) {
            this.showError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value?.trim() ?? '';
        
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value && !Utils.validateEmail(value)) {
            this.showError(field, 'Please enter a valid email address');
            return false;
        }

        this.clearError(field);
        return true;
    }

    showError(field, message) {
        this.clearError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorElement);
    }

    clearError(field) {
        field.classList.remove('error');
        field.parentNode.querySelector('.error-message')?.remove();
    }

    async handleSubmit(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.setAttribute('aria-busy', 'true');

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Simulate API call
            await this.submitForm(data);

            this.showMessage(form, 'Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showMessage(form, 'Something went wrong. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.removeAttribute('aria-busy');
        }
    }

    async submitForm(data) {
        // Replace with actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve(data);
            }, 1000);
        });
    }

    showMessage(form, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.setAttribute('role', 'alert');
        form.insertBefore(messageDiv, form.firstChild);
        
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

/**
 * Modern Animation Controller with Intersection Observer
 */
class AnimationController {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer?.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.observeElements());
        } else {
            this.observeElements();
        }
    }

    observeElements() {
        const elements = document.querySelectorAll(
            '.service-card, .testimonial-card, .stat-card, .faq-item, .feature-item, .application-item'
        );
        
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
            this.observer?.observe(el);
        });
    }
}

/**
 * Modern FAQ Controller - Fixed
 */
class FAQController {
    constructor() {
        this.faqItems = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready and retry if needed
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupFAQ());
        } else {
            this.setupFAQ();
        }
    }

    setupFAQ() {
        this.faqItems = document.querySelectorAll('.faq-item');
        
        if (this.faqItems.length === 0) {
            // Retry after a short delay if FAQ items aren't loaded yet
            setTimeout(() => this.setupFAQ(), 100);
            return;
        }

        this.faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            // Set accessibility attributes
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.setAttribute('id', `faq-answer-${index}`);
            }

            // Skip if already initialized to prevent duplicate listeners
            if (question.dataset.faqInitialized === 'true') return;
            question.dataset.faqInitialized = 'true';

            // Add event listeners directly
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleItem(item);
            }, { passive: false });

            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleItem(item);
                }
            });
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        
        // Close all items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            const q = faqItem.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            if (question) {
                question.setAttribute('aria-expanded', 'true');
            }
        }
    }
}

/**
 * Main Application Initialization
 */
class App {
    constructor() {
        this.navigation = null;
        this.forms = null;
        this.animations = null;
        this.faq = null;
    }

    init() {
        try {
            this.navigation = new NavigationController();
            this.forms = new FormController();
            this.animations = new AnimationController();
            this.faq = new FAQController();

            // Performance monitoring
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                });
            }
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
}

// Initialize app when DOM is ready
const app = new App();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export for global access if needed
window.AlphaLineTechs = { Utils, app };

