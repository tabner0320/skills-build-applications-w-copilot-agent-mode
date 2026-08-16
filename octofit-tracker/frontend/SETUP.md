# OctoFit Tracker Frontend Setup Guide

## Overview
The OctoFit Tracker frontend is a React 19 application built with Vite. It connects to a Node.js backend API running on port 8000.

## Features
- **React Router** for navigation between sections
- **Bootstrap 5** for styling
- **Vite** for fast development and building
- **Environment-aware API configuration** for Codespaces and localhost

## Environment Configuration

### For Codespaces
1. Get your Codespace name from the URL: `https://YOUR_CODESPACE_NAME-5173.app.github.dev`
2. Create or update `.env.local`:
   ```
   VITE_CODESPACE_NAME=your-codespace-name-here
   ```
3. The app will automatically use: `https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/...`

### For Local Development
1. Leave `.env.local` empty or undefined:
   ```
   # VITE_CODESPACE_NAME=
   ```
2. The app will use: `http://localhost:8000/api/...`

## API Endpoints

The frontend connects to these backend API endpoints:
- `GET /api/users` - Fetch all users
- `GET /api/teams` - Fetch all teams
- `GET /api/activities` - Fetch all activities
- `GET /api/leaderboard` - Fetch leaderboard rankings
- `GET /api/workouts` - Fetch suggested workouts

## Development

### Install Dependencies
```bash
cd octofit-tracker/frontend
npm install
```

### Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output is in the `dist/` directory.

### Linting
```bash
npm run lint
```

## Navigation
The app includes:
- **Home** - Welcome page with overview
- **Users** - Display all registered users
- **Teams** - View team information and membership
- **Activities** - See logged fitness activities
- **Leaderboard** - Competitive rankings by points
- **Workouts** - Browse suggested workouts

## Troubleshooting

### API Connection Issues
- Verify the backend is running on port 8000
- Check that `VITE_CODESPACE_NAME` is correctly set in `.env.local` for Codespaces
- For localhost, ensure no other service is using port 8000

### Missing Data
- Run the database seed script: `npm run seed` in the backend directory
- Verify MongoDB is running: `ps aux | grep mongod`

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be LTS)

## Technology Stack
- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite 8** - Build tool
- **Bootstrap 5** - CSS framework
- **Fetch API** - HTTP client (built-in)

## Notes
- The app follows RESTful API conventions
- API responses support both array and paginated formats
- All API requests include error handling and loading states
- The app is fully responsive with Bootstrap's grid system
