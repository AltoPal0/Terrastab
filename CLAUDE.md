# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TerraStab is a French startup website providing connected solutions to protect homes from clay soil damage (retrait-gonflement des argiles). This is a full-featured React application with admin dashboard, customer journey flow, and algorithm-driven quote calculation system.

**User Communication Preference**: Simple, everyday language (French audience).

## Development Commands

### Core Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

### shadcn/ui Components
- `npx shadcn@latest add <component>` - Add new shadcn/ui components
- Components configured with "new-york" style, neutral base color, and Lucide icons

### Supabase
- `supabase functions deploy <function-name>` - Deploy Edge Function
- `supabase db push` - Apply database migrations
- Available functions: `risk-assessment`, `calculate-quote`, `admin-auth`, `admin-stats`, `admin-evaluations`, `admin-stats-test`

## Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Supabase Edge Functions (8 functions)
- **Database**: Supabase PostgreSQL with algorithm-driven pricing system
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Routing**: Wouter (2 routes: `/` home, `/admin` dashboard)
- **State Management**: React Context API (CustomerJourneyContext)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel (static site)

### Key Configurations
- **Path Aliases**: `@/*` maps to `./src/*` (configured in both Vite and TypeScript)
- **Build Output**: `dist/` directory for Vercel deployment
- **Tailwind CSS**: v4 with Vite plugin integration
- **TypeScript**: Strict mode with project references structure

### Project Structure
```
src/
├── components/
│   ├── ui/                      # shadcn/ui components (Button, Card, Input, Form, Label, RadioGroup, Checkbox, Accordion)
│   ├── customer-journey/        # Complete customer journey flow (8 components)
│   │   ├── CustomerJourney.tsx  # Main journey container
│   │   ├── AddressEntry.tsx     # Address input with geocoding
│   │   ├── AlgoQuestionnaire.tsx # Dynamic questionnaire (algorithm-driven)
│   │   ├── RecommendationDisplay.tsx # Risk-based recommendations
│   │   ├── Configurator.tsx     # Solution configuration
│   │   ├── QuoteDisplay.tsx     # Detailed quote with breakdown
│   │   ├── DepositPayment.tsx   # Payment processing
│   │   └── PaymentConfirmation.tsx # Order confirmation
│   ├── admin/                   # Admin dashboard (6 components)
│   │   ├── AdminApp.tsx
│   │   ├── AdminAuth.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── ChartsSection.tsx
│   │   └── StatisticsCards.tsx
│   ├── Header.tsx               # Main navigation with mobile menu
│   ├── HeroSection.tsx          # Landing section with CTAs
│   ├── MiniPromise.tsx          # Value proposition section
│   ├── RiskAssessmentSection.tsx # Risk assessment with live API
│   ├── ExpertQuotes.tsx         # Social proof / testimonials
│   ├── ProductCardsSection.tsx  # Product showcase
│   ├── TechSection.tsx          # Technical details
│   ├── HowItWorksSection.tsx    # 4-step process
│   ├── TrustLogos.tsx           # Partners/certifications
│   ├── FAQSection.tsx           # FAQ with accordion
│   ├── QuoteSection.tsx         # Quote CTA section
│   ├── SecondCTA.tsx            # Additional conversion point
│   ├── UrgencySection.tsx       # Conversion optimization
│   └── Footer.tsx               # Footer with links
├── contexts/
│   └── CustomerJourneyContext.tsx # Global state for customer journey
├── lib/
│   ├── utils.ts                 # shadcn/ui utilities (cn function)
│   ├── supabase.ts              # Supabase client and risk assessment API
│   ├── algo-api.ts              # Algorithm and quote calculation API
│   ├── adminApi.ts              # Admin API calls
│   └── productConfig.ts         # Product configuration
├── types/
│   ├── risk-assessment.ts       # Risk assessment types
│   ├── customer-journey.ts      # Customer journey types
│   └── algo.ts                  # Algorithm and pricing types
└── App.tsx                      # Main app with routing

supabase/
├── functions/
│   ├── risk-assessment/         # Clay soil risk assessment API
│   ├── calculate-quote/         # Algorithm-driven quote calculation
│   ├── admin-auth/              # Admin authentication
│   ├── admin-stats/             # Admin statistics aggregation
│   ├── admin-stats-test/        # Testing admin stats
│   └── admin-evaluations/       # Admin evaluation management
└── migrations/
    ├── 001_create_risk_assessments.sql  # Risk assessments table
    ├── 002_create_algo_system.sql       # USERS, ALGO, PRICE_BOOK, RESULTS tables
    └── 003_insert_algo_v1_data.sql      # Initial algorithm rules and pricing
```

### Design Resources
- `designSpecs/` - Contains 8 sections of detailed design documentation
- `original-full.html` - Complete original HTML structure for reference
- `public/` - Contains TerraStab images and assets

### Current Implementation Status

#### ✅ Marketing Website (Complete)
- Header with responsive navigation and smooth scrolling
- Hero section with CTA buttons
- MiniPromise value proposition section
- Risk Assessment section with LIVE API integration
  - Address geocoding via Google Maps API
  - Clay soil risk data from French Georisques API
  - Real-time risk visualization with color-coded results
- ExpertQuotes (social proof)
- Product Cards section (SURVEY Light, SURVEY+, SHIELD)
- TechSection with technical specifications
- How It Works section (4-step process)
- TrustLogos (partners/certifications)
- FAQ section with accordion
- Quote/Configuration section
- SecondCTA for additional conversion
- UrgencySection for conversion optimization
- Footer with links and contact info
- Mobile-responsive design with hamburger menu
- Framer Motion animations
- Vercel Analytics integration

#### ✅ Customer Journey Flow (Complete)
- **Multi-step state management** with CustomerJourneyContext
- **7-step journey**:
  1. Address Entry (with geocoding validation)
  2. Risk-based Recommendation
  3. Algorithm-driven Questionnaire (AlgoQuestionnaire)
  4. Solution Configuration
  5. Detailed Quote Display (with itemized pricing)
  6. Deposit Payment Processing
  7. Order Confirmation
- Progress tracking across steps
- Form validation with React Hook Form + Zod
- Real-time quote calculation via algorithm

#### ✅ Algorithm System (Complete)
- **Database-driven rules engine**:
  - `algo_table`: Calculation rules by question blocks
  - `price_book`: Product pricing (sensors, controllers, irrigation stakes)
  - `results`: Stored quote calculations
  - `users`: Customer profiles with contact modes
- **calculate-quote Edge Function**:
  - Processes questionnaire responses
  - Applies algorithm rules dynamically
  - Calculates quantities and pricing
  - Returns detailed quote with breakdown
- **algo-api.ts**: TypeScript client for algorithm API
- **AlgoQuestionnaire component**: Dynamic form generation from algorithm rules

#### ✅ Admin Dashboard (Complete)
- Admin authentication system
- Statistics dashboard with cards
- Charts and analytics section
- Evaluation management
- 4 dedicated Edge Functions for admin operations

#### ✅ Supabase Backend (Complete)
- 8 Edge Functions deployed and active
- 3 database migrations applied
- TypeScript API clients implemented
- Environment variables configured

### Database Schema

#### Tables
1. **risk_assessments**: Store risk assessment results
2. **users**: Customer profiles with flexible contact modes (phone, email, OAuth)
3. **algo_table**: Algorithm rules defining calculation logic per question block
4. **price_book**: Product pricing for sensors, controllers, and irrigation equipment
5. **results**: Stored quote calculations with full breakdown

#### Key Features
- UUID primary keys with `gen_random_uuid()`
- JSONB fields for flexible metadata storage
- Timestamped records with `created_at`
- Validation constraints on contact methods
- Indexed fields for fast lookups

### API Endpoints (Supabase Edge Functions)

#### Public APIs
- **risk-assessment**: Geocode address → query Georisques.gouv.fr → return risk level
- **calculate-quote**: Process questionnaire → apply algorithm → calculate pricing → return detailed quote

#### Admin APIs
- **admin-auth**: Authenticate admin users
- **admin-stats**: Aggregate statistics for dashboard
- **admin-stats-test**: Test statistics functionality
- **admin-evaluations**: Manage customer evaluations

### Forms and Validation
React Hook Form and Zod are fully implemented in the customer journey flow:
- Address validation with geocoding
- Multi-step form with progress tracking
- Dynamic questionnaire forms
- Payment form validation
- Error handling and user feedback

### Risk Assessment API
The risk assessment feature uses a live Supabase Edge Function that:
1. **Geocodes French addresses** using Google Geocoding API
2. **Queries Georisques.gouv.fr** for official clay soil risk data (RGA)
3. **Returns structured risk assessment** with color-coded visualization
4. **Handles API failures gracefully** with fallback to default risk levels

### Quote Calculation Algorithm
The quote calculation system is database-driven:
1. **User answers questionnaire** with property details
2. **Algorithm rules from algo_table** determine required products
3. **Pricing from price_book** calculates costs
4. **Quote stored in results** with full breakdown
5. **Returns detailed quote** with quantities, pricing, and recommendations

**Environment Variables Required:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `GOOGLE_GEOCODING_API_KEY` - Google Maps API key (set in Supabase dashboard)

### Routing
- `/` - Main marketing website with customer journey
- `/admin` - Admin dashboard (authentication required)

### Deployment
- **Frontend**: Configured for Vercel with `vercel.json`
- **Backend**: Supabase Edge Functions (8 serverless functions)
- **Database**: Supabase PostgreSQL
- **Build assets**: Output to `dist/` directory
- **Analytics**: Vercel Analytics integrated

### Coding Preferences
- **Fallbacks**: IMPORTANT - Never use fallbacks. If it fails, proper error needs to be displayed as we are in development
- **Git Push Policy**: CRITICAL - ALWAYS ask user permission before pushing to remote repository. Never run `git push` without explicit user approval.
- **State Management**: Use CustomerJourneyContext for customer journey state, props for component-local state
- **Type Safety**: All API responses must have TypeScript types defined
- **Error Handling**: Display user-friendly errors, log technical details to console