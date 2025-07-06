# HR Lotus Backend API

A modern Express.js TypeScript backend for the HR Lotus application, built with clean architecture principles and comprehensive security features.

## 🏗️ Architecture Overview

This backend follows a **modular layered architecture** with clear separation of concerns:

```
src/
├── config/          # Configuration management
├── constants/       # Application constants
├── middleware/      # Express middleware
├── modules/         # Business logic modules
├── repositories/    # Data access layer
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── validators/      # Request validation schemas
```

## 📁 Folder Structure & Purpose

### 🎯 Core Application Files

- **`index.ts`** - Main application entry point
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`nodemon.json`** - Development server configuration

### ⚙️ Configuration (`src/config/`)

- **`database.ts`** - Prisma database connection
- **`env.ts`** - Environment variable management
- **`index.ts`** - Centralized config exports
- **`logger.ts`** - Winston logging configuration

**Purpose**: Centralized configuration management with environment-specific settings.

### 🔧 Constants (`src/constants/`)

- **`httpCode.ts`** - HTTP status codes
- **`messages.ts`** - Application messages
- **`roles.ts`** - User role definitions

**Purpose**: Application-wide constants to maintain consistency.

### 🛡️ Middleware (`src/middleware/`)

- **`auth.ts`** - Authentication middleware
- **`authenticate.ts`** - JWT token verification
- **`cors.ts`** - CORS configuration
- **`errorHandler.ts`** - Global error handling
- **`httpLogger.ts`** - Request logging
- **`rateLimit.ts`** - Rate limiting
- **`security.ts`** - Security headers
- **`validation.ts`** - Request validation

**Purpose**: Cross-cutting concerns and request processing pipeline.

### 🏢 Business Modules (`src/modules/`)

Each module follows a consistent structure:

```
module-name/
├── module.constant.ts  # Module-specific constants
├── module.ctrl.ts      # Controller (request handling)
├── module.route.ts     # Route definitions
├── module.schema.ts    # Validation schemas
├── module.service.ts   # Business logic
└── module.types.ts     # TypeScript types
```

**Current Modules**:

- **`account/`** - User account management
- **`file/`** - File upload/management
- **`support-worker/`** - Support worker operations

**Purpose**: Organized business logic with clear separation of concerns.

### 💾 Data Layer (`src/repositories/`)

- **`base.repo.ts`** - Base repository pattern
- **`account.repo.ts`** - Account data operations
- **`role.repo.ts`** - Role data operations

**Purpose**: Data access abstraction layer using repository pattern.

### 🛣️ Routes (`src/routes/`)

- **`index.ts`** - Main router configuration
- **`v1/`** - Version 1 API routes
- **`test/`** - Testing routes

**Purpose**: API endpoint organization with versioning support.

### 📝 Types (`src/types/`)

- **`requests/`** - Request type definitions
- **`responses/`** - Response type definitions

**Purpose**: TypeScript type safety for API contracts.

### 🛠️ Utilities (`src/utils/`)

- **`date.ts`** - Date manipulation utilities
- **`errors.ts`** - Error handling utilities
- **`response.ts`** - Standardized API responses

**Purpose**: Reusable utility functions.

### ✅ Validators (`src/validators/`)

- **`common.schema.ts`** - Shared validation schemas
- **`test.schema.ts`** - Test-specific schemas

**Purpose**: Request validation using Zod schemas.

## 🗄️ Database (`prisma/`)

- **`schema.prisma`** - Database schema definition
- **`migrations/`** - Database migration files
- **`seeds/`** - Database seeding scripts

**Purpose**: Database schema management with Prisma ORM.

## 🚀 Key Features

### 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Security headers with Helmet
- Input validation with Zod

### 📊 Database

- PostgreSQL with Prisma ORM
- Automatic migrations
- Database seeding
- Connection pooling

### 🛠️ Development

- TypeScript for type safety
- ESLint for code quality
- Hot reload with Nodemon
- Structured logging with Winston

### 🏗️ Architecture

- Modular design
- Repository pattern
- Service layer pattern
- Middleware pipeline
- Error handling middleware

## 🎯 API Structure

```
/api
├── /v1                    # Version 1 API
│   ├── /auth             # Authentication endpoints
│   ├── /accounts         # Account management
│   └── /support-workers  # Support worker operations
├── /test                 # Testing endpoints
└── /docs                 # API documentation
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Seed database

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
```

## 🔧 Environment Variables

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 🏗️ Architecture Benefits

1. **Scalability**: Modular design allows easy feature addition
2. **Maintainability**: Clear separation of concerns
3. **Testability**: Isolated business logic
4. **Security**: Comprehensive security middleware
5. **Type Safety**: Full TypeScript implementation
6. **Performance**: Optimized database queries with Prisma

## 📋 TODO Items

See [TODO.md](TODO.md) for pending development tasks including:

- Additional authentication features
- Task scheduling with node-cron
- Docker containerization
- Enhanced security measures

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run database migrations: `npm run db:migrate`
4. Start development server: `npm run dev`

The server will start on the configured port with a beautiful startup message showing the environment, port, and database connection status.
