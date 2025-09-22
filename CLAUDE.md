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
│   └── HeroSection.tsx # Landing section
├── lib/
│   └── utils.ts      # shadcn/ui utilities (cn function)
└── App.tsx           # Main app with section placeholders
```

### Design Resources
- `designSpecs/` - Contains 8 sections of detailed design documentation
- `original-full.html` - Complete original HTML structure for reference
- `public/` - Contains TerraStab images and assets

### Current Implementation Status
- ✅ Header with responsive navigation and smooth scrolling
- ✅ Hero section with CTA buttons
- ✅ Risk Assessment section with address input form
- ✅ Product Cards section (SURVEY Light, SURVEY+, SHIELD)
- ✅ How It Works section with 4-step process
- ✅ Quote/Configuration section with solution selection
- ✅ Footer with testimonials, partners, and contact info
- ✅ shadcn/ui components (Button, Card, Input, Form, Label)
- ✅ Mobile-responsive design with hamburger menu
- ✅ Vercel deployment configuration
- ⏳ Form validation with React Hook Form + Zod (ready but basic implementation)

### Forms and Validation
React Hook Form and Zod are installed but not yet implemented. When adding forms, use the existing shadcn/ui Form component with Zod schemas for validation.

### Deployment
- Configured for Vercel with `vercel.json`
- Static site deployment (no backend required for current scope)
- Build assets output to `dist/` directory