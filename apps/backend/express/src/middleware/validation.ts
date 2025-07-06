import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { z } from "zod";

import { HTTP_CODE } from "@/constants/httpCode";
import { ApiError } from "@/utils/errors";
import { COMMON_MESSAGES, ERROR_CODES } from "@/constants/messages";

// Extend Request interface to include validated properties
interface ValidatedRequest extends Request {
  validatedBody?: unknown;
  validatedParams?: unknown;
  validatedQuery?: unknown;
}

/**
 * Simple validation middleware for body
 *
 * @param schema - The schema to validate against
 * @returns The validation middleware
 */
export function validateBody(schema: ZodSchema) {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    try {
      const validatedBody = schema.parse(req.body);
      // Add validated body to request object
      req.validatedBody = validatedBody;
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors)
        const validationErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        }));

        const apiError = ApiError.validation(
          COMMON_MESSAGES.VALIDATION_FAILED,
          ERROR_CODES.BODY_VALIDATION_FAILED,
          {
            metaData: { validationErrors },
            resources: [req.originalUrl],
            method: req.method,
            path: req.originalUrl,
          }
        );
        res.status(HTTP_CODE.BAD_REQUEST).json(apiError.toResponse());
        return;
      }
      next(error);
    }
  };
}

/**
 * Simple validation middleware for params
 *
 * @param schema - The schema to validate against
 * @returns The validation middleware
 */
export function validateParams(schema: ZodSchema) {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    try {
      const validatedParams = schema.parse(req.params);
      // Add validated params to request object
      req.validatedParams = validatedParams;
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        }));

        const apiError = ApiError.validation(
          COMMON_MESSAGES.VALIDATION_FAILED,
          ERROR_CODES.PARAMS_VALIDATION_FAILED,
          {
            metaData: { validationErrors },
            resources: [req.originalUrl],
            method: req.method,
          }
        );
        res.status(HTTP_CODE.BAD_REQUEST).json(apiError.toResponse());
        return;
      }
      next(error);
    }
  };
}

/**
 * Simple validation middleware for query
 *
 * @param schema - The schema to validate against
 * @returns The validation middleware
 */
export function validateQuery(schema: ZodSchema) {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    try {
      const validatedQuery = schema.parse(req.query);
      // Add validated query to request object
      req.validatedQuery = validatedQuery;
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        }));

        const apiError = ApiError.validation(
          COMMON_MESSAGES.VALIDATION_FAILED,
          ERROR_CODES.QUERY_VALIDATION_FAILED,
          {
            metaData: { validationErrors },
            resources: [req.originalUrl],
            method: req.method,
          }
        );
        res.status(HTTP_CODE.BAD_REQUEST).json(apiError.toResponse());
        return;
      }
      next(error);
    }
  };
}

export { z };
