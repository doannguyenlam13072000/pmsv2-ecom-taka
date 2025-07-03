import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import type { RequestHandler } from 'express';
import { logger, stream } from '@/config';

// Helper function to filter sensitive data from request body
const filterSensitiveData = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;

    const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization', 'auth', 'apiKey'];
    const filtered = { ...obj };

    sensitiveFields.forEach(field => {
        if (filtered[field]) {
            filtered[field] = '********';
        }
    });

    return filtered;
};

// Helper function to extract browser information from user agent
const extractBrowserInfo = (userAgent: string): string => {
    if (!userAgent || userAgent === 'unknown') return 'Unknown';

    // Common browser patterns
    const patterns = [
        { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
        { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
        { name: 'Safari', pattern: /Safari\/(\d+)/ },
        { name: 'Edge', pattern: /Edge\/(\d+)/ },
        { name: 'Opera', pattern: /Opera\/(\d+)/ },
        { name: 'Postman', pattern: /PostmanRuntime/ },
        { name: 'Insomnia', pattern: /Insomnia/ },
        { name: 'Thunder Client', pattern: /Thunder Client/ },
        { name: 'curl', pattern: /curl/ },
        { name: 'Mobile Safari', pattern: /Mobile.*Safari/ },
        { name: 'Android Browser', pattern: /Android.*Chrome/ }
    ];

    for (const { name, pattern } of patterns) {
        const match = userAgent.match(pattern);
        if (match) {
            if (name === 'Postman' || name === 'Insomnia' || name === 'Thunder Client' || name === 'curl') {
                return name;
            }
            return `${name} ${match[1] || ''}`.trim();
        }
    }

    // Fallback: return first part of user agent (truncated)
    return userAgent.length > 50 ? `${userAgent.substring(0, 50)}...` : userAgent;
};

// Custom Morgan tokens
morgan.token('body-size', (req: Request) => {
    const contentLength = req.headers['content-length'];
    return contentLength ? `${contentLength}B` : '0B';
});

morgan.token('user-agent-short', (req: Request) => {
    const userAgent = req.headers['user-agent'] || '';
    return userAgent.length > 50 ? `${userAgent.substring(0, 50)}...` : userAgent;
});

morgan.token('body', (req: Request) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        const filteredBody = filterSensitiveData(req.body);
        return JSON.stringify(filteredBody);
    }
    return '';
});

// Unified logging configuration
const createMorganLogger = (format: string, skipHealth: boolean = true): RequestHandler => {
    return morgan(format, {
        stream,
        skip: (req: Request, _res: Response) => {
            if (skipHealth && req.url === '/health') return true;
            return false;
        }
    });
};

// Development logging (always enabled)
export const devMorgan: RequestHandler = createMorganLogger(':method :url :status :response-time ms - :body');

// Production logging (always enabled)
export const productionMorgan: RequestHandler = createMorganLogger(':method :url :status :response-time ms - :remote-addr - :user-agent-short - :body');

// Custom API logger with start/end logging
export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Store original URL to prevent changes during middleware chain
    const originalUrl = req.url;
    const originalMethod = req.method;

    // Get IP and browser info
    const remoteAddr = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const browserInfo = extractBrowserInfo(userAgent);

    // 1. START: time ip start method url Browser/Client body
    let bodyLog = '';
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        const filteredBody = filterSensitiveData(req.body);
        bodyLog = `${JSON.stringify(filteredBody)}`;
    }

    const startLog = `[${remoteAddr}] START [${originalMethod}] [${originalUrl}] [${browserInfo}] [${bodyLog}]`;
    logger.info(startLog);

    // 2. END: time ip end status status_message duration
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusMessage = status >= 400 ? 'ERROR' : status >= 300 ? 'REDIRECT' : 'SUCCESS';

        const endLog = `[${remoteAddr}] END   [${originalMethod}] [${originalUrl}] [${status}] [${statusMessage}] [${duration}ms]`;

        // Use appropriate log level based on status
        if (status >= 500) {
            logger.error(endLog);
        } else if (status >= 400) {
            logger.warn(endLog);
        } else {
            logger.info(endLog);
        }
    });

    next();
}; 