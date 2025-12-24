/**
 * Theme Switcher
 * Manages theme selection and persistence
 */

class ThemeSwitcher {
    constructor() {
        this.themes = {
            default: 'css/themes/default-theme.css',
            dark: 'css/themes/dark-theme.css',
            ocean: 'css/themes/ocean-theme.css',
            forest: 'css/themes/forest-theme.css',
            sunset: 'css/themes/sunset-theme.css'
        };
        
        this.currentTheme = this.getStoredTheme() || 'default';
        this.themeLink = null;
        this.init();
    }

    init() {
        // Create or get theme stylesheet link
        this.themeLink = document.getElementById('theme-stylesheet');
        
        if (!this.themeLink) {
            this.themeLink = document.createElement('link');
            this.themeLink.id = 'theme-stylesheet';
            this.themeLink.rel = 'stylesheet';
            document.head.appendChild(this.themeLink);
        }

        // Apply stored theme
        this.applyTheme(this.currentTheme);

        // Create theme switcher UI if needed
        this.createThemeSwitcherUI();
    }

    /**
     * Apply a theme
     * @param {string} themeName - Name of the theme
     */
    applyTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Theme "${themeName}" not found`);
            return;
        }

        this.currentTheme = themeName;
        this.themeLink.href = this.themes[themeName];
        
        // Store preference
        this.storeTheme(themeName);
        
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName }
        }));
    }

    /**
     * Get stored theme from localStorage
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('theme') || null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Store theme preference
     * @param {string} themeName - Theme name to store
     */
    storeTheme(themeName) {
        try {
            localStorage.setItem('theme', themeName);
        } catch (e) {
            console.warn('Could not save theme preference:', e);
        }
    }

    /**
     * Create theme switcher UI
     */
    createThemeSwitcherUI() {
        // Check if switcher already exists
        if (document.getElementById('theme-switcher')) {
            return;
        }

        const switcher = document.createElement('div');
        switcher.id = 'theme-switcher';
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-switcher-toggle" aria-label="Change theme" title="Change theme">
                <i class="fas fa-palette"></i>
            </button>
            <div class="theme-switcher-menu">
                <div class="theme-switcher-title">Choose Theme</div>
                <div class="theme-options">
                    ${Object.keys(this.themes).map(theme => `
                        <button class="theme-option ${theme === this.currentTheme ? 'active' : ''}" 
                                data-theme="${theme}" 
                                aria-label="Switch to ${theme} theme">
                            <span class="theme-preview theme-preview-${theme}"></span>
                            <span class="theme-name">${this.formatThemeName(theme)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(switcher);

        // Add event listeners
        const toggle = switcher.querySelector('.theme-switcher-toggle');
        const menu = switcher.querySelector('.theme-switcher-menu');
        const options = switcher.querySelectorAll('.theme-option');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
                menu.classList.remove('active');
                
                // Update active state
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    /**
     * Format theme name for display
     * @param {string} theme - Theme name
     */
    formatThemeName(theme) {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get available themes
     */
    getAvailableThemes() {
        return Object.keys(this.themes);
    }
}

// Initialize theme switcher when DOM is ready
let themeSwitcher;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeSwitcher = new ThemeSwitcher();
    });
} else {
    themeSwitcher = new ThemeSwitcher();
}

// Export for global access
window.ThemeSwitcher = ThemeSwitcher;
window.themeSwitcher = themeSwitcher;

