import express from 'express';
import { env, validateEnv } from '@/config';

// Validate environment variables
validateEnv();

const app = express();

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