# Photo Vote AI - Device Photo Comparison Platform

A dynamic photo comparison platform that enables anonymous voting on device photography, offering an interactive way to evaluate image quality across different devices.

## Features

- Anonymous voting system for photo comparisons
- Interactive comparison interface
- Real-time voting results
- Admin dashboard for managing comparisons
- Leaderboard showing most voted photos
- Responsive design that works on mobile and desktop

## Tech Stack

- Frontend: React with Vite
- Backend: Express.js
- Styling: Tailwind CSS with shadcn/ui components
- Authentication: Passport.js
- State Management: TanStack Query (React Query)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/zybernau/photo-vote-ai.git
cd photo-vote-ai
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory with the following variables:

```env
# Session secret for authentication (required)
SESSION_SECRET=your_session_secret_here

# Optional: Database configuration if using PostgreSQL
# DATABASE_URL=postgres://username:password@host:port/database
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
- Main application: http://localhost:5000
- Admin interface: http://localhost:5000/auth

## Usage

### Anonymous Users Can:
- Vote on photo comparisons
- View voting results
- Access the leaderboard

### Administrators Can:
1. Create an account or login through `/auth`
2. Add new photo comparisons with:
   - Device names
   - Photo URLs
3. Monitor voting results
4. View all active comparisons

## Development

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Page components
├── server/              # Backend Express application
│   ├── auth.ts         # Authentication setup
│   ├── routes.ts       # API routes
│   └── storage.ts      # Data storage interface
└── shared/             # Shared types and schemas
    └── schema.ts       # Database schema and types
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm run check`: Type-check TypeScript files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
