import { HTTP_CODE, HTTP_MESSAGE } from "@/constants/httpCode";

/**
 * Custom API Error class
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code: string;

    constructor(
        message: string,
        statusCode: number = HTTP_CODE.INTERNAL_SERVER_ERROR,
        code: string = "INTERNAL_ERROR",
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string, code: string = "BAD_REQUEST") {
        return new ApiError(message, HTTP_CODE.BAD_REQUEST, code);
    }

    static unauthorized(message: string = HTTP_MESSAGE.UNAUTHORIZED, code: string = "UNAUTHORIZED") {
        return new ApiError(message, HTTP_CODE.UNAUTHORIZED, code);
    }

    static forbidden(message: string = HTTP_MESSAGE.FORBIDDEN, code: string = "FORBIDDEN") {
        return new ApiError(message, HTTP_CODE.FORBIDDEN, code);
    }

    static notFound(message: string = HTTP_MESSAGE.NOT_FOUND, code: string = "NOT_FOUND") {
        return new ApiError(message, HTTP_CODE.NOT_FOUND, code);
    }

    static internal(message: string = HTTP_MESSAGE.INTERNAL_SERVER_ERROR, code: string = "INTERNAL_ERROR") {
        return new ApiError(message, HTTP_CODE.INTERNAL_SERVER_ERROR, code);
    }

    static conflict(message: string, code: string = "CONFLICT") {
        return new ApiError(message, 409, code);
    }

    static validation(message: string, code: string = "VALIDATION_ERROR") {
        return new ApiError(message, HTTP_CODE.BAD_REQUEST, code);
    }
}

/**
 * Database Error class
 */
export class DatabaseError extends ApiError {
    constructor(message: string, code: string = "DATABASE_ERROR") {
        super(message, HTTP_CODE.INTERNAL_SERVER_ERROR, code);
    }
}

/**
 * Validation Error class
 */
export class ValidationError extends ApiError {
    public readonly errors: Array<{ field: string; message: string }>;

    constructor(message: string, errors: Array<{ field: string; message: string }> = []) {
        super(message, HTTP_CODE.BAD_REQUEST, "VALIDATION_ERROR");
        this.errors = errors;
    }
}

/**
 * Authentication Error class
 */
export class AuthenticationError extends ApiError {
    constructor(message: string = "Authentication failed") {
        super(message, HTTP_CODE.UNAUTHORIZED, "AUTHENTICATION_ERROR");
    }
}

/**
 * Authorization Error class
 */
export class AuthorizationError extends ApiError {
    constructor(message: string = "Access denied") {
        super(message, HTTP_CODE.FORBIDDEN, "AUTHORIZATION_ERROR");
    }
} 