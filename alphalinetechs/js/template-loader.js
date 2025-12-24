/**
 * Template Loader
 * Helps create pages from templates
 */

class TemplateLoader {
    constructor() {
        this.components = new CommonComponents();
    }

    /**
     * Create a page from template
     * @param {Object} config - Page configuration
     */
    createPage(config) {
        const {
            activePage = '',
            title = '',
            subtitle = '',
            meta = {},
            content = ''
        } = config;

        // Generate complete HTML
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    ${this.components.generateHead(meta)}
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ${this.components.generateHeader(activePage)}
    ${subtitle ? this.components.generatePageHeader(title, subtitle) : ''}
    <main id="main-content">
        ${content}
    </main>
    ${this.components.generateFooter()}
    ${this.components.generateScripts()}
    <script src="js/common-components.js"></script>
</body>
</html>
        `;

        return html.trim();
    }

    /**
     * Update existing page with common components
     * @param {string} selector - Selector for element to update
     * @param {string} component - Component name (header, footer, etc.)
     * @param {Object} options - Options for component
     */
    updateComponent(selector, component, options = {}) {
        const element = document.querySelector(selector);
        if (!element) return;

        switch(component) {
            case 'header':
                element.outerHTML = this.components.generateHeader(options.activePage || '');
                break;
            case 'footer':
                element.outerHTML = this.components.generateFooter();
                break;
            case 'navigation':
                element.outerHTML = this.components.generateNavigation(options.activePage || '');
                break;
            default:
                console.warn(`Unknown component: ${component}`);
        }
    }
}

window.TemplateLoader = TemplateLoader;

