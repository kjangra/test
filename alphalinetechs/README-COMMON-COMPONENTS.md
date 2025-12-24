# Common Components System - Quick Start

## What This Does
Eliminates duplicate code (header, footer, navigation) across all HTML pages.

## Quick Usage

### Step 1: Add Placeholders to Your HTML

Replace your header with:
```html
<div data-component="header"></div>
```

Replace your footer with:
```html
<div data-component="footer"></div>
```

### Step 2: Add Data Attributes to HTML Tag

```html
<html lang="en" 
      data-active-page="about"
      data-page-title="About Us"
      data-meta-title="About Us - AlphaLine Techs">
```

### Step 3: Load the Script

Add before closing `</body>`:
```html
<script src="js/common-components.js"></script>
```

## That's It!

The components will automatically inject when the page loads.

## Example: Converting a Page

**Before (50+ lines of duplicate header):**
```html
<header class="header">
    <nav class="navbar">
        <div class="container">
            <!-- 50+ lines of navigation code -->
        </div>
    </nav>
</header>
```

**After (1 line):**
```html
<div data-component="header"></div>
```

## Available Components

- `data-component="header"` - Full header with navigation
- `data-component="footer"` - Footer with contact info
- `data-component="page-header"` - Page title section
- `data-component="scripts"` - Script tags

## Configuration

All shared data is in `js/config.js`. Update once, changes everywhere!

## Need Help?

See `COMMON_COMPONENTS.md` for detailed documentation.

