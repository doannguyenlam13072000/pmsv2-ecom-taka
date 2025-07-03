import express from 'express';
import { env, validateEnv } from '@/config';
import {
    helmetConfig,
    devSecurityMiddleware,
    standardLimiter,
    devLimiter,
    productionCors,
    developmentCors
} from '@/middleware';

// Validate environment variables
validateEnv();

const app = express();

// Apply CORS based on environment
if (env.NODE_ENV === 'production') {
    app.use(productionCors);
} else {
    app.use(developmentCors);
}

// Apply security middleware based on environment
if (env.NODE_ENV === 'production') {
    app.use(helmetConfig);
} else {
    app.use(devSecurityMiddleware);
}

// Apply rate limiting based on environment
if (env.NODE_ENV === 'production') {
    app.use(standardLimiter);
} else {
    app.use(devLimiter);
}

app.get('/', (_req, res) => {
    res.json({
        message: 'Express TypeScript Server is running!',
        environment: env.NODE_ENV,
        port: env.PORT
    });
});

app.listen(env.PORT, () => {
    console.log(`🚀 Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
}); 