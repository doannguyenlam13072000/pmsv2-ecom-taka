import type { NextFunction, Request, Response } from "express";

import { logger } from "@/config";

/**
 * Global error handling middleware
 */
export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    // Log the error
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);

    // Send error response
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
        error: {
            code: "INTERNAL_ERROR",
            details: process.env["NODE_ENV"] === "development" ? error.stack : undefined,
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });
}

/**
 * 404 Not Found middleware
 */
export function notFoundHandler(req: Request, res: Response): void {
    logger.warn(`[${req.method}] ${req.originalUrl} - Route not found`);

    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        error: {
            code: "NOT_FOUND",
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });
} 