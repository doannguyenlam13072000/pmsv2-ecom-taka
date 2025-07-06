import { HTTP_CODE, HTTP_MESSAGE } from "@/constants/httpCode";
import { ApiSuccessResponse } from "@/types/responses/Api";

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