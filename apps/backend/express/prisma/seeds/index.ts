import { PrismaClient } from '@prisma/client';

import { seedRoles } from './roles.seed';

import { logger } from '@/config';

const prisma = new PrismaClient();

async function main() {
    logger.info('🌱 Starting database seeding...');

    // Run all seed functions
    await seedRoles(prisma);

    logger.info('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        logger.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
