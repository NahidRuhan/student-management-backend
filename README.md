# Student Management Backend

## Project Overview
This is the backend service for the Student Management Dashboard. It provides a RESTful API built with NestJS 11 and Prisma ORM to manage student records. It supports full CRUD operations, pagination, filtering, sorting, and includes robust JWT-based authentication using HTTP-only cookies to secure data modifications.

## Requirements
To run this project, you will need:
- Node.js (v18 or higher)
- PostgreSQL (Local instance or a cloud provider like NeonDB)

## Installation
First, install all necessary dependencies using npm:
```bash
npm install
```

## Environment Variables
Create a `.env` file in the root of the project directory based on the following template. **Do not commit real credentials or secrets to version control.**

```env
# The connection string for your PostgreSQL database
DATABASE_URL="postgresql://username:password@localhost:5432/eduayna?schema=public"

# The port on which the backend server will run
PORT=4000

# Used to configure CORS allowing the frontend to communicate with the backend
FRONTEND_URL="http://localhost:3000"

# Secret key for signing JWT tokens (should be a long random string in production)
JWT_SECRET="super_secret_jwt_key_here"
```

## Database Setup
The database schema is defined in `prisma/schema.prisma`.
To create the tables in your database and apply the initial migration history, run:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

If you wish to seed the database with dummy students to get started quickly, run:
```bash
npm run prisma:seed
```

## Running the Application
To run the server in development mode with hot-reloading:
```bash
npm run start:dev
```

## Available Scripts
Here is a list of important npm scripts provided in this project:
- `npm run start:dev`: Starts the application in development mode with file watching and hot-reloading.
- `npm run build`: Compiles the NestJS application into the `dist` folder for production.
- `npm run start:prod`: Runs the compiled production build from the `dist` folder.
- `npm run prisma:seed`: Connects to the database and populates it with initial seed data.

## Additional Notes
- **Authentication**: We use `bcryptjs` to hash passwords and `passport-jwt` with an HTTP-Only cookie strategy to securely handle authentication without exposing tokens to client-side scripts.
- **Validation**: All incoming API requests are strictly validated using `class-validator` and `class-transformer` decorators in our DTOs.
- **Swagger Documentation**: Once the app is running, you can view the auto-generated OpenAPI documentation by navigating to `http://localhost:4000/api/docs`.
