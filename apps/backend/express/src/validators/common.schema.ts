import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export const paginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
  limit: z.string().regex(/^\d+$/, "Limit must be a number").optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query is required"),
  limit: z.string().regex(/^\d+$/, "Limit must be a number").optional(),
});

export const dateRangeSchema = z.object({
  startDate: z.string().datetime("Start date must be a valid date").optional(),
  endDate: z.string().datetime("End date must be a valid date").optional(),
});

export const fileUploadSchema = z.object({
  file: z.any(),
  description: z.string().optional(),
});
