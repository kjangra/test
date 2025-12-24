// Navigation Module
class Navigation {
    constructor() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initDropdowns();
        this.initActiveLink();
    }

    initMobileMenu() {
        if (!this.mobileMenuToggle || !this.navMenu) return;

        this.mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = this.navMenu.classList.contains('active');
            this.toggleMobileMenu(!isExpanded);
        });

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu(open) {
        if (open) {
            this.navMenu.classList.add('active');
            this.mobileMenuToggle.classList.add('active');
            this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.mobileMenuToggle?.classList.remove('active');
        this.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                Utils.scrollToElement(href, 80);
            });
        });
    }

    initDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (!link) return;

            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    initActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        this.navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && linkPath.includes(currentPath)) {
                link.classList.add('active');
            }
        });
    }
}


