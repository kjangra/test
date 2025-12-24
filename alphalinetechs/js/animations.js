// Animations Module
class Animations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.initIntersectionObserver();
        this.initScrollAnimations();
        this.initNavbarScroll();
    }

    initIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements
        document.addEventListener('DOMContentLoaded', () => {
            const animateElements = document.querySelectorAll(
                '.service-card, .testimonial-card, .stat-card, .faq-item, .feature-item, .application-item'
            );
            
            animateElements.forEach(el => {
                el.classList.add('animate-on-scroll');
                this.observer.observe(el);
            });
        });
    }

    initScrollAnimations() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }, 10));
        }
    }

    initNavbarScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const handleScroll = Utils.throttle(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
}


