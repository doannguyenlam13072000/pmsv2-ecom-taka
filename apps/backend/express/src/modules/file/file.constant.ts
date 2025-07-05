/**
 * File-specific constants and messages
 */

// File messages
export const FILE_MESSAGES = {
    UPLOAD_SUCCESS: "File uploaded successfully",
    UPLOAD_FAILED: "File upload failed",
    NOT_FOUND: "File not found",
    DELETED: "File deleted successfully",
    INVALID_FORMAT: "Invalid file format",
    TOO_LARGE: "File size too large",
    UPLOAD_REQUIRED: "File upload is required",
    RETRIEVED: "File retrieved successfully"
} as const;

// File error codes
export const FILE_ERROR_CODES = {
    NOT_FOUND: "FILE_NOT_FOUND",
    UPLOAD_FAILED: "FILE_UPLOAD_FAILED",
    INVALID_FORMAT: "INVALID_FILE_FORMAT",
    TOO_LARGE: "FILE_TOO_LARGE",
    UPLOAD_REQUIRED: "FILE_UPLOAD_REQUIRED"
} as const;

// File success codes
export const FILE_SUCCESS_CODES = {
    UPLOADED: "FILE_UPLOADED",
    DELETED: "FILE_DELETED",
    RETRIEVED: "FILE_RETRIEVED"
} as const;
