# GigFlow - Freelance Marketplace Platform

> A full-stack freelance marketplace platform where clients can post jobs (Gigs) and freelancers can submit competitive bids.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [The Hiring Logic](#-the-hiring-logic)
- [Bonus Features](#-bonus-features)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Demo](#-demo)
- [Contributing](#-contributing)

## 🎯 Project Overview

GigFlow is a mini-freelance marketplace platform that connects clients with skilled freelancers. The platform implements a fluid role system where any authenticated user can function as both a client (posting jobs) and a freelancer (submitting bids).

### Key Highlights

- **Dual Role System**: Users can seamlessly switch between posting gigs and bidding on them
- **Atomic Hiring Logic**: Race-condition-safe hiring system using MongoDB transactions
- **Real-time Notifications**: Socket.io integration for instant hire notifications
- **Secure Authentication**: JWT-based auth with HttpOnly cookies
- **Advanced State Management**: Redux Toolkit for predictable state updates


## ✨ Features

### Core Features

#### A. User Authentication
- ✅ Secure registration and login system
- ✅ JWT authentication with HttpOnly cookies
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware
- ✅ Fluid role system (Client/Freelancer flexibility)

#### B. Gig Management (CRUD Operations)
- ✅ **Browse Gigs**: Public feed displaying all "Open" jobs
- ✅ **Search & Filter**: Real-time search by job title
- ✅ **Create Gigs**: Authenticated users can post jobs with:
  - Title
  - Description
  - Budget
- ✅ **Update & Delete**: Gig owners can modify their postings
- ✅ **Status Tracking**: Automatic status updates (Open → Assigned)

#### C. Bidding System
- ✅ Freelancers can submit bids with custom messages and proposed prices
- ✅ Clients can view all bids on their posted gigs
- ✅ Bid status tracking (Pending, Hired, Rejected)
- ✅ Owner-only bid visibility for privacy

#### D. The Hiring Logic (Critical Feature)
This is the core functionality that demonstrates understanding of complex business logic:

1. **Bid Submission**: Freelancers submit bids with message + price
2. **Bid Review**: Clients see all submitted bids on their gigs
3. **Atomic Hiring**: When a client clicks "Hire" on a bid:
   - ✅ Gig status changes: `open` → `assigned`
   - ✅ Selected bid status changes: `pending` → `hired`
   - ✅ All other bids automatically marked as `rejected`
   - ✅ Transaction-safe to prevent race conditions
   - ✅ Real-time notification sent to hired freelancer

### Bonus Features

#### 🏆 Bonus 1: Transactional Integrity
- ✅ **MongoDB Transactions**: Implemented using multi-document ACID transactions
- ✅ **Race Condition Prevention**: Ensures only one freelancer can be hired even if multiple clients click simultaneously
- ✅ **Atomic Operations**: All hiring steps succeed or fail together
- ✅ **Concurrency Handling**: Proper session management and error rollback

#### 🏆 Bonus 2: Real-time Updates (Socket.io)
- ✅ **Instant Notifications**: Freelancers receive real-time hire notifications
- ✅ **Live Dashboard Updates**: No page refresh required
- ✅ **Socket Authentication**: Secure WebSocket connections
- ✅ **Connection Management**: Automatic reconnection and cleanup

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 19.0.0 | UI Framework |
| Vite | 7.x | Build Tool & Dev Server |
| Redux Toolkit | Latest | State Management |
| React Router DOM | 7.x | Client-side Routing |
| Tailwind CSS | 4.x | Styling Framework |
| Axios | Latest | HTTP Client |
| Socket.io Client | Latest | Real-time Communication |
| React Toastify | Latest | Toast Notifications |
| Lucide React | Latest | Icon Library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ≥18.0.0 | Runtime Environment |
| Express.js | Latest | Web Framework |
| MongoDB | Latest | Database |
| Mongoose | Latest | ODM for MongoDB |
| JWT | Latest | Authentication Tokens |
| bcrypt | Latest | Password Hashing |
| Socket.io | Latest | WebSocket Server |
| cookie-parser | Latest | Cookie Handling |

## 🏗 Architecture

```
GigFlow/
│
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable React Components
│   │   ├── pages/              # Page Components
│   │   ├── routes/             # Route Configuration
│   │   ├── store/              # Redux Store & Slices
│   │   ├── utils/              # Axios & Socket.io Config
│   │   └── App.jsx             # Main App Component
│   └── package.json
│
└── backend/                     # Node.js Backend Application
    ├── src/
    │   ├── controllers/        # Business Logic
    │   ├── models/             # Mongoose Schemas
    │   ├── routes/             # API Routes
    │   ├── middleware/         # Auth & Error Handling
    │   └── index.js            # Server Entry Point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Running locally or MongoDB Atlas account
- **Git**: For cloning the repository

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/tusharsach16/GigFlow.git
cd GigFlow
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration (see below)
```

**Backend `.env` Configuration:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=1d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Start Backend Server:**
```bash
npm run dev
```
Server will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration (see below)
```

**Frontend `.env` Configuration:**
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

**Start Frontend Development Server:**
```bash
npm run dev
```
Application will run on `http://localhost:5173`

### 4. Database Setup

If using local MongoDB:
```bash
# Start MongoDB service
mongod
```

If using MongoDB Atlas:
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGO_URI` in backend `.env`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Gig Endpoints

#### Get All Open Gigs (with Search)
```http
GET /api/gigs?search=web%20development

Response: 200 OK
{
  "success": true,
  "gigs": [
    {
      "_id": "gig_id",
      "title": "Web Development Project",
      "description": "Need a React developer",
      "budget": 5000,
      "status": "open",
      "ownerId": "user_id",
      "createdAt": "2026-01-14T10:00:00.000Z"
    }
  ]
}
```

#### Create New Gig
```http
POST /api/gigs
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Mobile App Development",
  "description": "Looking for React Native developer",
  "budget": 8000
}

Response: 201 Created
{
  "success": true,
  "message": "Gig created successfully",
  "gig": { ... }
}
```

### Bid Endpoints

#### Submit Bid
```http
POST /api/bids
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "gigId": "gig_id_here",
  "message": "I can complete this project in 2 weeks",
  "proposedPrice": 4500
}

Response: 201 Created
{
  "success": true,
  "message": "Bid submitted successfully",
  "bid": { ... }
}
```

#### Get All Bids for a Gig (Owner Only)
```http
GET /api/bids/gig_id_here
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "bids": [
    {
      "_id": "bid_id",
      "gigId": "gig_id",
      "freelancerId": { "name": "Jane Smith" },
      "message": "I can help with this",
      "proposedPrice": 4500,
      "status": "pending"
    }
  ]
}
```

### Hiring Endpoint (Critical)

#### Hire a Freelancer
```http
PATCH /api/bids/bid_id_here/hire
Authorization: Bearer jwt_token

Response: 200 OK
{
  "success": true,
  "message": "Freelancer hired successfully",
  "bid": { ... },
  "gig": { ... }
}
```

**What Happens During Hiring:**
1. MongoDB transaction starts
2. Gig status updated: `open` → `assigned`
3. Selected bid status: `pending` → `hired`
4. All other bids: `pending` → `rejected`
5. Real-time notification sent to hired freelancer
6. Transaction commits (or rolls back on error)

## 💾 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Gig Model
```javascript
{
  title: String (required),
  description: String (required),
  budget: Number (required),
  ownerId: ObjectId (ref: 'User', required),
  status: String (enum: ['open', 'assigned'], default: 'open'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bid Model
```javascript
{
  gigId: ObjectId (ref: 'Gig', required),
  freelancerId: ObjectId (ref: 'User', required),
  message: String (required),
  proposedPrice: Number (required),
  status: String (enum: ['pending', 'hired', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 The Hiring Logic

This section explains the most critical feature of the application.

### The Problem
When a client hires a freelancer, three things must happen **atomically**:
1. The gig's status must change from "open" to "assigned"
2. The chosen bid's status must become "hired"
3. All other bids for that gig must be marked as "rejected"

### The Challenge: Race Conditions
What if two clients (or the same client in two browser tabs) click "Hire" on different bids at the exact same time?

### The Solution: MongoDB Transactions

```javascript
// Simplified code example
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Step 1: Update the chosen bid to 'hired'
  const hiredBid = await Bid.findByIdAndUpdate(
    bidId,
    { status: 'hired' },
    { session, new: true }
  );

  // Step 2: Update the gig to 'assigned'
  await Gig.findByIdAndUpdate(
    hiredBid.gigId,
    { status: 'assigned' },
    { session }
  );

  // Step 3: Reject all other bids
  await Bid.updateMany(
    {
      gigId: hiredBid.gigId,
      _id: { $ne: bidId },
      status: 'pending'
    },
    { status: 'rejected' },
    { session }
  );

  // Step 4: Emit Socket.io notification
  io.to(hiredBid.freelancerId).emit('hired', {
    message: `You have been hired for ${gig.title}!`
  });

  // Commit transaction
  await session.commitTransaction();
} catch (error) {
  // Rollback on error
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### Why This Works
- **Atomicity**: All operations succeed together or fail together
- **Isolation**: Other operations can't see intermediate states
- **Consistency**: Database constraints are maintained
- **Durability**: Once committed, changes are permanent

## 🏆 Bonus Features

### Bonus 1: Transactional Integrity ✅

**Implementation Details:**
- Used MongoDB multi-document transactions
- Implemented session-based operations
- Added proper error handling and rollback
- Prevents partial updates if any step fails
- Handles concurrent hire attempts gracefully

**Testing the Race Condition:**
```bash
# Open two browser tabs
# Login as the same client
# Navigate to the same gig's bids
# Click "Hire" on different bids simultaneously
# Result: Only one hire succeeds, other shows error
```

### Bonus 2: Real-time Updates ✅

**Implementation Details:**
- Socket.io server integrated with Express
- Client connects after authentication
- Events emitted on hire action
- Dashboard updates without page refresh
- Proper cleanup on logout/disconnect

**Socket Events:**
```javascript
// Server emits
socket.emit('hired', {
  gigId: 'gig_id',
  gigTitle: 'Project Name',
  message: 'You have been hired for [Project Name]!'
});

// Client listens
socket.on('hired', (data) => {
  showNotification(data.message);
  updateDashboard();
});
```

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── public/
│   ├── vite.svg
│   └── Logo.png
├── src/
│   ├── assets/              # Images, fonts, static files
│   │   └── react.svg
│   ├── components/
│   │   ├── GigDetails/      # Gig detail components
│   │   │   ├── BidForm.jsx
│   │   │   ├── BidItem.jsx
│   │   │   └── GigInfo.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── UserMenu.jsx
│   │   └── Notifications.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── BrowseGigs.jsx   # Browse gigs
│   │   ├── GigDetails.jsx   # Gig details page
│   │   ├── CreateGig.jsx    # Post new gig
│   │   ├── MyGigs.jsx       # User's posted gigs
│   │   ├── MyBids.jsx       # User's submitted bids
│   │   ├── PrivacyPolicy.jsx
│   │   └── TermsOfService.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx    # Route definitions
│   │   └── ProtectedRoute.jsx
│   ├── store/
│   │   ├── store.js         # Store configuration
│   │   └── slices/
│   │       ├── authSlice.js # Auth state
│   │       ├── gigSlice.js  # Gig state
│   │       └── bidSlice.js  # Bid state
│   ├── utils/
│   │   ├── axios.js         # Axios instance
│   │   └── socket.js        # Socket.io client
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

### Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── gigController.js     # Gig CRUD
│   │   └── bidController.js     # Bid & Hire logic
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Gig.js               # Gig schema
│   │   └── Bid.js               # Bid schema
│   ├── routes/
│   │   ├── auth.js              # /api/auth/*
│   │   ├── gig.js               # /api/gigs/*
│   │   └── bid.js               # /api/bids/*
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation
│   └── index.js                 # Server entry point
├── package.json
└── README.md
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables in Vercel dashboard:
# VITE_API_URL=https://your-backend-url.com
# VITE_SOCKET_URL=https://your-backend-url.com
```

### Backend Deployment (Railway/Render)

**Environment Variables to Set:**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_secret
JWT_EXPIRE=1d
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

**MongoDB Atlas Setup:**
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist deployment server IP
3. Create database user
4. Get connection string
5. Update `MONGO_URI` in environment variables

## 🎬 Demo

### Live Links
- **Frontend**: [https://gig-flow-sable.vercel.app/](https://gig-flow-sable.vercel.app/)
- **Backend API**: [https://gigflow-hgsk.onrender.com](https://gigflow-hgsk.onrender.com)

### Demo Video
📹 **Screen Recording**: [Watch 2-minute demo](https://drive.google.com/file/d/1eXU5kNAuPuyjHsAka2nLJroNlrK6Kgrl/view?usp=drive_link)

**Demo Covers:**
1. User registration and login
2. Creating a new gig
3. Browsing and searching gigs
4. Submitting bids as a freelancer
5. **The Hiring Flow** (Critical demonstration)
6. Real-time notification when hired
7. Dashboard updates

### Test Credentials
```
Client Account:
Email: client@gigflow.com
Password: client123

Freelancer Account:
Email: freelancer@gigflow.com
Password: freelancer123
```

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Repository**: [https://github.com/tusharsach16/GigFlow](https://github.com/tusharsach16/GigFlow)

---

**Built with ❤️ by [Tushar](https://github.com/tusharsach16)**

*For any queries regarding this assignment, please contact through the submission email.*
