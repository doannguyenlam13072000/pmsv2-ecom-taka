import path from "node:path";

import winston from "winston";

/**
 * Winston logger configuration
 *
 * @returns The logger
 */
const logger = winston.createLogger({
  level: process.env["LOG_LEVEL"] || "info",
  transports: [
    // Console with colors
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) =>
          `${timestamp} ${level}: ${message}`,
        ),
      ),
    }),
    // File logging with same format but no colors
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.printf(({ timestamp, level, message }) =>
          `${timestamp} ${level}: ${message}`,
        ),
      ),
    }),
  ],
});

/**
 * Morgan stream for HTTP logging
 *
 * @returns The stream
 */
export const stream = {
  write: (message: string) => logger.http(message.trim()),
};

export default logger;
