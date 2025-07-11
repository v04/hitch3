# Hitch - Community-Driven Reward-Token Hitchhiking App

## Overview

Hitch is a revolutionary ride-sharing platform that connects riders ("Hitchers") and drivers ("Pilots") for short to medium-distance lifts using a token-based reward system instead of traditional cash payments. The app enables community members to share rides for distances ranging from 500m to 200km, with every completed ride earning participants reward tokens that can be redeemed for food, travel gear, clothing, and exclusive coupons.

## User Preferences

Preferred communication style: Simple, everyday language.
UI/UX Preferences: Minimal spacing, engaging interactions, 9/10 user experience target
Branding: Updated from HICUT to "Hitch" for better accessibility

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React with TypeScript, optimized for mobile-first design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for role management and local state
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the stack
- **API Design**: RESTful API endpoints for all major operations
- **Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Built-in session handling for user authentication

## Key Components

### Database Schema (Drizzle ORM)
The application uses Drizzle ORM with PostgreSQL dialect, featuring these main entities:
- **Users**: Profile information, ratings, verification status, and location data
- **Tokens**: User token balances across different categories (food, travel, clothing, coupons)
- **Rides**: Complete ride lifecycle from creation to completion
- **User Stats**: Tracking ride history and environmental impact
- **Rewards**: Available rewards and user redemption history

### Core Features
1. **Role Management**: Users can switch between Rider and Pilot modes
2. **Location Services**: Real-time location tracking and nearby user discovery
3. **Ride Matching**: Smart matching system for riders and drivers
4. **Token Economy**: Reward system with category-specific tokens
5. **Rewards Marketplace**: Token redemption for real-world benefits

### UI Components
- **Bottom Navigation**: Tab-based navigation for core app sections
- **Map View**: Interactive map showing nearby users and ride opportunities
- **Role Toggle**: Dynamic switching between rider and driver modes
- **Reward System**: Visual token displays and redemption interface

## Data Flow

1. **User Onboarding**: Role selection and initial setup
2. **Location Detection**: Automatic location services with fallback to manual entry
3. **Ride Creation**: Drivers post available rides, riders search for matches
4. **Matching Process**: Real-time notification system for ride matches
5. **Token Distribution**: Automatic token rewards upon ride completion
6. **Reward Redemption**: Token-to-reward conversion with brand partnerships

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **drizzle-orm & drizzle-kit**: Type-safe database operations
- **wouter**: Lightweight routing solution
- **date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first styling framework
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Environment Variables**: DATABASE_URL required for database connectivity
- **Build Process**: Separate client and server builds

### Production Deployment
- **Frontend**: Static build optimized for web deployment
- **Backend**: Node.js server with bundled dependencies
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Designed for platforms like Vercel, Railway, or Heroku

### Key Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

## Recent Updates (January 2025)

### Major Enhancements Made
- **Branding Update**: Changed app name from HICUT to "Hitch" for better brand appeal
- **Rewards System Overhaul**: Completely redesigned rewards tab with tabbed interface, badges (Popular, Hot, Premium, Exclusive), and interactive redemption
- **Enhanced Interactivity**: Added click handlers to map users, nearby users list with connect/message buttons, and real-time feedback via toasts
- **Improved Spacing**: Reduced padding throughout app for more minimal, clean appearance
- **User Experience**: Upgraded from 6/10 to target 9/10 UX with engaging animations and micro-interactions

### Technical Improvements
- Fixed TypeScript type errors in storage implementation
- Added comprehensive toast notifications for user feedback
- Implemented tabbed reward categories (Food, Travel, Style, Deals)
- Enhanced nearby users with action buttons and improved visual hierarchy
- Made map elements clickable with proper feedback mechanisms

The application is architected for scalability with clear separation of concerns, type safety throughout the stack, and modern development practices including responsive design, accessibility features, and optimized performance.