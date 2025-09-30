# Terrastab Website - Section 6: Configuration Section - Complete Documentation

## Overview
The configuration section provides an interactive interface for users to select their preferred Terrastab solution. It starts the quote process by allowing users to choose between the three service tiers based on their specific needs and risk levels.

## Section Structure

### Main Container
- **Element Type**: Content section with interactive elements
- **Layout**: Header + 3-option selection interface
- **Background**: Clean white or light background
- **ID**: "devis" (for anchor navigation)
- **Spacing**: Standard section padding

## Detailed Elements Breakdown

### 1. Section Header
**Location**: Top of section
**Layout**: Centered header content

#### Main Heading:
- **Text**: "Configurez votre solution en 4 étapes"
- **Element Type**: Heading level 2 (H2)
- **Translation**: "Configure your solution in 4 steps"
- **Purpose**: Section introduction and process indication

#### Description:
- **Text**: "Obtenez un devis précis adapté à votre maison"
- **Translation**: "Get an accurate quote adapted to your home"
- **Purpose**: Value proposition and benefit statement

### 2. Step 1 Subsection
**Location**: Below main header
**Layout**: Step introduction

#### Step Header:
- **Text**: "Étape 1 : Choisissez votre offre"
- **Element Type**: Heading level 3 (H3)
- **Translation**: "Step 1: Choose your offer"
- **Purpose**: Current step identification

#### Step Description:
- **Text**: "Sélectionnez la solution adaptée à votre niveau de risque"
- **Translation**: "Select the solution adapted to your risk level"
- **Purpose**: Instruction for user action

### 3. Solution Selection Interface
**Layout**: 3-option horizontal selection grid
**Type**: Interactive button/card selection

## Option 1: SURVEY Light

### Selection Card Structure:
#### Visual Elements:
- **Product Image**: Icon/illustration for SURVEY Light
- **Card Type**: Selectable button/card

#### Content:
- **Product Name**: "SURVEY Light" (Heading level 4)
- **Description**: "Surveillance simple et efficace"
- **Translation**: "Simple and effective monitoring"
- **Risk Level**: "Risque faible"
- **Translation**: "Low risk"
- **Style**: Risk level badge or indicator

#### Interactive Elements:
- **Selection State**: Default, hover, selected states
- **Click Action**: Selects this option for configuration
- **Visual Feedback**: Clear selection indication

## Option 2: SURVEY+

### Selection Card Structure:
#### Visual Elements:
- **Product Image**: Icon/illustration for SURVEY+
- **Card Type**: Selectable button/card

#### Content:
- **Product Name**: "SURVEY+" (Heading level 4)
- **Description**: "Étude complète mur par mur"
- **Translation**: "Complete wall-to-wall study"
- **Risk Level**: "Risque modéré"
- **Translation**: "Moderate risk"
- **Style**: Risk level badge or indicator

#### Interactive Elements:
- **Selection State**: Default, hover, selected states
- **Click Action**: Selects this option for configuration
- **Visual Feedback**: Clear selection indication

## Option 3: SHIELD

### Selection Card Structure:
#### Visual Elements:
- **Product Image**: Icon/illustration for SHIELD
- **Card Type**: Selectable button/card (potentially highlighted as premium)

#### Content:
- **Product Name**: "SHIELD" (Heading level 4)
- **Description**: "Protection complète avec irrigation"
- **Translation**: "Complete protection with irrigation"
- **Risk Level**: "Risque fort"
- **Translation**: "High risk"
- **Style**: Risk level badge or indicator

#### Interactive Elements:
- **Selection State**: Default, hover, selected states
- **Click Action**: Selects this option for configuration
- **Visual Feedback**: Clear selection indication
- **Premium Styling**: May have enhanced visual treatment

## Technical Specifications

### Colors Used:
1. **Background**: White (#FFFFFF) or light section background
2. **Selection Cards**:
   - Default: White background with border
   - Hover: Light blue or gray background
   - Selected: Brand blue background or strong border
3. **Heading Text**: Dark gray/black (#333333)
4. **Body Text**: Medium gray (#666666)
5. **Risk Level Badges**: Color-coded by risk level
   - Low Risk: Green (#28A745)
   - Moderate Risk: Orange/Amber (#FFC107)
   - High Risk: Red (#DC3545)
6. **Selection Indicators**: Brand blue for selected state

### Typography:
- **Section Heading (H2)**:
  - Font Family: Sans-serif
  - Font Weight: Bold (700)
  - Font Size: 2rem to 2.5rem
  - Color: Dark text

- **Step Heading (H3)**:
  - Font Family: Sans-serif
  - Font Weight: Bold (700)
  - Font Size: 1.5rem to 1.75rem
  - Color: Dark text

- **Product Names (H4)**:
  - Font Family: Sans-serif
  - Font Weight: Bold (700)
  - Font Size: 1.25rem to 1.5rem
  - Color: Dark text

- **Descriptions**:
  - Font Family: Sans-serif
  - Font Weight: Regular (400)
  - Font Size: 1rem
  - Color: Medium gray

- **Risk Level Badges**:
  - Font Family: Sans-serif
  - Font Weight: Medium (500)
  - Font Size: 0.875rem
  - Color: Varies by risk level

### Selection Card Specifications:
- **Card Dimensions**: Equal width cards with consistent height
- **Card Spacing**: 16-24px gaps between cards
- **Card Padding**: 20-24px internal padding
- **Border**: 2px solid border (color varies by state)
- **Border Radius**: 8-12px (consistent with site design)
- **Selection States**:
  - Default: Light border (#E0E0E0)
  - Hover: Darker border or background change
  - Selected: Brand color border or background
  - Focus: Clear focus indicator for accessibility

### Interactive Elements:
- **3 Selection Cards**: All clickable with radio button behavior
- **Selection Logic**: Only one option can be selected at a time
- **Visual States**:
  - Default: Base styling
  - Hover: Background or border color change
  - Active: Pressed state styling
  - Selected: Clear selected state indication
  - Focus: Accessibility focus indicators

### Layout Specifications:
- **Grid Layout**: 3-column equal-width layout
- **Responsive Behavior**:
  - Desktop: 3 columns horizontal
  - Tablet: 3 columns (may be smaller)
  - Mobile: 1 column stacked or 2x1.5 layout
- **Card Alignment**: Center-aligned content within cards
- **Image Sizing**: Consistent dimensions across all option cards

## Implementation Notes

### HTML Structure:
```html
<section id="devis" class="configuration-section">
  <div class="configuration-container">
    <div class="section-header">
      <h2 class="section-heading">Configurez votre solution en 4 étapes</h2>
      <p class="section-description">Obtenez un devis précis adapté à votre maison</p>
    </div>

    <div class="step-section">
      <h3 class="step-heading">Étape 1 : Choisissez votre offre</h3>
      <p class="step-description">Sélectionnez la solution adaptée à votre niveau de risque</p>

      <form class="solution-selection-form">
        <div class="selection-grid">
          <!-- SURVEY Light Option -->
          <label class="selection-card" for="survey-light">
            <input type="radio" id="survey-light" name="solution" value="survey-light" class="selection-input">
            <div class="card-content">
              <img src="icon_card_survey_light.svg" alt="SURVEY Light" class="product-image">
              <h4 class="product-name">SURVEY Light</h4>
              <p class="product-description">Surveillance simple et efficace</p>
              <span class="risk-badge risk-low">Risque faible</span>
            </div>
            <div class="selection-indicator"></div>
          </label>

          <!-- SURVEY+ Option -->
          <label class="selection-card" for="survey-plus">
            <input type="radio" id="survey-plus" name="solution" value="survey-plus" class="selection-input">
            <div class="card-content">
              <img src="icon_card_survey_plus.svg" alt="SURVEY+" class="product-image">
              <h4 class="product-name">SURVEY+</h4>
              <p class="product-description">Étude complète mur par mur</p>
              <span class="risk-badge risk-moderate">Risque modéré</span>
            </div>
            <div class="selection-indicator"></div>
          </label>

          <!-- SHIELD Option -->
          <label class="selection-card selection-card-premium" for="shield">
            <input type="radio" id="shield" name="solution" value="shield" class="selection-input">
            <div class="card-content">
              <img src="icon_card_shield.svg" alt="SHIELD" class="product-image">
              <h4 class="product-name">SHIELD</h4>
              <p class="product-description">Protection complète avec irrigation</p>
              <span class="risk-badge risk-high">Risque fort</span>
            </div>
            <div class="selection-indicator"></div>
          </label>
        </div>

        <!-- Additional steps would continue here -->
      </form>
    </div>
  </div>
</section>
```

### CSS Considerations:
- **Radio Button Styling**: Custom styled radio buttons hidden, labels as clickable cards
- **Selection States**: Clear visual feedback for user selections
- **Grid Layout**: Responsive 3-column layout with proper spacing
- **Hover Effects**: Smooth transitions for interactive feedback
- **Accessibility**: Focus indicators and proper contrast ratios

### JavaScript Requirements:
- **Selection Logic**: Single selection radio button behavior
- **Visual Updates**: Update card styling based on selection
- **Form Validation**: Ensure selection before proceeding
- **Progress Tracking**: Track step completion
- **Analytics**: Track solution selection events

### Form Integration:
- **Step 1**: Solution selection (documented here)
- **Step 2**: Configuration details (form continues)
- **Step 3**: Contact information (form continues)
- **Step 4**: Final review and submission (form continues)
- **Form State**: Preserve selections across steps
- **Validation**: Ensure required selections are made

### Image Requirements:
- **3 Product Icons**: SVG format preferred
  - icon_card_survey_light.svg
  - icon_card_survey_plus.svg
  - icon_card_shield.svg
- **Consistent Style**: Matching the previous product cards section
- **Selection States**: May need selected/unselected variants

### Accessibility Features:
- **Semantic HTML**: Proper form structure with labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Clear selection announcements
- **Focus Management**: Logical tab order
- **Color Independence**: Don't rely solely on color for selection state
- **ARIA Labels**: Enhanced accessibility attributes

### State Management:
- **Selection Persistence**: Remember user choice during session
- **Form Progress**: Indicate current step in multi-step process
- **Validation States**: Show errors if no selection made
- **Loading States**: Handle processing during form submission

### User Experience Notes:
- **Clear Selection**: Obvious visual feedback for selected option
- **Comparison**: Easy to compare options side-by-side
- **Progressive Disclosure**: Step-by-step approach reduces cognitive load
- **Mobile Optimization**: Touch-friendly interface for mobile devices

This documentation provides all necessary details to reproduce the configuration section exactly as designed, including the interactive selection interface, form structure, and user experience considerations.