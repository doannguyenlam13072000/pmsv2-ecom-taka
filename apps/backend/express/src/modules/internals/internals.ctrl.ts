import { Request, Response } from "express";

import { InternalService } from "./internals.service";
import { INTERNAL_MESSAGES, INTERNAL_ERROR_CODES } from "./internals.constant";

import { successResponse } from "@/utils/response";
import { ApiError } from "@/utils/errors";

export class InternalController {
    /**
     * Create a master admin account
     */
    static async createMasterAdmin(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const result = await InternalService.createMasterAdmin(data);

            const response = successResponse(result, 201, INTERNAL_MESSAGES.MASTER_ADMIN_CREATED);
            res.status(201).json(response);
        } catch (error) {
            if (error instanceof ApiError) {
                const errorResponse = error.toResponse();
                res.status(error.statusCode).json(errorResponse);
                return;
            }

            const internalError = new ApiError(
                INTERNAL_MESSAGES.INTERNAL_SERVER_ERROR,
                500,
                INTERNAL_ERROR_CODES.INTERNAL_SERVER_ERROR
            );
            res.status(500).json(internalError.toResponse());
        }
    }

    /**
     * Delete an admin account (for internal use only)
     */
    static async deleteAdminAccount(req: Request, res: Response): Promise<void> {
        try {
            const accountId = Number(req.params["id"]);

            if (isNaN(accountId)) {
                const error = ApiError.badRequest(
                    INTERNAL_MESSAGES.INVALID_ACCOUNT_ID,
                    INTERNAL_ERROR_CODES.INVALID_ACCOUNT_ID
                );
                res.status(400).json(error.toResponse());
                return;
            }

            await InternalService.deleteAdminAccount(accountId);

            const response = successResponse(null, 200, INTERNAL_MESSAGES.MASTER_ADMIN_DELETED);
            res.status(200).json(response);
        } catch (error) {
            if (error instanceof ApiError) {
                const errorResponse = error.toResponse();
                res.status(error.statusCode).json(errorResponse);
                return;
            }

            const internalError = new ApiError(
                INTERNAL_MESSAGES.INTERNAL_SERVER_ERROR,
                500,
                INTERNAL_ERROR_CODES.INTERNAL_SERVER_ERROR
            );
            res.status(500).json(internalError.toResponse());
        }
    }
} 