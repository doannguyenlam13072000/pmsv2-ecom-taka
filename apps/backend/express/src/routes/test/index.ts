import { Router } from "express";

import morganRoutes from "./morgan";

import { env, logger } from "@/config";
import { testDatabaseConnection } from "@/config/database";

const router: Router = Router();

router.use("/morgan", morganRoutes);

router.get("/health", async (_req, res) => {
  try {
    const dbConnected = await testDatabaseConnection();

    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      database: {
        status: dbConnected ? "connected" : "disconnected",
        connected: dbConnected
      }
    });
  } catch (error) {
    logger.error("❌ Error during health check:", error);
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      database: {
        status: "error",
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }
    });
  }
});

export default router;
