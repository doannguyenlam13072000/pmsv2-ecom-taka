import { PrismaClient } from '@prisma/client';

import { logger } from '@/config';

export async function seedRoles(prisma: PrismaClient) {
    logger.info('📝 Seeding roles...');

    const roles = [
        { name: 'ADMIN' },
        { name: 'SUPPORT WORKER' },
        { name: 'HR' }
    ];

    for (const role of roles) {
        const existingRole = await prisma.roles.findFirst({
            where: { name: role.name }
        });

        if (!existingRole) {
            await prisma.roles.create({
                data: role
            });
            logger.info(`✅ Created role: ${role.name}`);
        } else {
            logger.info(`⏭️  Role already exists: ${role.name}`);
        }
    }
} 