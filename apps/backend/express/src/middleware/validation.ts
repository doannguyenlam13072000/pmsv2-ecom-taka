import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { z } from "zod";

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
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
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
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
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
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
}

export { z };
