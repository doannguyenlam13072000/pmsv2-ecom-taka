import rateLimit from 'express-rate-limit';
import { env } from '@/config';

/**
 * Standard rate limiter for general API routes
 * 
 * @returns The rate limiter
 */
export const standardLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS, // 15 minutes
    max: env.RATE_LIMIT_MAX_REQUESTS, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000 / 60), // minutes
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (_req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests from this IP, please try again later.',
            retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000 / 60),
        });
    },
});

/**
 * Strict rate limiter for authentication routes
 * 
 * @returns The rate limiter
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
        retryAfter: 15, // minutes
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many authentication attempts, please try again later.',
            retryAfter: 15,
        });
    },
    skipSuccessfulRequests: true, // Don't count successful requests
});

/**
 * Development rate limiter (more lenient)
 * 
 * @returns The rate limiter
 */
export const devLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // 1000 requests per minute in development
    message: {
        success: false,
        message: 'Rate limit exceeded (development mode)',
        retryAfter: 1,
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({
            success: false,
            message: 'Rate limit exceeded (development mode)',
            retryAfter: 1,
        });
    },
}); 