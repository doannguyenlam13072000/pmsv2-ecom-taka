# Express Backend API

A robust Express.js backend API with TypeScript, featuring comprehensive middleware, validation, logging, and security features.

## 📦 Packages

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework for Node.js |
| `cors` | ^2.8.5 | Cross-Origin Resource Sharing middleware |
| `helmet` | ^8.1.0 | Security middleware for Express |
| `express-rate-limit` | ^7.5.1 | Rate limiting middleware |
| `morgan` | ^1.10.0 | HTTP request logger middleware |
| `winston` | ^3.17.0 | Logging library |
| `zod` | ^3.25.67 | TypeScript-first schema validation |
| `dotenv` | ^17.0.1 | Environment variables loader |
| `dayjs` | ^1.11.13 | Modern date utility library |
| `lodash` | ^4.17.21 | JavaScript utility library |
| `chalk` | 4 | Terminal string styling |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.8.3 | TypeScript compiler |
| `@types/node` | ^20.12.5 | TypeScript definitions for Node.js |
| `@types/express` | ^5.0.3 | TypeScript definitions for Express |
| `@types/cors` | ^2.8.19 | TypeScript definitions for CORS |
| `@types/morgan` | ^1.9.10 | TypeScript definitions for Morgan |
| `@types/lodash` | ^4.17.20 | TypeScript definitions for Lodash |
| `nodemon` | ^3.1.10 | Development server with auto-restart |
| `ts-node` | ^10.9.2 | TypeScript execution engine |
| `ts-node-dev` | ^2.0.0 | TypeScript development server |
| `tsconfig-paths` | ^4.2.0 | TypeScript path mapping |

## 🏗️ Project Structure

```
apps/backend/express/
├── 📁 src/
│   ├── 📁 config/                 # Configuration files
│   │   ├── env.ts                 # Environment variables configuration
│   │   ├── index.ts               # Config exports
│   │   └── logger.ts              # Winston logger configuration
│   │
│   ├── 📁 controllers/            # Request handlers
│   │
│   ├── 📁 middleware/             # Express middleware
│   │   ├── cors.ts                # CORS configuration
│   │   ├── http-logger.ts         # HTTP request logging
│   │   ├── index.ts               # Middleware exports
│   │   ├── rateLimit.ts           # Rate limiting configuration
│   │   ├── security.ts            # Security headers (Helmet)
│   │   └── validation.ts          # Request validation middleware
│   │
│   ├── 📁 models/                 # Data models
│   │
│   ├── 📁 routes/                 # API route definitions
│   │   ├── 📁 test/               # Test routes
│   │   │   └── index.ts
│   │   ├── 📁 v1/                 # API version 1 routes
│   │   │   ├── 📁 auth/           # Authentication routes
│   │   │   ├── 📁 health/         # Health check routes
│   │   │   ├── 📁 orders/         # Order management routes
│   │   │   ├── 📁 products/       # Product management routes
│   │   │   ├── 📁 users/          # User management routes
│   │   │   └── index.ts           # V1 route aggregator
│   │   └── index.ts               # Main route aggregator
│   │
│   ├── 📁 services/               # Business logic services
│   │
│   ├── 📁 types/                  # TypeScript type definitions
│   │
│   ├── 📁 utils/                  # Utility functions
│   │   ├── date.ts                # Date utility functions
│   │   └── index.ts               # Utility exports
│   │
│   ├── 📁 validators/             # Zod validation schemas
│   │   ├── auth.schema.ts         # Authentication validation
│   │   ├── common.schema.ts       # Common validation schemas
│   │   ├── index.ts               # Validator exports
│   │   └── test.schema.ts         # Test validation schemas
│   │
│   └── index.ts                   # Application entry point
│
├── 📁 logs/                       # Application logs
├── 📁 node_modules/               # Dependencies
├── .gitignore                     # Git ignore rules
├── nodemon.json                   # Nodemon configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🚀 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run clean` - Remove build artifacts

## 🔧 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Security**: Helmet.js for security headers, CORS configuration
- **Rate Limiting**: Built-in rate limiting with express-rate-limit
- **Logging**: Winston logger with Morgan HTTP request logging
- **Validation**: Zod schema validation for request/response
- **Environment**: Environment variable management with dotenv
- **Development**: Hot reload with nodemon and ts-node-dev

## 📋 API Structure

The API follows RESTful conventions with versioning:

- **v1**: Current API version with endpoints for:
  - Authentication (`/auth`)
  - Health checks (`/health`)
  - User management (`/users`)
  - Product management (`/products`)
  - Order management (`/orders`)

## 🔒 Security Features

- CORS protection
- Security headers via Helmet
- Rate limiting
- Request validation
- Environment variable protection

## 📝 Logging

- Winston logger for application logs
- Morgan for HTTP request logging
- Structured logging with different levels
- Log rotation and file management
