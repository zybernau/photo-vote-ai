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
# Required: Session secret for secure authentication
# Generate a random string (minimum 32 characters) for production
SESSION_SECRET=your_secure_session_secret_here

# Optional: Database configuration
# If not provided, the app will use in-memory storage (suitable for development)
DATABASE_URL=postgres://username:password@host:port/database
```

### Storage Options

The application supports two storage modes:

1. **In-Memory Storage (Default)**
   - Perfect for development and testing
   - No additional configuration needed
   - Data is cleared when the server restarts

2. **PostgreSQL Database**
   - Recommended for production use
   - Requires DATABASE_URL in .env
   - Persistent data storage

## Running the Application

### Development Mode

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
- Main application: http://localhost:5000
- Admin interface: http://localhost:5000/auth

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

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