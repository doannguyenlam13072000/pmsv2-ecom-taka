import type { NextFunction, Request, Response } from "express";

import { logger } from "@/config";
import { ApiError } from "@/utils/errors";
import { HTTP_CODE } from "@/constants/httpCode";
import { COMMON_MESSAGES, ERROR_CODES } from "@/constants/messages";

/**
 * Global error handling middleware
 */
export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`);

    let apiError: ApiError;

    if (error instanceof ApiError) {
        apiError = error;
    } else {
        apiError = ApiError.internal(
            error.message,
            ERROR_CODES.INTERNAL_ERROR,
            {
                stack: error.stack ?? "No stack trace available",
                path: req.originalUrl,
                method: req.method,
            }
        );
    }

    res.status(apiError.statusCode).json(apiError.toResponse());
}

/**
 * 404 Not Found middleware
 */
export function notFoundHandler(req: Request, res: Response): void {
    logger.warn(`[${req.method}] ${req.originalUrl} - Route not found`);

    const apiError = ApiError.notFound(
        COMMON_MESSAGES.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
        {
            path: req.originalUrl,
            method: req.method,
        }
    );
    res.status(HTTP_CODE.NOT_FOUND).json(apiError.toResponse());
} 