import type { Request, Response } from "express";
import { Router } from "express";

import { validateBody, validateParams, validateQuery } from "@/middleware";
import { idParamSchema, paginationQuerySchema, testBodySchema } from "@/validators";

const router: Router = Router();

/**
 * Test basic API logging
 */
router.get("/basic", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Basic API test endpoint",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
  });
});

/**
 * Test POST with validation and logging
 */
router.post("/body", validateBody(testBodySchema), (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "Body created successfully",
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Test GET with params validation
 */
router.get("/params/:id", validateParams(idParamSchema), (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Params found",
    data: {
      id: req.params["id"],
      name: "Test Params",
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * Test GET with query validation
 */
router.get("/search", validateQuery(paginationQuerySchema), (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Search results",
    data: {
      page: req.query["page"] ?? "1",
      limit: req.query["limit"] ?? "10",
      search: req.query["search"],
      results: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ],
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * Test error response (500)
 */
router.get("/error", (_req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: "Internal server error for testing",
    error: "This is a test error",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Test DELETE with params validation
 */
router.delete("/delete/:id", validateParams(idParamSchema), (_req: Request, res: Response) => {
  res.status(204).json();
});

/**
 * Test large response (to test body-size token)
 */
router.get("/large", (_req: Request, res: Response) => {
  const largeData = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a long description for item ${i} to test body size logging`,
    timestamp: new Date().toISOString(),
  }));

  res.json({
    success: true,
    message: "Large dataset returned",
    count: largeData.length,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Test slow response (to test response time)
 */
router.get("/slow", async (_req: Request, res: Response) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

  res.json({
    success: true,
    message: "Slow response completed",
    timestamp: new Date().toISOString(),
  });
});

export default router;
