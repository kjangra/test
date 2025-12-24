// Main Application Entry Point
(function() {
    'use strict';

    // Initialize when DOM is ready
    function init() {
        try {
            // Initialize modules
            new Navigation();
            new Forms();
            new Animations();
            new FAQ();
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for global access if needed
    window.AlphaLineTechs = {
        Utils,
        Components,
        SITE_CONFIG
    };
})();


