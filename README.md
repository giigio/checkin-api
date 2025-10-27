# GymPass Style Check-in API

A robust RESTful API built with Node.js and TypeScript for managing gym operations, including user check-ins, gym management, and user profiles. This application implements a system similar to GymPass where users can check in to nearby gyms.

## Features

- **User Management**
  - Create and authenticate users
  - Profile management
  - Role-based access control (Admin/User)
  - JWT token authentication with refresh tokens

- **Gym Management**
  - Register new gyms
  - Search gyms by name
  - Find nearby gyms based on user location
  - Track gym details and information

- **Check-in System**
  - Create and validate check-ins
  - Track user check-in history
  - Prevent duplicate check-ins on the same day
  - Validate distance restrictions for check-ins
  - Manage check-in metrics and statistics

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Fastify** - Web framework
- **Prisma** - ORM and database migrations
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **Vitest** - Testing framework
- **Docker** - Containerization

## Project Structure

```plaintext
checkin-API/
├── src/
│   ├── @types/          # Type definitions
│   ├── controllers/     # Route controllers
│   ├── env/            # Environment configuration
│   ├── lib/            # Libraries and configurations
│   ├── middlewares/    # Fastify middlewares
│   ├── repositories/   # Data access layer
│   │   ├── prisma/     # Prisma repositories
│   │   └── in-memory/  # In-memory repositories for testing
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── app.ts          # App configuration
│   └── server.ts       # Application entry point
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
└── docker-compose.yml  # Docker services configuration
```

## API Endpoints

### Users

- `POST /users` - Register a new user
- `POST /sessions` - Authenticate user
- `PATCH /token/refresh` - Refresh access token
- `GET /me` - Get authenticated user profile

### Gyms

- `POST /gyms` - Create a new gym (Admin only)
- `GET /gyms/search` - Search gyms by name
- `GET /gyms/nearby` - Find nearby gyms

### Check-ins

- `POST /gyms/:gymId/check-ins` - Create a new check-in
- `PATCH /check-ins/:checkInId/validate` - Validate a check-in (Admin only)
- `GET /check-ins/history` - Get user's check-in history
- `GET /check-ins/metrics` - Get user's check-in metrics

## Setup and Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the database:

   ```bash
   docker compose up -d
   ```

5. Run the migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the server:

   ```bash
   npm run dev
   ```

## Testing

The project includes a comprehensive test suite:

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Error Handling

The API implements centralized error handling with custom error types and middleware. Common error scenarios include:

- Invalid input validation
- Authentication and authorization errors
- Resource not found
- Distance restriction violations
- Late check-in validations
- Duplicate check-in attempts

## Environment Variables

- `NODE_ENV` - Environment (development/test/production)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT token secret
- `PORT` - Server port (default: 3333)
