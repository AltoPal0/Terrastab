# Terrastab Website - Section 3: Risk Assessment Section - Complete Documentation

## Overview
The risk assessment section provides an interactive tool for users to evaluate their property's vulnerability to clay soil issues. It combines educational content with a functional form to generate leads and provide immediate value to visitors.

## Section Structure

### Main Container
- **Element Type**: Content section with form
- **Layout**: Two-part layout (information + interactive form)
- **Background**: Clean white or light background
- **ID**: "risque" (for anchor navigation)
- **Spacing**: Standard section padding

## Detailed Elements Breakdown

### 1. Section Header Content
**Location**: Top of section
**Layout**: Text content introducing the tool

#### Heading:
- **Text**: "Connaitre mon niveau de risque"
- **Element Type**: Heading level 2 (H2)
- **Translation**: "Know my risk level"
- **Purpose**: Clear section identifier

#### Description Paragraph:
- **Text**: "Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM pour estimer le risque RGA (retrait-gonflement des argiles) à votre adresse."
- **Translation**: "Terrastab uses official data from the Georisques platform and BRGM data to estimate RGA risk (clay shrinkage-swelling) at your address."
- **Purpose**: Builds credibility by referencing official data sources
- **Key Terms**:
  - Georisques: Official French government risk platform
  - BRGM: French geological survey organization
  - RGA: Retrait-Gonflement des Argiles (clay shrinkage-swelling)

### 2. Interactive Risk Assessment Form
**Location**: Main focal point of section
**Layout**: Form with input field and submit button

#### Form Container:
- **Element Type**: Form element
- **Purpose**: Address input for risk assessment
- **Method**: POST or GET (depending on backend)
- **Action**: Risk assessment processing endpoint

#### Address Input Field:
- **Label Text**: "Adresse de votre maison"
- **Translation**: "Address of your house"
- **Element Type**: Text input (textbox)
- **Placeholder**: "123 Rue de la Paix, 75001 Paris"
- **Input Type**: text (with potential address autocomplete)
- **Required**: Yes
- **Validation**: Address format validation
- **Accessibility**: Proper label association

#### Form Help Text:
- **Text**: "L'évaluation se base uniquement sur la localisation géographique selon les données Georisques.gouv.fr"
- **Translation**: "The assessment is based solely on geographical location according to Georisques.gouv.fr data"
- **Purpose**: Clarifies data source and methodology
- **Styling**: Smaller, lighter text below input

#### Submit Button:
- **Text**: "Testez votre niveau de risque RGA"
- **Translation**: "Test your RGA risk level"
- **Element Type**: Submit button
- **Style**: Primary CTA button
- **Action**: Submits form for risk assessment
- **State Management**: Loading state during processing

## Technical Specifications

### Colors Used:
1. **Background**: White (#FFFFFF) or very light background
2. **Heading Text**: Dark gray/black (#333333)
3. **Body Text**: Medium gray (#666666)
4. **Input Field**:
   - Background: White (#FFFFFF)
   - Border: Light gray (#DDDDDD or #E0E0E0)
   - Focus border: Brand blue
   - Text: Dark gray (#333333)
5. **Submit Button**:
   - Background: Brand blue (primary color)
   - Text: White (#FFFFFF)
   - Hover: Darker blue
6. **Help Text**: Light gray (#999999)

### Typography:
- **Section Heading (H2)**:
  - Font Family: Sans-serif (consistent with site)
  - Font Weight: Bold (700)
  - Font Size: 2rem to 2.5rem
  - Color: Dark text color

- **Description Text**:
  - Font Family: Sans-serif
  - Font Weight: Regular (400)
  - Font Size: 1rem to 1.125rem
  - Line Height: 1.6
  - Color: Medium gray

- **Form Label**:
  - Font Family: Sans-serif
  - Font Weight: Medium (500) or Semi-bold (600)
  - Font Size: 1rem
  - Color: Dark gray

- **Input Field**:
  - Font Family: Sans-serif
  - Font Weight: Regular (400)
  - Font Size: 1rem
  - Color: Dark gray

- **Button Text**:
  - Font Family: Sans-serif
  - Font Weight: Medium (500) or Semi-bold (600)
  - Font Size: 1rem or 1.125rem

- **Help Text**:
  - Font Family: Sans-serif
  - Font Weight: Regular (400)
  - Font Size: 0.875rem (14px)
  - Color: Light gray

### Form Specifications:
- **Input Field**:
  - Width: Full width of container (responsive)
  - Height: Standard input height (40-48px)
  - Padding: 12-16px horizontal, 10-12px vertical
  - Border: 1-2px solid border
  - Border Radius: 4-8px (consistent with site design)
  - Font Size: 16px (prevents zoom on mobile)

- **Submit Button**:
  - Width: Full width or auto-width based on design
  - Height: 44-48px (touch-friendly)
  - Padding: 12-16px horizontal
  - Border Radius: 4-8px (matching input field)
  - Font Size: 16px

### Interactive Elements:
- **1 Text Input**: Address entry field
- **1 Submit Button**: Form submission
- **Input States**:
  - Default: Base styling
  - Focus: Border color change, possible shadow
  - Valid: Green accent (optional)
  - Invalid: Red accent with error message
  - Disabled: Grayed out during processing

- **Button States**:
  - Default: Primary brand color
  - Hover: Darker shade
  - Active: Pressed state
  - Loading: Spinner or loading text
  - Disabled: Grayed out

### Layout Specifications:
- **Section Width**: Full width with centered content container
- **Content Alignment**: Center-aligned or left-aligned based on design
- **Form Layout**: Vertical stack (label, input, help text, button)
- **Spacing**:
  - Section padding: 60-80px top/bottom
  - Element spacing: 16-24px between form elements
  - Generous whitespace around form

## Implementation Notes

### HTML Structure:
```html
<section id="risque" class="risk-assessment-section">
  <div class="risk-container">
    <div class="risk-content">
      <h2 class="risk-heading">Connaitre mon niveau de risque</h2>

      <p class="risk-description">
        Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM pour estimer le risque RGA (retrait-gonflement des argiles) à votre adresse.
      </p>

      <form class="risk-assessment-form" action="/assess-risk" method="POST">
        <div class="form-group">
          <label for="address" class="form-label">
            Adresse de votre maison
          </label>

          <input
            type="text"
            id="address"
            name="address"
            class="form-input"
            placeholder="123 Rue de la Paix, 75001 Paris"
            required
            autocomplete="street-address"
          >

          <p class="form-help-text">
            L'évaluation se base uniquement sur la localisation géographique selon les données Georisques.gouv.fr
          </p>
        </div>

        <button type="submit" class="btn btn-primary form-submit">
          Testez votre niveau de risque RGA
        </button>
      </form>
    </div>
  </div>
</section>
```

### CSS Considerations:
- **Form styling**: Consistent with site design system
- **Responsive design**: Form adapts to mobile screens
- **Focus management**: Clear focus indicators
- **Validation styling**: Error states for invalid input
- **Loading states**: Visual feedback during processing
- **Accessibility**: High contrast, proper spacing

### JavaScript Requirements:
- **Form validation**: Client-side address format checking
- **Address autocomplete**: Integration with mapping API (optional)
- **Form submission**: AJAX handling for smooth UX
- **Loading states**: Show processing indicator
- **Error handling**: Display validation errors
- **Analytics**: Track form submission events

### API Integration:
- **Georisques API**: For official risk data
- **BRGM data**: Geological risk information
- **Address validation**: Ensure valid French addresses
- **Risk calculation**: Backend processing of risk level

### Accessibility Features:
- **Semantic HTML**: Proper form structure
- **Label association**: Clear input-label relationships
- **ARIA attributes**: Enhanced screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Error announcements**: Screen reader error messaging
- **Focus management**: Logical tab order

### Security Considerations:
- **Input sanitization**: Prevent injection attacks
- **Rate limiting**: Prevent form spam
- **CSRF protection**: Secure form submissions
- **Data privacy**: GDPR compliance for address data

### Data Sources Referenced:
- **Georisques.gouv.fr**: Official French government risk platform
- **BRGM**: Bureau de Recherches Géologiques et Minières
- **RGA Data**: Clay shrinkage-swelling risk information

This documentation provides all necessary details to reproduce the risk assessment section exactly as designed, including form functionality, data integration, and user experience considerations.