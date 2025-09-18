export const appConfig = {
    apiUrl: process.env.API_URL || '[https://api.example.com](https://api.example.com)',
    timeout: 30000,
    version: '1.0.0',
};

export const environments = {
    development: {
        apiUrl: '[https://dev-api.example.com](https://dev-api.example.com)',
        debug: true,
    },
    production: {
        apiUrl: '[https://api.example.com](https://api.example.com)',
        debug: false,
    },
    test: {
        apiUrl: '[https://test-api.example.com](https://test-api.example.com)',
        debug: true,
    },
};

export const getConfig = (env: string = 'development') => {
    return {
        ...appConfig,
        ...(environments[env as keyof typeof environments] || environments.development),
    };
};