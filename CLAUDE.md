# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TerraStab is a French startup website providing connected solutions to protect homes from clay soil damage (retrait-gonflement des argiles). This is a static React application targeting homeowners in rural and suburban areas.

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

## Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Supabase Edge Functions for risk assessment API
- **Database**: Supabase PostgreSQL (migrations configured)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Routing**: Wouter (lightweight client-side routing)
- **Forms**: React Hook Form + Zod validation (ready but not implemented)
- **Icons**: Lucide React
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
│   ├── ui/           # shadcn/ui components (Button, Card, Input, Form, Label)
│   ├── Header.tsx    # Main navigation with mobile menu
│   ├── HeroSection.tsx # Landing section
│   └── RiskAssessmentSection.tsx # Risk assessment with live API integration
├── lib/
│   ├── utils.ts      # shadcn/ui utilities (cn function)
│   └── supabase.ts   # Supabase client and risk assessment API
├── types/
│   └── risk-assessment.ts # TypeScript types for risk assessment
└── App.tsx           # Main app with section placeholders

supabase/
├── functions/
│   └── risk-assessment/ # Edge Function for clay soil risk API
└── migrations/      # Database schema migrations
```

### Design Resources
- `designSpecs/` - Contains 8 sections of detailed design documentation
- `original-full.html` - Complete original HTML structure for reference
- `public/` - Contains TerraStab images and assets

### Current Implementation Status
- ✅ Header with responsive navigation and smooth scrolling
- ✅ Hero section with CTA buttons
- ✅ **Risk Assessment section with LIVE API integration**
  - Address geocoding via Google Maps API
  - Clay soil risk data from French Georisques API
  - Real-time risk visualization with color-coded results
  - Fallback handling for API failures
- ✅ Product Cards section (SURVEY Light, SURVEY+, SHIELD)
- ✅ How It Works section with 4-step process
- ✅ Quote/Configuration section with solution selection
- ✅ Footer with testimonials, partners, and contact info
- ✅ shadcn/ui components (Button, Card, Input, Form, Label)
- ✅ Mobile-responsive design with hamburger menu
- ✅ Vercel deployment configuration
- ✅ **Supabase backend integration**
  - Edge Function deployed and active
  - Database migrations configured
  - TypeScript API client implemented
- ⏳ Form validation with React Hook Form + Zod (ready but basic implementation)

### Forms and Validation
React Hook Form and Zod are installed but not yet implemented. When adding forms, use the existing shadcn/ui Form component with Zod schemas for validation.

### Risk Assessment API
The risk assessment feature uses a live Supabase Edge Function that:
1. **Geocodes French addresses** using Google Geocoding API
2. **Queries Georisques.gouv.fr** for official clay soil risk data (RGA)
3. **Returns structured risk assessment** with color-coded visualization
4. **Handles API failures gracefully** with fallback to default risk levels

**Environment Variables Required:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `GOOGLE_GEOCODING_API_KEY` - Google Maps API key (set in Supabase dashboard)

**Deployment Commands:**
- `supabase functions deploy risk-assessment` - Deploy Edge Function
- `supabase db push` - Apply database migrations

### Deployment
- **Frontend**: Configured for Vercel with `vercel.json`
- **Backend**: Supabase Edge Functions (serverless)
- **Database**: Supabase PostgreSQL
- Build assets output to `dist/` directory

### Coding preferences
- **Fallbacks**: IMPORTANT : Never use fallbacks. if it fails, proper error needs to be displayed as we are development
- **Git Push Policy**: CRITICAL - ALWAYS ask user permission before pushing to remote repository. Never run `git push` without explicit user approval.