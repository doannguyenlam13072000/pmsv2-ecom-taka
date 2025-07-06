import chalk from "chalk";
import express from "express";

import { testDatabaseConnection } from "./config/database";

import { env, logger, validateEnv } from "@/config";
import {
  apiLogger,
  developmentCors,
  devLimiter,
  devSecurityMiddleware,
  errorHandler,
  helmetConfig,
  notFoundHandler,
  productionCors,
  standardLimiter,
} from "@/middleware";
import routes from "@/routes";

// Validate environment variables
validateEnv();

const app = express();

// Apply CORS based on environment
if (env.NODE_ENV === "production") {
  app.use(productionCors);
}
else {
  app.use(developmentCors);
}

// Apply security middleware based on environment
if (env.NODE_ENV === "production") {
  app.use(helmetConfig);
}
else {
  app.use(devSecurityMiddleware);
}

// Apply rate limiting based on environment
if (env.NODE_ENV === "production") {
  app.use(standardLimiter);
}
else {
  app.use(devLimiter);
}

// Parse JSON bodies
app.use(express.json());

// HTTP Logger
app.use(apiLogger);

// All Routes (centralized)
app.use("/api", routes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

app.listen(env.PORT, async () => {
  // Clear console for clean startup
  // eslint-disable-next-line no-console
  console.clear();

  const dbStatus = await testDatabaseConnection();

  // Beautiful startup message with chalk colors
  const startupMessage = chalk.greenBright(`
╔═══════════════════════════════════════════════╗
║                                               ║
║        🚀 Server is up and running!           ║
║                                               ║
╠═══════════════════════════════════════════════╣
  🌐  Environment : ${chalk.yellow(env.NODE_ENV)}           
  📍  Port        : ${chalk.cyan(env.PORT)}             
  💾  DB Status   : ${dbStatus ? chalk.green("Connected") : chalk.red("Disconnected")}                
╚═══════════════════════════════════════════════╝
`);

  // eslint-disable-next-line no-console
  console.log(startupMessage);

  // Log to Winston for file logging (without colors)
  logger.info(`🚀 Server is running on port ${env.PORT} - ${env.NODE_ENV} mode`);
  logger.info(`Environment: ${env.NODE_ENV}`);
  logger.info(`Port: ${env.PORT}`);
  if (dbStatus) {
    logger.info("Database: Connected");
  }
  else {
    logger.error("Database: Disconnected");
  }
});
