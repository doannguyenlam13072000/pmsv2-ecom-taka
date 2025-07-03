import { Router } from 'express';
import morganRoutes from './morgan';
import { env } from '@/config';

const router: Router = Router();

// Test routes for Morgan logging
router.use('/morgan', morganRoutes);

// Health check route (should be skipped by logging)
router.get('/health', (_req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV
    });
});

export default router; 