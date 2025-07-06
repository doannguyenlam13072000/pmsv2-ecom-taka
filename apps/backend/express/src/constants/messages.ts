/**
 * Centralized message constants for the application
 */

// Common messages
export const COMMON_MESSAGES = {
    SUCCESS: "Operation completed successfully",
    FAILED: "Operation failed",
    NOT_FOUND: "Resource not found",
    UNAUTHORIZED: "Authentication required",
    FORBIDDEN: "Access denied",
    VALIDATION_FAILED: "Validation failed",
    INTERNAL_ERROR: "Internal server error",
    DATABASE_ERROR: "Database operation failed",
    RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
    INVALID_DATA: "Invalid data provided",
    MISSING_REQUIRED_FIELD: "Required field is missing",
    ALREADY_EXISTS: "Resource already exists",
    CONFLICT: "Resource conflict",
    CREATED: "Resource created successfully",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    RETRIEVED: "Resource retrieved successfully"
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
    EMAIL: {
        INVALID_FORMAT: "Invalid email format",
        REQUIRED: "Email is required",
        ALREADY_EXISTS: "Email already exists"
    },
    PASSWORD: {
        REQUIRED: "Password is required",
        TOO_SHORT: "Password must be at least 8 characters",
        TOO_WEAK: "Password must contain at least one lowercase letter, one uppercase letter, and one number",
        INVALID_FORMAT: "Invalid password format"
    },
    USERNAME: {
        REQUIRED: "Username is required",
        TOO_SHORT: "Username must be at least 3 characters",
        TOO_LONG: "Username too long",
        INVALID_FORMAT: "Invalid username format",
        ALREADY_EXISTS: "Username already exists"
    },
    NAME: {
        FIRST_REQUIRED: "First name is required",
        LAST_REQUIRED: "Last name is required",
        TOO_LONG: "Name too long",
        INVALID_FORMAT: "Invalid name format"
    },
    ID: {
        REQUIRED: "ID is required",
        INVALID_FORMAT: "Invalid ID format",
        NOT_FOUND: "ID not found"
    },
    PHONE: {
        INVALID_FORMAT: "Invalid phone number format"
    },
    DATE: {
        INVALID_FORMAT: "Invalid date format",
        FUTURE_DATE: "Date cannot be in the future",
        PAST_DATE: "Date cannot be in the past"
    },
    PAGINATION: {
        INVALID_PAGE: "Invalid page number",
        INVALID_LIMIT: "Invalid limit number",
        PAGE_REQUIRED: "Page number is required",
        LIMIT_REQUIRED: "Limit number is required"
    },
    SEARCH: {
        QUERY_REQUIRED: "Search query is required",
        TOO_SHORT: "Search query too short"
    }
} as const;

// Error codes
export const ERROR_CODES = {
    // Common errors
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    INTERNAL_ERROR: "INTERNAL_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    BODY_VALIDATION_FAILED: "BODY_VALIDATION_FAILED",
    PARAMS_VALIDATION_FAILED: "PARAMS_VALIDATION_FAILED",
    QUERY_VALIDATION_FAILED: "QUERY_VALIDATION_FAILED",
    DATABASE_ERROR: "DATABASE_ERROR",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

    // Authentication errors
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    INVALID_TOKEN: "INVALID_TOKEN",
    LOGIN_REQUIRED: "LOGIN_REQUIRED",
} as const;

// Success codes
export const SUCCESS_CODES = {
    CREATED: "CREATED",
    UPDATED: "UPDATED",
    DELETED: "DELETED",
    RETRIEVED: "RETRIEVED",
} as const; 