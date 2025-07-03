import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

/**
 * Configure helmet with security headers
 */
export const helmetConfig = helmet({
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    // Cross-Origin Resource Policy
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // Cross-Origin Embedder Policy
    crossOriginEmbedderPolicy: false,
    // DNS Prefetch Control
    dnsPrefetchControl: { allow: false },
    // Frameguard
    frameguard: { action: "deny" },
    // Hide Powered-By
    hidePoweredBy: true,
    // HSTS
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    // IE No Open
    ieNoOpen: true,
    // NoSniff
    noSniff: true,
    // Origin Agent Cluster
    originAgentCluster: false,
    // Referrer Policy
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    // XSS Protection
    xssFilter: true,
});

/**
 * Custom security middleware for API routes
 */
export const apiSecurityMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
    // Remove X-Powered-By header
    res.removeHeader('X-Powered-By');

    // Add custom security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    next();
};

/**
 * Development security middleware (less restrictive)
 */
export const devSecurityMiddleware = helmet({
    contentSecurityPolicy: false, // Disable CSP in development
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    dnsPrefetchControl: { allow: true },
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    hsts: false, // Disable HSTS in development
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: false,
    referrerPolicy: false,
    xssFilter: true,
}); 