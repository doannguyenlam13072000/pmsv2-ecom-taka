import { Router, Request, Response } from 'express';
import { env } from '@/config';
import v1Routes from './v1';
import testRoutes from './test';

const router: Router = Router();

// API Routes with versioning
router.use('/api/v1', v1Routes);

// Test Routes (for testing configurations)
router.use('/test', testRoutes);

// Root route with API documentation
router.get('/docs', (_req: Request, res: Response) => {
    res.json({
        message: 'Express TypeScript Server is running!',
        environment: env.NODE_ENV,
        port: env.PORT,
        api: {
            v1: '/api/v1',
            docs: '/docs',
            health: '/health'
        },
        test: {
            morgan: '/test/morgan',
            health: '/test/health'
        },
        endpoints: {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            products: '/api/v1/products',
            orders: '/api/v1/orders',
            health: '/api/v1/health'
        }
    });
});

export default router; 