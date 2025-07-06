/**
 * Internal API-specific constants and messages
 */

// Internal API messages
export const INTERNAL_MESSAGES = {
    // Success messages
    MASTER_ADMIN_CREATED: "Master admin account created successfully",
    MASTER_ADMIN_RETRIEVED: "Admin accounts retrieved successfully",
    MASTER_ADMIN_DELETED: "Admin account deleted successfully",

    // Error messages
    INVALID_MASTER_SECRET: "Invalid master setup secret",
    UNAUTHORIZED_INTERNAL_ACCESS: "Unauthorized access to internal API",
    INTERNAL_AUTH_ERROR: "Internal server error during authentication",
    INVALID_REQUEST_DATA: "Invalid request data",
    ACCOUNT_ALREADY_EXISTS: "Account with this email already exists",
    ACCOUNT_NOT_FOUND: "Account not found",
    INVALID_ACCOUNT_TYPE: "Can only delete admin accounts",
    INVALID_ACCOUNT_ID: "Invalid account ID",
    INTERNAL_SERVER_ERROR: "Internal server error",

    // Service error messages
    CREATE_MASTER_ADMIN_FAILED: "Failed to create master admin account",
    RETRIEVE_ADMIN_ACCOUNTS_FAILED: "Failed to retrieve admin accounts",
    DELETE_ADMIN_ACCOUNT_FAILED: "Failed to delete admin account"
} as const;

// Internal API error codes
export const INTERNAL_ERROR_CODES = {
    // Authentication errors
    INVALID_MASTER_SECRET: "INVALID_MASTER_SECRET",
    UNAUTHORIZED_INTERNAL_ACCESS: "UNAUTHORIZED_INTERNAL_ACCESS",
    INTERNAL_AUTH_ERROR: "INTERNAL_AUTH_ERROR",

    // Request errors
    INVALID_REQUEST_DATA: "INVALID_REQUEST_DATA",
    INVALID_ACCOUNT_ID: "INVALID_ACCOUNT_ID",

    // Account errors
    ACCOUNT_ALREADY_EXISTS: "ACCOUNT_ALREADY_EXISTS",
    ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
    INVALID_ACCOUNT_TYPE: "INVALID_ACCOUNT_TYPE",

    // Service errors
    INTERNAL_SERVICE_ERROR: "INTERNAL_SERVICE_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
} as const;

// Internal API success codes
export const INTERNAL_SUCCESS_CODES = {
    MASTER_ADMIN_CREATED: "MASTER_ADMIN_CREATED",
    MASTER_ADMIN_RETRIEVED: "MASTER_ADMIN_RETRIEVED",
    MASTER_ADMIN_DELETED: "MASTER_ADMIN_DELETED"
} as const; 