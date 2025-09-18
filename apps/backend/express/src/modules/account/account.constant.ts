/**
 * Account-specific constants and messages
 */

// Account messages
export const ACCOUNT_MESSAGES = {
    NOT_FOUND: "Account not found",
    CREATED: "Account created successfully",
    UPDATED: "Account updated successfully",
    DELETED: "Account deleted successfully",
    ALREADY_EXISTS: "Account already exists",
    INVALID_EMAIL: "Invalid email format",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    PASSWORD_CHANGED: "Password changed successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    RETRIEVED: "Account retrieved successfully"
} as const;

// Account error codes
export const ACCOUNT_ERROR_CODES = {
    NOT_FOUND: "ACCOUNT_NOT_FOUND",
    ALREADY_EXISTS: "ACCOUNT_ALREADY_EXISTS",
    INVALID_EMAIL: "INVALID_EMAIL",
    MISSING_EMAIL: "MISSING_EMAIL",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    MISSING_PASSWORD: "MISSING_PASSWORD",
    WEAK_PASSWORD: "WEAK_PASSWORD"
} as const;

// Account success codes
export const ACCOUNT_SUCCESS_CODES = {
    CREATED: "ACCOUNT_CREATED",
    UPDATED: "ACCOUNT_UPDATED",
    DELETED: "ACCOUNT_DELETED",
    RETRIEVED: "ACCOUNT_RETRIEVED",
    LOGIN_SUCCESS: "ACCOUNT_LOGIN_SUCCESS",
    LOGOUT_SUCCESS: "ACCOUNT_LOGOUT_SUCCESS",
    PASSWORD_CHANGED: "ACCOUNT_PASSWORD_CHANGED",
    PROFILE_UPDATED: "ACCOUNT_PROFILE_UPDATED"
} as const;
