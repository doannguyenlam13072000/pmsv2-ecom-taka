import { Router } from "express";

import { env } from "@/config";

import morganRoutes from "./morgan";

const router: Router = Router();

router.use("/morgan", morganRoutes);

router.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  });
});

export default router;
