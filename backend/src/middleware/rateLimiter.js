import rateLimit from 'express-rate-limit';

// Strict limiter for auth endpoints (login/register) — prevents brute force
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per window
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,
});

// General API limiter — prevents abuse on all endpoints
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
