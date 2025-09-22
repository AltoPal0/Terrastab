# Terrastab Website - Section 1: Header/Navigation - Complete Documentation

## Overview
The header section serves as the primary navigation and brand identity area. It's a fixed/sticky header that provides easy access to all main sections of the website.

## Section Structure

### Main Container
- **Element Type**: `banner` (semantic header role)
- **Layout**: Horizontal flexbox layout
- **Background**: Clean white background
- **Position**: Fixed/sticky at top of page
- **Shadow/Border**: Subtle bottom border or shadow for separation

## Detailed Elements Breakdown

### 1. Brand Logo Section
**Location**: Left side of header
**Layout**: Logo container with proper spacing

#### Content:
- **Logo Image**: "Terrastab Logo"
  - **Alt Text**: "Terrastab Logo"
  - **Format**: PNG or SVG preferred
  - **Dimensions**: Optimized for header height
  - **Color**: Brand blue and white design
  - **Clickable**: Links to homepage/top of page

### 2. Main Navigation Menu
**Location**: Right side of header
**Layout**: Horizontal navigation list

#### Navigation Items (5 total):
1. **Accueil** (Home)
   - **Link**: "#" (anchor to top)
   - **State**: Active/current page indicator
   - **Type**: Internal anchor link

2. **Nos Offres** (Our Offers)
   - **Link**: "#offres" (anchor to section 4)
   - **Type**: Internal anchor link
   - **Target**: Product cards section

3. **Comprendre le Risque** (Understanding Risk)
   - **Link**: "#risque" (anchor to section 3)
   - **Type**: Internal anchor link
   - **Target**: Risk assessment section

4. **Devis en ligne** (Online Quote)
   - **Link**: "#devis" (anchor to section 6)
   - **Type**: Internal anchor link
   - **Target**: Configuration section

5. **Contact** (Contact)
   - **Link**: "#contact" (anchor to section 8)
   - **Type**: Internal anchor link
   - **Target**: Footer contact section

## Technical Specifications

### Colors Used:
1. **Background**: White (#FFFFFF)
2. **Logo Colors**: Brand blue and white
3. **Navigation Text**: Dark gray or black (#333333 or similar)
4. **Hover State**: Brand blue or accent color
5. **Active State**: Brand blue or highlighted state
6. **Border/Shadow**: Light gray (#E0E0E0 or similar)

### Typography:
- **Navigation Links**: Sans-serif font family
- **Font Weight**: Medium (500) or Semi-bold (600)
- **Font Size**: 16px or 1rem
- **Letter Spacing**: Normal or slight spacing for clarity
- **Text Transform**: None (natural case)

### Interactive Elements:
- **Logo Link**: Clickable, returns to top
- **5 Navigation Links**: All functional anchor links
- **Hover Effects**: Color change and/or underline
- **Active State**: Visual indicator for current section
- **Mobile Menu**: Hamburger menu for responsive design

### Layout Specifications:
- **Container Width**: Full width with max-width constraint
- **Height**: Standard header height (60-80px)
- **Padding**: Horizontal padding for content alignment
- **Alignment**:
  - Logo: Left-aligned
  - Navigation: Right-aligned
- **Z-index**: High value for sticky positioning
- **Responsive**: Collapses to hamburger menu on mobile

### Logo Specifications:
- **File Name**: `logo_main_terrastab.svg`
- **File Format**: SVG (scalable)
- **Dimensions**: Height should match header constraints
- **Brand Colors**: Primary blue, white, possibly accent colors
- **Background**: Transparent for flexibility

## Implementation Notes

### HTML Structure:
```html
<header role="banner">
  <div class="header-container">
    <div class="logo-section">
      <a href="#" class="logo-link">
        <img src="logo_main_terrastab.svg" alt="Terrastab Logo" class="logo">
      </a>
    </div>

    <nav class="main-navigation">
      <ul class="nav-list">
        <li><a href="#" class="nav-link active">Accueil</a></li>
        <li><a href="#offres" class="nav-link">Nos Offres</a></li>
        <li><a href="#risque" class="nav-link">Comprendre le Risque</a></li>
        <li><a href="#devis" class="nav-link">Devis en ligne</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
    </nav>

    <!-- Mobile menu toggle (hidden on desktop) -->
    <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
      <span class="hamburger-icon"></span>
    </button>
  </div>
</header>
```

### CSS Considerations:
- **Position**: `fixed` or `sticky` for persistent header
- **Flexbox**: For layout between logo and navigation
- **Smooth scrolling**: For anchor link navigation
- **Box shadow**: Subtle shadow for visual separation
- **Transitions**: Smooth hover and active state changes
- **Media queries**: Responsive design breakpoints
- **Z-index**: Ensure header stays above other content

### JavaScript Requirements:
- **Smooth scrolling**: For anchor link navigation
- **Mobile menu toggle**: Show/hide navigation on mobile
- **Active state tracking**: Highlight current section in navigation
- **Scroll spy**: Update active navigation based on scroll position

### Accessibility Features:
- **Semantic HTML**: Proper header and nav elements
- **ARIA labels**: For mobile menu toggle
- **Keyboard navigation**: Tab-accessible links
- **Focus indicators**: Clear focus states for all interactive elements
- **Alt text**: Descriptive alt text for logo image

### Browser Compatibility:
- **Flexbox support**: For layout
- **Sticky positioning**: With fallbacks if needed
- **CSS transitions**: For smooth interactions
- **Modern anchor link behavior**: Smooth scrolling support

This documentation provides all necessary details to reproduce the header/navigation section exactly as designed, including all interactive behaviors and responsive considerations.