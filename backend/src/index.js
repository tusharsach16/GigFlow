import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import gigRoutes from './routes/gig.js';
import bidRoutes from './routes/bid.js';
import errorHandler from './middleware/errorHandler.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';
import {Server} from 'socket.io';
import {createServer} from 'http';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

const clientUrls = process.env.CLIENT_URL ? 
    process.env.CLIENT_URL.split(',').map(url => url.trim()) : [];

const allowedOrigins = [
    'http://localhost',
    'http://localhost:5173',
    'http://127.0.0.1',
    'http://127.0.0.1:5173',
    'https://gig-flow-sable.vercel.app',
    ...clientUrls
].filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
});

// --- Security middleware ---
app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.use(express.json({ limit: '10kb' })); // Body size limit to prevent payload attacks
app.use(cookieParser());

// --- Rate limiting ---
app.use('/api', apiLimiter);       // 100 req/15min for all API routes
app.use('/api/auth', authLimiter); // 10 req/15min for auth routes (stricter)

// --- Health check endpoint (used by Docker HEALTHCHECK & Render) ---
app.get('/health', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
        
        if (dbState !== 1) {
            return res.status(503).json({
                status: 'unhealthy',
                database: dbStatus,
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            });
        }

        res.status(200).json({
            status: 'healthy',
            database: dbStatus,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({ status: 'unhealthy', error: error.message });
    }
});

// --- Inject Socket.io instance into requests ---
app.use((req, res, next) => {
    req.io = io;
    next();
});

// --- API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

// --- Centralized error handler (MUST be after routes) ---
app.use(errorHandler);

// --- Socket.io connection handling ---
io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});