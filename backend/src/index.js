import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import gigRoutes from './routes/gig.js';
import bidRoutes from './routes/bid.js';
import {Server} from 'socket.io';
import {createServer} from 'http';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// Allow multiple client URLs (comma-separated in env or array)
const clientUrls = process.env.CLIENT_URL ? 
    process.env.CLIENT_URL.split(',').map(url => url.trim()) : [];

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://gig-flow-sable.vercel.app',
    ...clientUrls
].filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

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
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});