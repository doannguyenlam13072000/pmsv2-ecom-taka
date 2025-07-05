import { z } from "zod";

import { VALIDATION_MESSAGES } from "@/constants/messages";

/**
 * Common validation schemas for reuse across the application
 */

// Email validation schema
export const emailSchema = z.object({
  email: z.string().email(VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT).min(1, VALIDATION_MESSAGES.EMAIL.REQUIRED)
});

// ID validation schema (for numeric IDs)
export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.ID.INVALID_FORMAT).transform(Number)
});

// UUID validation schema
export const uuidSchema = z.object({
  id: z.string().uuid("Invalid UUID format")
});

// Pagination query schema
export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.PAGINATION.INVALID_PAGE).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.PAGINATION.INVALID_LIMIT).transform(Number).default("10"),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
});

// Search query schema
export const searchSchema = z.object({
  q: z.string().min(1, VALIDATION_MESSAGES.SEARCH.QUERY_REQUIRED),
  page: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.PAGINATION.INVALID_PAGE).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.PAGINATION.INVALID_LIMIT).transform(Number).default("10")
});

// Date range schema
export const dateRangeSchema = z.object({
  startDate: z.string().datetime(VALIDATION_MESSAGES.DATE.INVALID_FORMAT).optional(),
  endDate: z.string().datetime(VALIDATION_MESSAGES.DATE.INVALID_FORMAT).optional()
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z.any(), // This will be handled by multer
  description: z.string().max(500, "Description too long").optional()
});