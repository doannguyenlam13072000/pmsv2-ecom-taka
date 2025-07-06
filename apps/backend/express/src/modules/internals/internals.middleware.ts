import { Request, Response, NextFunction } from "express";

import { masterSetupSecretSchema } from "./internals.schema";
import { INTERNAL_MESSAGES, INTERNAL_ERROR_CODES } from "./internals.constant";

import { ApiError } from "@/utils/errors";
import { env } from "@/config/env";

export const validateMasterSetupSecret = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const headers = {
            "x-master-secret-key": req.headers["x-master-secret-key"] as string,
        };

        const validationResult = masterSetupSecretSchema.safeParse(headers);

        if (!validationResult.success) {
            const error = ApiError.badRequest(
                INTERNAL_MESSAGES.INVALID_MASTER_SECRET,
                INTERNAL_ERROR_CODES.INVALID_MASTER_SECRET,
                { metaData: { validationErrors: validationResult.error?.errors } }
            );
            res.status(401).json(error.toResponse());
            return;
        }

        const { "x-master-secret-key": secret } = validationResult.data;

        if (secret !== env.MASTER_SECRET_KEY) {
            const error = ApiError.unauthorized(
                INTERNAL_MESSAGES.UNAUTHORIZED_INTERNAL_ACCESS,
                INTERNAL_ERROR_CODES.UNAUTHORIZED_INTERNAL_ACCESS
            );
            res.status(401).json(error.toResponse());
            return;
        }

        next();
    } catch (error) {
        const internalError = ApiError.internal(
            INTERNAL_MESSAGES.INTERNAL_AUTH_ERROR,
            INTERNAL_ERROR_CODES.INTERNAL_AUTH_ERROR
        );
        res.status(500).json(internalError.toResponse());
    }
};

export const logInternalApiAccess = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    console.warn(`[INTERNAL API ACCESS] ${req.method} ${req.path} - IP: ${clientIp} - UA: ${userAgent}`);

    next();
}; 