# TerraStab - Web Application

## Overview

TerraStab is a professional, responsive website for a French startup that provides connected solutions to protect individual homes from clay soil damage (retrait-gonflement des argiles). The application features a modern React frontend with a Node.js/Express backend, targeting homeowners in rural and suburban areas who need to assess and mitigate clay soil risks.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens for TerraStab branding
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
 - **SUPABASE**

## Key Components

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Lastest Tailwind CSS
- **Components**: Radix UI primitives, Lucide React icons
- **Validation**: Zod for schema validation
- **Carousel**: Embla Carousel for image galleries

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict mode
- **Linting**: ESLint configuration
- **Development Server**: Vite dev server with HMR

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds optimized React application to `dist/public`
2. **Backend Build**: esbuild compiles TypeScript server code to `dist/index.js`
3. **Static Assets**: Frontend assets served from `dist/public` directory

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with hot reloading

### Architecture Benefits
- **Scalability**: Clean separation between frontend and backend
- **Performance**: Optimized builds with code splitting and lazy loading
- **Developer Experience**: Hot reloading, TypeScript support, and comprehensive error handling
- **Maintainability**: Modular component structure and clear data flow patterns
- **SEO Friendly**: Server-side rendering ready architecture
- **Mobile First**: Responsive design with mobile-optimized components

The application follows modern web development best practices with a focus on performance, user experience, and maintainability. The architecture supports both immediate deployment and future scaling needs.