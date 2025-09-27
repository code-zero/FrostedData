# FrostedData Application

## Overview

FrostedData is a modern data management application built with React, TypeScript, and Express.js. The application features a CRUD interface for managing items with an Apple-inspired design aesthetic that includes frosted glass effects, shimmer animations, and multiple visual design variations. The app uses a PostgreSQL database with Drizzle ORM for data persistence and includes a comprehensive UI component library built on top of Radix UI primitives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management with local React state for UI interactions
- **Styling**: Tailwind CSS with custom design system featuring Apple-inspired aesthetics
- **Component Library**: Custom components built on Radix UI primitives with shadcn/ui structure
- **Design System**: Multiple visual variants (classic, minimal, modern, compact, luxury) with theme switching capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **Database Integration**: Drizzle ORM with PostgreSQL (Neon Database)
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Design**: RESTful endpoints under `/api` prefix with JSON request/response format

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database service
- **ORM**: Drizzle ORM with schema-first approach and Zod validation
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` with automatic migrations
- **Development Storage**: In-memory storage implementation for rapid prototyping

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Security**: CORS configuration and request validation middleware
- **User Model**: Basic user entity with username-based identification

### Design Philosophy
- **Visual Design**: Apple-inspired aesthetic with frosted glass morphism effects
- **Typography**: SF Pro Display (fallback to Inter) with carefully defined hierarchy
- **Color System**: Light mode focused with CSS custom properties for theming
- **Layout**: Card-based design with generous spacing and rounded corners
- **Interactions**: Hover effects, shimmer animations, and smooth transitions

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite with TypeScript support and ESM configuration
- **Routing**: Wouter for lightweight client-side navigation

### UI and Styling
- **Design System**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with custom configuration and PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

### Backend Infrastructure
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM
- **Session Storage**: connect-pg-simple for PostgreSQL session persistence
- **Development**: tsx for TypeScript execution and hot reloading

### Development and Build
- **Type Checking**: TypeScript compiler with strict configuration
- **Linting**: ESLint integration for code quality
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Development Server**: Vite dev server with HMR and proxy configuration

### Form and Data Validation
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Schema Validation**: Zod for runtime type checking and form validation
- **Date Handling**: date-fns for date formatting and manipulation