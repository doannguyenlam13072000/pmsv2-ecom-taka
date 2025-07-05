import { PrismaClient } from "@prisma/client";

import logger from "./logger";

const prisma = new PrismaClient();

/**
 * Test database connection
 * @returns Promise<boolean> - true if connection successful, false otherwise
 */
export async function testDatabaseConnection(): Promise<boolean> {
    try {
        // Simple query to test connection
        await prisma.$queryRaw`SELECT 1`;
        logger.info("✅ Database connection successful");
        return true;
    } catch (error) {
        logger.error("❌ Database connection failed:", error);
        return false;
    }
}

/**
 * Close database connection
 */
export async function closeDatabaseConnection(): Promise<void> {
    try {
        await prisma.$disconnect();
        logger.info("✅ Database connection closed");
    } catch (error) {
        logger.error("❌ Error closing database connection:", error);
    }
}

export default prisma;
