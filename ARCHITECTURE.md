# Nightcrawler Dashboard Architecture

## Overview

The Nightcrawler Dashboard is a Next.js-based Silicon Monitoring Dashboard designed for static export. It features a dark-themed authentication system and a comprehensive monitoring interface for silicon allocation and computing cluster workflows.

## Technical Stack

- **Framework**: Next.js 15.2.2-canary.1
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **UI Components**: Custom components inspired by shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Static export compatible

## Project Structure

```
nightcrawler/dashboard/
├── app/                    # Next.js app directory
│   ├── api/                # Mock API endpoints (static export)
│   │   └── v1/             # API version
│   │       ├── auth/       # Authentication endpoints
│   │       ├── silicon/    # Silicon data endpoints
│   │       └── workflows/  # Workflow data endpoints
│   ├── dashboard/          # Dashboard pages
│   ├── login/              # Authentication pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── api-manifest.js     # API endpoint registry
├── components/             # Reusable components
│   ├── auth/               # Authentication components
│   ├── ui/                 # UI components (shadcn/ui inspired)
│   └── sidebar.tsx         # Sidebar navigation
├── lib/                    # Utility functions and hooks
│   ├── store/              # Zustand state management
│   │   └── auth.js         # Authentication state
│   └── utils.js            # Helper functions
└── public/                 # Static assets
```

## Key Components

### Authentication System

- **Persistent Login**: Uses Zustand with localStorage persistence
- **Mock API Endpoints**: Simulates Keycloak-style authentication
- **Protected Routes**: Redirects unauthenticated users to login

### UI Components

- **Dark Theme**: Custom implementation of shadcn/ui dark theme
- **Responsive Design**: Mobile-friendly layouts using Tailwind CSS
- **Interactive Elements**: Animations and transitions with Framer Motion

### Dashboard Layout

- **Sidebar Navigation**: Collapsible sidebar with navigation links
- **Card Components**: Data visualization cards with consistent styling
- **Charts**: Simple chart visualizations for silicon demand and utilization

### Static API

- **Mock Endpoints**: Pre-rendered API responses for static hosting
- **API Manifest**: Central registry of all available endpoints
- **Data Simulation**: Realistic data patterns for demonstration

## State Management

The application uses Zustand for state management with the following stores:

1. **Auth Store**: Manages authentication state, user information, and token storage
   - Persists authentication between sessions using localStorage
   - Provides login, logout, and authentication check functions

## Deployment Considerations

- **Static Export**: Configured for `output: 'export'` in Next.js
- **API Routes**: All API routes use `dynamic = 'force-static'` for static generation
- **Node.js Version**: Requires Node.js 18.18.0+ (recommended: Node.js 20.x)
- **Hosting**: Compatible with any static file hosting service

## Future Architecture Considerations

- **Backend Integration**: Replace mock API with actual backend services
- **Real-time Updates**: Add WebSocket support for live data updates
- **Authentication Provider**: Integrate with actual Keycloak or other auth provider
- **Advanced Visualizations**: Implement more sophisticated charts and graphs
- **Theming System**: Add light/dark theme toggle and customization options
