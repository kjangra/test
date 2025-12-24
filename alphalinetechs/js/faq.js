// FAQ Module
class FAQ {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        if (this.faqItems.length === 0) return;

        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                this.toggleItem(item);
            });

            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item);
                }
            });

            // Make it focusable
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
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
            if (question) question.setAttribute('aria-expanded', 'true');
        }
    }
}


