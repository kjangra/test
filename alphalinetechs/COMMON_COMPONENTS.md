# Common Components System

## Overview
This system eliminates duplicate code across all HTML pages by providing reusable components.

## Files Created

### 1. `js/common-components.js`
Main component generator that creates:
- Header/Navigation
- Footer
- Head meta tags
- Page headers
- Script includes

### 2. `js/template-loader.js`
Template system for creating new pages programmatically.

### 3. Reference Templates
- `common-head.html` - Common head section
- `common-header.html` - Header template
- `common-footer.html` - Footer template
- `templates/base-template.html` - Complete page template

## Usage Methods

### Method 1: Data Attributes (Recommended)
Add data attributes to your HTML and components will auto-inject:

```html
<!DOCTYPE html>
<html lang="en" 
      data-active-page="about"
      data-page-title="About Us"
      data-page-subtitle="Your Reliable Partner"
      data-meta-title="About Us - AlphaLine Techs"
      data-meta-description="Learn about AlphaLine Techs...">
<head>
    <!-- Head will be auto-generated -->
</head>
<body>
    <!-- Header will be auto-injected -->
    <div data-component="header"></div>
    
    <!-- Page Header will be auto-injected -->
    <div data-component="page-header"></div>
    
    <main id="main-content">
        <!-- Your content here -->
    </main>
    
    <!-- Footer will be auto-injected -->
    <div data-component="footer"></div>
    
    <!-- Scripts will be auto-injected -->
    <div data-component="scripts"></div>
    
    <script src="js/common-components.js"></script>
</body>
</html>
```

### Method 2: JavaScript API
Use the CommonComponents class directly:

```javascript
const components = new CommonComponents();

// Generate header
const header = components.generateHeader('about');
document.querySelector('.header-placeholder').innerHTML = header;

// Generate footer
const footer = components.generateFooter();
document.querySelector('.footer-placeholder').innerHTML = footer;
```

### Method 3: Template Loader
Create complete pages programmatically:

```javascript
const loader = new TemplateLoader();
const html = loader.createPage({
    activePage: 'services',
    title: 'Services',
    subtitle: 'Comprehensive Solutions',
    meta: {
        title: 'Services - AlphaLine Techs',
        description: 'Our services...',
        keywords: 'services, automation...'
    },
    content: '<div>Your page content</div>'
});
```

## Component Placeholders

Use these data attributes to mark where components should be injected:

- `data-component="header"` - Header and navigation
- `data-component="footer"` - Footer
- `data-component="page-header"` - Page title section
- `data-component="scripts"` - Script tags
- `data-component="navigation"` - Navigation menu only

## HTML Data Attributes

Set these on the `<html>` tag for auto-configuration:

- `data-active-page` - Current page (home, about, services, contact)
- `data-page-title` - Page title (H1)
- `data-page-subtitle` - Page subtitle (optional)
- `data-meta-title` - SEO title
- `data-meta-description` - SEO description
- `data-meta-keywords` - SEO keywords

## Benefits

1. **DRY Principle**: No duplicate code
2. **Easy Updates**: Change once, update everywhere
3. **Consistency**: All pages use same components
4. **Maintainability**: Centralized component management
5. **Flexibility**: Multiple usage methods

## Migration Guide

### For Existing Pages:

1. **Option A - Quick Migration**:
   - Replace header with: `<div data-component="header"></div>`
   - Replace footer with: `<div data-component="footer"></div>`
   - Add data attributes to `<html>` tag
   - Add `<script src="js/common-components.js"></script>` before closing `</body>`

2. **Option B - Manual Update**:
   - Use `CommonComponents` class methods
   - Generate components and replace manually

### Example Migration:

**Before:**
```html
<header class="header">
    <nav class="navbar">
        <!-- 50+ lines of navigation code -->
    </nav>
</header>
```

**After:**
```html
<div data-component="header"></div>
```

## Configuration

Update `js/config.js` or `js/common-components.js` to modify:
- Company name
- Contact information
- Services list
- Social media links
- Any other shared data

## Best Practices

1. **Use Data Attributes**: Simplest and most maintainable
2. **Keep Config Centralized**: Update SITE_CONFIG in one place
3. **Test After Changes**: Verify all pages after component updates
4. **Version Control**: Track component changes carefully

## Future Enhancements

- Server-side includes (if using PHP/Node.js)
- Build-time component injection
- Component caching
- A/B testing support

