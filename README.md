# EcoHack

A comprehensive, gamified frontend interface for measuring and understanding urban energy solutions' environmental impact. EcoHack transforms complex energy data into understandable metrics for citizens, policymakers, and investors.

## Features

### 🎯 Core Functionality

- **Metric Converter Dashboard**: Transform complex energy data into understandable metrics for three different audiences:
  - **Citizens**: Human-friendly metrics (trees equivalent, homes powered, cars removed, euros saved)
  - **Policymakers**: Policy-ready metrics (CO₂ reduction score, energy efficiency rating, sustainability index, circularity score, payback time)
  - **Business/Investors**: Investment metrics (ROI, carbon cost avoidance, CAPEX/OPEX breakdown, risk level, time to profitability)

### 🏆 Region Battle System

- **Interactive Helsinki Map**: Visual representation of competing regions
- **Real-time Leaderboards**:
  - Region rankings
  - Team rankings
  - Individual player rankings
- **Ecocarma Points System**: Earn points for implementing solutions and achieving milestones
- **Achievement System**: Unlock badges for various accomplishments
- **Live Updates**: Simulated real-time score updates every 15 seconds

### 💡 Solution Implementation

- Browse 11 different urban energy solutions organized by category:
  - Produce energy locally (solar panels, geothermal, solar thermal)
  - Store and balance energy (batteries, thermal storage)
  - Use energy efficiently (smart grids, demand-response, building upgrades)
  - Modernize district heating & cooling
- Implement solutions to earn ecocarma points and boost your region's score
- Track impact metrics for each solution

## Demo Credentials

The application uses hardcoded demo data. You can login with:

- **Username**: `demo` | **Password**: `demo123`
- **Username**: `team1` | **Password**: `team1`
- **Username**: `admin` | **Password**: `admin`

## File Structure

```
ecohack/
├── index.html          # Landing page and login
├── dashboard.html      # Main metric converter dashboard
├── battle.html         # Region battle and leaderboards
├── solutions.html      # Solution implementation interface
├── css/
│   ├── styles.css      # Main styles
│   ├── components.css  # Reusable components
│   └── animations.css  # Animations and transitions
├── js/
│   ├── data.js         # All hardcoded demo data
│   ├── auth.js         # Simulated authentication
│   ├── metrics.js      # Metric calculations and conversions
│   ├── battle.js       # Region battle logic
│   ├── gamification.js # Ecocarma, badges, achievements
│   └── app.js          # Main application logic
└── README.md
```

## Getting Started

1. Open `index.html` in a modern web browser
2. Login with one of the demo credentials
3. Explore the dashboard, battle rankings, and implement solutions

## Technologies

- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and gradients
- **SessionStorage**: For maintaining user session

## Design Features

- Modern, clean UI with green/blue eco theme
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Gamification elements: progress bars, badges, points, levels
- Interactive map with clickable regions
- Real-time feel with simulated updates

## Problem Statement

EcoHack addresses the challenge of making urban energy solutions' environmental impact understandable for different audiences:

> "How might we make the measurement of new urban energy solutions' environmental impact more understandable for citizens, policymakers and investors?"

## Solution Overview

The platform provides a comprehensive solution that:
- Simplifies complex energy data into audience-specific metrics
- Provides real-time visualization of environmental impact
- Gamifies sustainability efforts through region competition
- Encourages collaboration and tracks collective progress
- Enables data-driven decision making for all stakeholders

## Notes

- All data is hardcoded for demo purposes
- Authentication is simulated (no backend required)
- Real-time updates are simulated with JavaScript intervals
- All metrics and calculations are client-side only


