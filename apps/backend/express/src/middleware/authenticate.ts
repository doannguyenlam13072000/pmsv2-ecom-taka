import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '@/config';
import { logger } from '@/config';
import { ApiError } from '@/utils/errors';

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                email?: string;
            };
        }
    }
}

/**
 * Authentication middleware to verify JWT token and extract user
 * 
 * @param req
 * @param res
 * @param next
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logger.warn('Authentication failed: No Bearer token provided');
            throw ApiError.unauthorized('No token provided');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        if (!token) {
            logger.warn('Authentication failed: Empty token');
            throw ApiError.unauthorized('Invalid token format');
        }

        // Verify JWT token
        const decoded = jwt.verify(token, env.JWT_SECRET) as {
            id: string;
            role: string;
            email?: string;
        };

        if (!decoded || !decoded.id || !decoded.role) {
            logger.warn('Authentication failed: Invalid token payload');
            throw ApiError.unauthorized('Invalid token payload');
        }

        // Attach user to request
        req.user = {
            id: decoded.id,
            role: decoded.role,
            ...(decoded.email && { email: decoded.email })
        };

        logger.info(`User authenticated: ${req.user!.id} (${req.user!.role})`);
        return next();

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error.toResponse());
        }

        if (error instanceof jwt.JsonWebTokenError) {
            logger.warn('Authentication failed: Invalid JWT token');
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            logger.warn('Authentication failed: Token expired');
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }

        logger.error('Authentication middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 * 
 * Use cases:
 * - Public APIs that can be enhanced for authenticated users
 * - Analytics tracking (knowing who's accessing public endpoints)
 * - Personalization (showing user-specific data when available)
 * 
 * Examples:
 * - News website: basic news for everyone, personalized recommendations for logged-in users
 * - E-commerce: public products for everyone, "recently viewed" for logged-in users
 * - Blog: public posts for everyone, "bookmarked posts" for logged-in users
 * 
 * @param req
 * @param res
 * @param next
 */
export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(); // Continue without user
        }

        const token = authHeader.substring(7);

        if (!token) {
            return next(); // Continue without user
        }

        // Verify JWT token
        const decoded = jwt.verify(token, env.JWT_SECRET) as {
            id: string;
            role: string;
            email?: string;
        };

        if (decoded && decoded.id && decoded.role) {
            req.user = {
                id: decoded.id,
                role: decoded.role,
                ...(decoded.email && { email: decoded.email })
            };
            logger.info(`Optional auth: User ${req.user!.id} (${req.user!.role})`);
        }

        return next();

    } catch (error) {
        // Don't fail on token errors for optional auth
        logger.debug('Optional auth: Token verification failed, continuing without user');
        return next();
    }
}; 