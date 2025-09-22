# Terrastab Website - Section 2: Hero Section - Complete Documentation

## Overview
The hero section is the primary landing area that immediately communicates Terrastab's value proposition. It features a compelling headline, descriptive content, and clear calls-to-action to drive user engagement.

## Section Structure

### Main Container
- **Element Type**: Main content section
- **Layout**: Single-column centered layout
- **Background**: Clean white background or subtle background color
- **Spacing**: Generous top and bottom padding
- **Width**: Full width with centered content container

## Detailed Elements Breakdown

### 1. Primary Headline
**Location**: Top center of section
**Element Type**: Heading level 1 (H1)

#### Content:
- **Text**: "N'attendez pas que les fissures apparaissent ou s'agrandissent."
- **Translation**: "Don't wait for cracks to appear or get bigger."
- **Purpose**: Urgent, attention-grabbing statement about the problem
- **Tone**: Warning/preventative messaging

### 2. Secondary Headline/Tagline
**Location**: Below primary headline
**Element Type**: Heading level 2 (H2)

#### Content:
- **Text**: "Terrastab surveille et stabilise vos sols pour protéger votre maison et votre patrimoine contre le retrait-gonflement des argiles."
- **Translation**: "Terrastab monitors and stabilizes your soil to protect your home and property against clay shrinkage-swelling."
- **Purpose**: Solution-focused statement explaining the company's service
- **Tone**: Professional and reassuring

### 3. Descriptive Paragraph
**Location**: Below secondary headline
**Element Type**: Paragraph text

#### Content:
- **Line 1**: "Le retrait-gonflement des argiles fragilise vos fondations et provoque des fissures visibles."
  - **Translation**: "Clay shrinkage-swelling weakens your foundations and causes visible cracks."
- **Line 2**: "Avec Terrastab, vous évitez des réparations coûteuses et préservez la valeur de votre maison."
  - **Translation**: "With Terrastab, you avoid costly repairs and preserve your home's value."
- **Purpose**: Problem-solution explanation with benefits
- **Tone**: Educational and benefit-focused

### 4. Call-to-Action Buttons
**Location**: Below descriptive text
**Layout**: Two-button horizontal layout

#### Button 1 (Primary CTA):
- **Text**: "Évaluez la vulnérabilité de votre habitation"
- **Translation**: "Assess your home's vulnerability"
- **Type**: Primary action button
- **Purpose**: Lead users to risk assessment
- **Style**: Primary button styling (likely brand blue)
- **Action**: Links to Section 3 (Risk Assessment)

#### Button 2 (Secondary CTA):
- **Text**: "Découvrez nos offres"
- **Translation**: "Discover our offers"
- **Type**: Secondary action button
- **Purpose**: Direct users to service offerings
- **Style**: Secondary button styling (outline or alternate color)
- **Action**: Links to Section 4 (Product Cards)

## Technical Specifications

### Colors Used:
1. **Background**: White (#FFFFFF) or very light background
2. **Primary Headline**: Dark text (likely #1a1a1a or #333333)
3. **Secondary Headline**: Dark text (same or slightly lighter)
4. **Body Text**: Medium dark gray (#555555 or #666666)
5. **Primary Button**: Brand blue background with white text
6. **Secondary Button**: Transparent background with brand blue border and text
7. **Button Hover States**: Darker variations of base colors

### Typography:
- **Primary Headline (H1)**:
  - Font Family: Sans-serif (likely modern, clean typeface)
  - Font Weight: Bold (700) or Extra Bold (800)
  - Font Size: Large (2.5rem to 4rem)
  - Line Height: 1.2 to 1.4
  - Letter Spacing: Normal or slight negative spacing

- **Secondary Headline (H2)**:
  - Font Family: Same as H1
  - Font Weight: Semi-bold (600) or Bold (700)
  - Font Size: Medium-large (1.5rem to 2.5rem)
  - Line Height: 1.3 to 1.5
  - Letter Spacing: Normal

- **Body Paragraph**:
  - Font Family: Same as headings or complementary sans-serif
  - Font Weight: Regular (400)
  - Font Size: Standard (1rem to 1.125rem)
  - Line Height: 1.6 to 1.8
  - Letter Spacing: Normal

- **Button Text**:
  - Font Family: Same as body text
  - Font Weight: Medium (500) or Semi-bold (600)
  - Font Size: 1rem or slightly larger
  - Text Transform: None or uppercase

### Interactive Elements:
- **2 CTA Buttons**: Both clickable with distinct purposes
- **Button States**:
  - Default: Base styling
  - Hover: Color/opacity changes
  - Active/Pressed: Slight scale or color variation
  - Focus: Clear focus indicators for accessibility

### Layout Specifications:
- **Content Width**: Centered with max-width (typically 1200px or container width)
- **Text Alignment**: Center-aligned for impact
- **Element Spacing**:
  - Large gap between headline and secondary headline
  - Medium gap between secondary headline and paragraph
  - Medium gap between paragraph and buttons
- **Button Layout**:
  - Horizontal arrangement on desktop
  - Stacked on mobile devices
  - Equal or proportional spacing between buttons
- **Responsive Behavior**:
  - Font sizes scale down on mobile
  - Buttons stack vertically on small screens
  - Padding adjusts for different screen sizes

## Implementation Notes

### HTML Structure:
```html
<section class="hero-section">
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-headline">
        N'attendez pas que les fissures apparaissent ou s'agrandissent.
      </h1>

      <h2 class="hero-subheadline">
        Terrastab surveille et stabilise vos sols pour protéger votre maison et votre patrimoine contre le retrait-gonflement des argiles.
      </h2>

      <p class="hero-description">
        <span>Le retrait-gonflement des argiles fragilise vos fondations et provoque des fissures visibles.</span>
        <span>Avec Terrastab, vous évitez des réparations coûteuses et préservez la valeur de votre maison.</span>
      </p>

      <div class="hero-cta-buttons">
        <a href="#risque" class="btn btn-primary">
          Évaluez la vulnérabilité de votre habitation
        </a>
        <a href="#offres" class="btn btn-secondary">
          Découvrez nos offres
        </a>
      </div>
    </div>
  </div>
</section>
```

### CSS Considerations:
- **Container**: Max-width with centered alignment
- **Typography scales**: Responsive font sizes using clamp() or media queries
- **Button styling**: Clear primary/secondary distinction
- **Spacing system**: Consistent vertical rhythm
- **Animation**: Subtle fade-in or slide-up animations on load
- **Focus management**: Clear focus indicators for keyboard navigation

### JavaScript Requirements:
- **Smooth scrolling**: For CTA button anchor links
- **Analytics tracking**: Button click events
- **Intersection Observer**: For scroll-triggered animations (optional)

### Accessibility Features:
- **Semantic HTML**: Proper heading hierarchy (H1, H2)
- **Focus management**: Keyboard-accessible buttons
- **Color contrast**: Ensure text meets WCAG standards
- **Screen reader**: Clear, descriptive text content
- **Button labels**: Descriptive action text

### Content Strategy Notes:
- **Headline**: Problem-focused to create urgency
- **Subheadline**: Solution-focused with brand name prominence
- **Description**: Problem + solution + benefit structure
- **CTAs**: Clear action-oriented language
- **Messaging flow**: Problem awareness → Solution presentation → Action encouragement

### SEO Considerations:
- **H1 tag**: Primary keyword inclusion
- **H2 tag**: Secondary keywords and brand name
- **Meta description**: Can pull from hero content
- **Page title**: Often relates to hero headline

This documentation provides all necessary details to reproduce the hero section exactly as designed, including content hierarchy, styling specifications, and user interaction patterns.