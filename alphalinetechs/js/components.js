// Reusable Components Generator
class Components {
    static generateNavigation(currentPage = '') {
        const services = SITE_CONFIG.services;
        const isActive = (page) => currentPage === page ? 'active' : '';
        
        return `
            <ul class="nav-menu">
                <li><a href="index.html#home" class="nav-link ${isActive('home')}">Home</a></li>
                <li><a href="about-us.html" class="nav-link ${isActive('about')}">About</a></li>
                <li class="dropdown">
                    <a href="services.html" class="nav-link ${isActive('services')}">Services <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        ${services.map(service => 
                            `<li><a href="${service.url}">${service.name}</a></li>`
                        ).join('')}
                    </ul>
                </li>
                <li><a href="contact-us.html" class="nav-link ${isActive('contact')}">Contact</a></li>
            </ul>
        `;
    }

    static generateHeader(currentPage = '') {
        return `
            <header class="header">
                <nav class="navbar">
                    <div class="container">
                        <div class="nav-wrapper">
                            <div class="logo">
                                <a href="index.html" aria-label="AlphaLine Techs Home">
                                    <span class="logo-text">${SITE_CONFIG.companyName}</span>
                                </a>
                            </div>
                            <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            ${this.generateNavigation(currentPage)}
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    static generateFooter() {
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
                            <p>${SITE_CONFIG.address}</p>
                            <p>Email: <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></p>
                            <p>Phone: <a href="tel:${SITE_CONFIG.phone.replace(/\s/g, '')}">${SITE_CONFIG.phone}</a></p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; ${new Date().getFullYear()} ${SITE_CONFIG.companyName}. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}


