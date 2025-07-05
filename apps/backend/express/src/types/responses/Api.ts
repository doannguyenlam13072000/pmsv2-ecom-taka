export interface ApiSuccessResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error: {
        code: string | number;
        details?: unknown;
    };
}