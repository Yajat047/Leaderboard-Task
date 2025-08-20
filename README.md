# Leaderboard Task

### https://leaderboard-task-tau.vercel.app/

A full-stack leaderboard application built with Node.js backend and React frontend that allows users to claim random points and displays dynamic rankings.

## Features

- **User Management**: Pre-loaded with 10 default users, ability to add new users
- **Point Claiming**: Users can claim random points (1-10) with a single click
- **Dynamic Rankings**: Real-time leaderboard updates based on total points
- **Claim History**: Complete history of all point claims with timestamps
- **Responsive UI**: Modern, responsive design with gradient backgrounds and animations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Frontend
- **React** (Create React App)
- **Axios** for API calls
- **CSS3** with modern styling and animations

## Database Schema

### User Collection
```javascript
{
  name: String (required, unique),
  totalPoints: Number (default: 0),
  rank: Number (default: 0),
  timestamps: true
}
```

### ClaimHistory Collection
```javascript
{
  userId: ObjectId (ref: User),
  userName: String,
  pointsClaimed: Number,
  totalPointsAfterClaim: Number,
  claimedAt: Date (default: Date.now),
  timestamps: true
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment example and configure:
```bash
copy .env.example .env
```
Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment example and configure:
```bash
copy .env.example .env
```
Update the `.env` file with your configuration:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_NODE_ENV=development
GENERATE_SOURCEMAP=false
```

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user
- `POST /api/users/:id/claim` - Claim random points for a user

### History
- `GET /api/history` - Get all claim history
- `GET /api/history/user/:userId` - Get claim history for specific user

## Default Users

The application comes pre-loaded with 10 users:
1. Rahul
2. Kamal
3. Sanak
4. Priya
5. Amit
6. Neha
7. Vikas
8. Anita
9. Rohit
10. Yajat

## How to Use

1. **Select a User**: Choose from the dropdown list of available users
2. **Claim Points**: Click the "Claim Random Points" button to award 1-10 random points
3. **View Rankings**: The leaderboard updates automatically showing current rankings
4. **Add New Users**: Use the "Add User" form to add new participants
5. **Check History**: View all point claims in the history section

## Features Details

### Real-time Updates
- Leaderboard automatically updates after each point claim
- Rankings are recalculated based on total points
- History section shows the latest claims first

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Modern gradient design with hover effects
- Special styling for top 3 positions (gold, silver, bronze)

### Error Handling
- Form validation for user inputs
- API error handling with user-friendly messages
- Loading states for better UX

## Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Future Enhancements

- Real-time updates using WebSockets
- User avatars and profiles
- Point decay over time
- Achievement system
- Export leaderboard data
- User authentication
- Multiple leaderboard categories

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check the connection string in `.env`
- For MongoDB Atlas, ensure IP whitelist is configured

### Port Conflicts
- Backend runs on port 5000
- Frontend runs on port 3000
- Update ports in configuration files if needed

### CORS Issues
- Backend is configured to allow requests from localhost:3000
- Update CORS settings if frontend runs on different port

## License

This project is created for educational purposes as part of an internship task.
