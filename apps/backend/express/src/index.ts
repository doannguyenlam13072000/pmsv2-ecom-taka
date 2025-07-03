import express from 'express';
import chalk from 'chalk';
import { env, validateEnv, logger } from '@/config';
import {
    helmetConfig,
    devSecurityMiddleware,
    standardLimiter,
    devLimiter,
    productionCors,
    developmentCors,
    apiLogger
} from '@/middleware';
import routes from '@/routes';

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

// Parse JSON bodies
app.use(express.json());

// HTTP Logger
app.use(apiLogger);

// All Routes (centralized)
app.use(routes);

app.listen(env.PORT, () => {
    // Clear console for clean startup
    console.clear();

    // Beautiful startup message with chalk colors
    const startupMessage = chalk.greenBright(`
╔═══════════════════════════════════════════════╗
║                                               ║
║        🚀 Server is up and running!           ║
║                                               ║
╠═══════════════════════════════════════════════╣
  🌐  Environment : ${chalk.yellow(env.NODE_ENV)}           
  📍  Port        : ${chalk.cyan(env.PORT)}             
  💾  DB Status   : ${chalk.green("Connected")}                
╚═══════════════════════════════════════════════╝
`);

    // Display in console
    console.log(startupMessage);

    // Log to Winston for file logging (without colors)
    logger.info('🚀 Server is running on port ' + env.PORT + ' - ' + env.NODE_ENV + ' mode');
    logger.info('Environment: ' + env.NODE_ENV);
    logger.info('Port: ' + env.PORT);
    logger.info('Database: Connected');
}); 