# Theme System Documentation

## Overview
The website now supports 5 different color themes that users can switch between.

## Available Themes

### 1. Default Theme (Blue)
- **File**: `css/themes/default-theme.css`
- **Colors**: Professional blue (#1a73e8)
- **Style**: Professional and trustworthy
- **Best for**: Corporate, business websites

### 2. Dark Theme
- **File**: `css/themes/dark-theme.css`
- **Colors**: Dark backgrounds with bright accents
- **Style**: Modern and sleek
- **Best for**: Modern tech companies, night mode preference

### 3. Ocean Theme (Teal)
- **File**: `css/themes/ocean-theme.css`
- **Colors**: Teal and cyan (#00acc1)
- **Style**: Fresh and calming
- **Best for**: Healthcare, wellness, environmental

### 4. Forest Theme (Green)
- **File**: `css/themes/forest-theme.css`
- **Colors**: Green shades (#2e7d32)
- **Style**: Natural and growth-oriented
- **Best for**: Nature, agriculture, sustainability

### 5. Sunset Theme (Orange)
- **File**: `css/themes/sunset-theme.css`
- **Colors**: Orange and red (#f57c00)
- **Style**: Warm and energetic
- **Best for**: Creative, energetic brands

## How to Use

### Automatic Theme Switcher
A floating theme switcher button appears in the bottom-right corner of every page. Users can:
1. Click the palette icon
2. Select a theme from the menu
3. Theme preference is saved in localStorage

### Programmatic Theme Switching

```javascript
// Switch theme programmatically
themeSwitcher.applyTheme('dark');

// Get current theme
const currentTheme = themeSwitcher.getCurrentTheme();

// Get available themes
const themes = themeSwitcher.getAvailableThemes();
```

### Setting Default Theme

To set a default theme, update the theme switcher initialization:

```javascript
// In theme-switcher.js, change:
this.currentTheme = this.getStoredTheme() || 'ocean'; // Change 'default' to your preferred theme
```

## Theme Structure

Each theme CSS file defines:
- Primary and secondary colors
- Background colors
- Text colors
- Accent colors
- Shadows and borders
- Gradients

## Adding a New Theme

1. Create a new CSS file in `css/themes/` (e.g., `purple-theme.css`)
2. Define all CSS variables following the pattern
3. Add to `theme-switcher.js`:
   ```javascript
   this.themes = {
       // ... existing themes
       purple: 'css/themes/purple-theme.css'
   };
   ```
4. Add preview color in `theme-switcher.css`:
   ```css
   .theme-preview-purple {
       background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
   }
   ```

## Theme Persistence

- Themes are saved in `localStorage`
- User preference persists across sessions
- Falls back to default theme if localStorage unavailable

## Integration

### In HTML Files

Add these links in the `<head>`:
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/themes/default-theme.css" id="theme-stylesheet">
<link rel="stylesheet" href="css/theme-switcher.css">
```

Add before closing `</body>`:
```html
<script src="js/theme-switcher.js"></script>
```

## Customization

### Theme Variables

Each theme defines these key variables:
- `--primary-color`: Main brand color
- `--primary-hover`: Hover state
- `--bg-primary`: Main background
- `--bg-secondary`: Secondary background
- `--text-primary`: Main text color
- `--gradient-primary`: Hero gradient

### Custom Theme Colors

To create a custom theme, copy an existing theme file and modify the color values.

## Browser Support

- All modern browsers
- CSS Custom Properties (IE11+ with polyfill)
- localStorage for persistence

## Performance

- Themes load on demand
- Smooth transitions between themes
- Minimal performance impact
- Cached in browser

