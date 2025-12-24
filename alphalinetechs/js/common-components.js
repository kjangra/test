/**
 * Common Components System
 * Eliminates duplicate code across all HTML pages
 */

// Site Configuration (if not already loaded)
if (typeof window.SITE_CONFIG === 'undefined') {
    window.SITE_CONFIG = {
        companyName: 'AlphaLine Techs',
        email: 'sales@alphalinetechs.com',
        phone: '01234567890',
        address: 'AlphaLine Techs LLC.<br>Dubai, United Arab Emirates',
        services: [
            { name: 'Automated Gates and Barriers', url: 'automated-gates-and-barriers.html' },
            { name: 'Garage Doors & Shutters', url: 'garage-doors-and-shutters.html' },
            { name: 'Door Automation', url: 'automatic-doors.html' },
            { name: 'Automatic Bollards', url: 'automatic-bollards.html' },
            { name: 'Flap Barriers', url: 'automatic-flap-barriers.html' },
            { name: 'Access Control System', url: 'access-control-system.html' },
            { name: 'Long Range Reader System', url: 'long-range-reader-system.html' },
            { name: 'AMC Repair & Modernization', url: 'amc-repair-modernization.html' },
            { name: 'Public Address System', url: 'public-address-system.html' },
            { name: 'Audio Video Intercom System', url: 'audio-video-intercom-system.html' }
        ]
    };
}

/**
 * Common Components Generator
 */
class CommonComponents {
    constructor() {
        this.config = window.SITE_CONFIG || SITE_CONFIG;
    }

    /**
     * Generate Header HTML
     * @param {string} activePage - Current page identifier
     * @returns {string} Header HTML
     */
    generateHeader(activePage = '') {
        const isActive = (page) => activePage === page ? 'active' : '';
        
        return `
            <header class="header">
                <nav class="navbar">
                    <div class="container">
                        <div class="nav-wrapper">
                            <div class="logo">
                                <a href="index.html" aria-label="${this.config.companyName} Home">
                                    <span class="logo-text">${this.config.companyName}</span>
                                </a>
                            </div>
                            <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            ${this.generateNavigation(activePage)}
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    /**
     * Generate Navigation HTML
     * @param {string} activePage - Current page identifier
     * @returns {string} Navigation HTML
     */
    generateNavigation(activePage = '') {
        const isActive = (page) => activePage === page ? 'active' : '';
        
        const servicesList = this.config.services.map(service => 
            `<li><a href="${service.url}">${service.name}</a></li>`
        ).join('');

        return `
            <ul class="nav-menu">
                <li><a href="index.html#home" class="nav-link ${isActive('home')}">Home</a></li>
                <li><a href="about-us.html" class="nav-link ${isActive('about')}">About</a></li>
                <li class="dropdown">
                    <a href="services.html" class="nav-link ${isActive('services')}">Services <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        ${servicesList}
                    </ul>
                </li>
                <li><a href="contact-us.html" class="nav-link ${isActive('contact')}">Contact</a></li>
            </ul>
        `;
    }

    /**
     * Generate Footer HTML
     * @returns {string} Footer HTML
     */
    generateFooter() {
        const currentYear = new Date().getFullYear();
        
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>Quick Links</h4>
                            <ul class="footer-links">
                                <li><a href="index.html#home">Home</a></li>
                                <li><a href="contact-us.html">Contact</a></li>
                                <li><a href="index.html#faq">FAQs</a></li>
                                <li><a href="services.html">Services</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Contact Info</h4>
                            <p>${this.config.address}</p>
                            <p>Email: <a href="mailto:${this.config.email}">${this.config.email}</a></p>
                            <p>Phone: <a href="tel:${this.config.phone.replace(/\s/g, '')}">${this.config.phone}</a></p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; ${currentYear} ${this.config.companyName}. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Generate Head Meta Tags
     * @param {Object} meta - Meta information object
     * @returns {string} Head HTML
     */
    generateHead(meta = {}) {
        const {
            title = `${this.config.companyName} - Best Door and Gate Automation Company in Dubai`,
            description = `${this.config.companyName} – Best Door and Gate Automation Company in Dubai. High-quality, reliable products with exceptional sales and after-sales support.`,
            keywords = 'door automation, gate automation, access control, Dubai, UAE, AlphaLine Techs',
            author = this.config.companyName
        } = meta;

        return `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${title}</title>
            <meta name="description" content="${description}">
            <meta name="keywords" content="${keywords}">
            <meta name="author" content="${author}">
            <link rel="stylesheet" href="css/style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
            <link rel="preload" href="js/app.js" as="script">
            <link rel="preload" href="css/style.css" as="style">
        `;
    }

    /**
     * Generate Page Header Section
     * @param {string} title - Page title
     * @param {string} subtitle - Page subtitle (optional)
     * @returns {string} Page header HTML
     */
    generatePageHeader(title, subtitle = '') {
        const subtitleHtml = subtitle ? `<p class="page-subtitle">${subtitle}</p>` : '';
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title">${title}</h1>
                    ${subtitleHtml}
                </div>
            </section>
        `;
    }

    /**
     * Generate Script Tags
     * @returns {string} Script tags HTML
     */
    generateScripts() {
        return `
            <script type="module" src="js/app.js"></script>
            <script nomodule src="js/script.js"></script>
        `;
    }

    /**
     * Inject components into page
     * @param {Object} options - Component options
     */
    injectComponents(options = {}) {
        const {
            activePage = '',
            pageTitle = '',
            pageSubtitle = '',
            meta = {}
        } = options;

        // Inject header if placeholder exists
        const headerPlaceholder = document.querySelector('[data-component="header"]');
        if (headerPlaceholder) {
            headerPlaceholder.outerHTML = this.generateHeader(activePage);
        }

        // Inject footer if placeholder exists
        const footerPlaceholder = document.querySelector('[data-component="footer"]');
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = this.generateFooter();
        }

        // Inject page header if placeholder exists
        const pageHeaderPlaceholder = document.querySelector('[data-component="page-header"]');
        if (pageHeaderPlaceholder && pageTitle) {
            pageHeaderPlaceholder.outerHTML = this.generatePageHeader(pageTitle, pageSubtitle);
        }

        // Inject scripts if placeholder exists
        const scriptsPlaceholder = document.querySelector('[data-component="scripts"]');
        if (scriptsPlaceholder) {
            scriptsPlaceholder.outerHTML = this.generateScripts();
        }
    }
}

// Auto-inject components if data attributes are present
document.addEventListener('DOMContentLoaded', () => {
    const components = new CommonComponents();
    
    // Get active page from data attribute
    const activePage = document.documentElement.getAttribute('data-active-page') || '';
    const pageTitle = document.documentElement.getAttribute('data-page-title') || '';
    const pageSubtitle = document.documentElement.getAttribute('data-page-subtitle') || '';
    
    // Get meta from data attributes
    const meta = {
        title: document.documentElement.getAttribute('data-meta-title') || '',
        description: document.documentElement.getAttribute('data-meta-description') || '',
        keywords: document.documentElement.getAttribute('data-meta-keywords') || ''
    };

    // Inject components
    components.injectComponents({
        activePage,
        pageTitle,
        pageSubtitle,
        meta
    });
});

// Export for global access
window.CommonComponents = CommonComponents;

