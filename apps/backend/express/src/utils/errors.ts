
import { HTTP_CODE, HTTP_MESSAGE } from "@/constants/httpCode";
import { ERROR_CODES } from "@/constants/messages";
import { ApiErrorResponse } from "@/types/responses/Api";

type ApiErrorDetails = {
    stack?: string;
    path?: string;
    method?: string;
    resources?: string[];
    metaData?: unknown;
};

/**
 * Custom API Error class
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details?: ApiErrorDetails;

    constructor(
        message: string,
        statusCode: number = HTTP_CODE.INTERNAL_SERVER_ERROR,
        code: string = "INTERNAL_ERROR",
        details?: ApiErrorDetails
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details ?? {};

        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Convert to standardized error response
     */
    toResponse(): ApiErrorResponse {
        return {
            success: false,
            message: this.message,
            error: {
                code: this.code,
                details: this.details
            }
        };
    }

    static badRequest(message: string, code: string = ERROR_CODES.BAD_REQUEST, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.BAD_REQUEST, code, details);
    }

    static unauthorized(message: string = HTTP_MESSAGE.UNAUTHORIZED, code: string = ERROR_CODES.UNAUTHORIZED, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.UNAUTHORIZED, code, details);
    }

    static forbidden(message: string = HTTP_MESSAGE.FORBIDDEN, code: string = ERROR_CODES.FORBIDDEN, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.FORBIDDEN, code, details);
    }

    static notFound(message: string = HTTP_MESSAGE.NOT_FOUND, code: string = ERROR_CODES.NOT_FOUND, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.NOT_FOUND, code, details);
    }

    static internal(message: string = HTTP_MESSAGE.INTERNAL_SERVER_ERROR, code: string = ERROR_CODES.INTERNAL_ERROR, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.INTERNAL_SERVER_ERROR, code, details);
    }

    static conflict(message: string, code: string = ERROR_CODES.CONFLICT, details?: ApiErrorDetails) {
        return new ApiError(message, 409, code, details);
    }

    static validation(message: string, code: string = ERROR_CODES.VALIDATION_ERROR, details?: ApiErrorDetails) {
        return new ApiError(message, HTTP_CODE.BAD_REQUEST, code, details);
    }
}