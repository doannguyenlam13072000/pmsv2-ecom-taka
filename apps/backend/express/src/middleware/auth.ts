import { Request, Response, NextFunction } from 'express';

import { ROLES } from '@/constants/roles';
import { logger } from '@/config';

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
 * Middleware to check if user is admin
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            logger.warn('Access denied: No user found in request');
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: No user found'
            });
        }

        if (user.role !== ROLES.ADMIN) {
            logger.warn(`Access denied: User ${user.id} (${user.role}) attempted to access admin-only endpoint`);
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Admin access required'
            });
        }

        logger.info(`Admin access granted to user ${user.id}`);
        return next();
    } catch (error) {
        logger.error('Error in isAdmin middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * Middleware to check if user is HR or admin
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const isHrOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            logger.warn('Access denied: No user found in request');
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: No user found'
            });
        }

        if (user.role !== ROLES.HR && user.role !== ROLES.ADMIN) {
            logger.warn(`Access denied: User ${user.id} (${user.role}) attempted to access HR/Admin-only endpoint`);
            return res.status(403).json({
                success: false,
                message: 'Forbidden: HR or Admin access required'
            });
        }

        logger.info(`HR/Admin access granted to user ${user.id} (${user.role})`);
        return next();
    } catch (error) {
        logger.error('Error in isHrOrAdmin middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};