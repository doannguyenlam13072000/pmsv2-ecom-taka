import { HTTP_CODE, HTTP_MESSAGE } from "@/constants/httpCode";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/responses/Api";
import { COMMON_MESSAGES, ERROR_CODES } from "@/constants/messages";

/**
 * Create a success response
 * 
 * @param data
 * @returns ApiSuccessResponse<T>
 */
export const successResponse = <T>(data: T, status: number = HTTP_CODE.OK, message: string = HTTP_MESSAGE.OK): ApiSuccessResponse<T> => {
    return {
        status,
        message,
        data: data as T
    };
};

/**
 * Create a standardized error response
 * 
 * @param message
 * @param code
 * @param details
 * @returns ApiErrorResponse
 */
export const baseError = (message: string, code: string = "ERROR", details?: unknown): ApiErrorResponse => {
    return {
        success: false,
        message,
        error: {
            code,
            details
        }
    };
};

/**
 * Not Found Error Response
 */
export const notFoundError = (resource: string = "Resource", code: string = ERROR_CODES.NOT_FOUND): ApiErrorResponse => {
    return {
        success: false,
        message: `${resource} not found`,
        error: {
            code,
            details: { resource }
        }
    };
};

/**
 * Invalid Data Error Response
 */
export const invalidDataError = (field: string, message: string, code: string = ERROR_CODES.BAD_REQUEST): ApiErrorResponse => {
    return {
        success: false,
        message: `Invalid ${field}: ${message}`,
        error: {
            code,
            details: { field, message }
        }
    };
};

/**
 * Permission Denied Error Response
 */
export const permissionError = (action: string = "access", resource: string = "resource", code: string = ERROR_CODES.FORBIDDEN): ApiErrorResponse => {
    return {
        success: false,
        message: `Permission denied: Cannot ${action} ${resource}`,
        error: {
            code,
            details: { action, resource }
        }
    };
};

/**
 * Authentication Error Response
 */
export const authError = (message: string = COMMON_MESSAGES.UNAUTHORIZED, code: string = ERROR_CODES.UNAUTHORIZED): ApiErrorResponse => {
    return {
        success: false,
        message,
        error: {
            code,
            details: { requiresAuth: true }
        }
    };
};

/**
 * Validation Error Response
 */
export const validationError = (errors: Array<{ field: string; message: string }>, code: string = ERROR_CODES.VALIDATION_ERROR): ApiErrorResponse => {
    return {
        success: false,
        message: COMMON_MESSAGES.VALIDATION_FAILED,
        error: {
            code,
            details: { validationErrors: errors }
        }
    };
};

/**
 * Conflict Error Response
 */
export const conflictError = (resource: string, reason: string, code: string = ERROR_CODES.CONFLICT): ApiErrorResponse => {
    return {
        success: false,
        message: `${resource} conflict: ${reason}`,
        error: {
            code,
            details: { resource, reason }
        }
    };
};

/**
 * Database Error Response
 */
export const databaseError = (operation: string, code: string = ERROR_CODES.DATABASE_ERROR): ApiErrorResponse => {
    return {
        success: false,
        message: COMMON_MESSAGES.DATABASE_ERROR,
        error: {
            code,
            details: { operation }
        }
    };
};

/**
 * Rate Limit Error Response
 */
export const rateLimitError = (retryAfter?: number, code: string = ERROR_CODES.RATE_LIMIT_EXCEEDED): ApiErrorResponse => {
    return {
        success: false,
        message: COMMON_MESSAGES.RATE_LIMIT_EXCEEDED,
        error: {
            code,
            details: { retryAfter }
        }
    };
};

/**
 * Server Error Response
 */
export const serverError = (message: string = COMMON_MESSAGES.INTERNAL_ERROR, code: string = ERROR_CODES.INTERNAL_ERROR): ApiErrorResponse => {
    return {
        success: false,
        message,
        error: {
            code,
            details: { timestamp: new Date().toISOString() }
        }
    };
};