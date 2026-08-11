# EduAyna - Student Management Backend

This is the backend service for the **EduAyna Student Management Dashboard**, built with **NestJS 11** and **Prisma ORM (v7)**. It provides a RESTful API with PostgreSQL for managing student records.

## Features
- **NestJS 11** architecture
- **Prisma 7** ORM with `pg` driver adapter
- **PostgreSQL** database (Local or NeonDB)
- **Validation**: Strict DTO validation with `class-validator`
- **Swagger Docs**: Auto-generated OpenAPI documentation
- **Pagination, Sorting, & Filtering**: Built-in support on the `/students` endpoint

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Local) OR a NeonDB connection string

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and configure your database URL:
```env
# PostgreSQL connection string
DATABASE_URL=postgresql://username:password@localhost:5432/eduayna?schema=public

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Server port
PORT=4000
```

### 4. Database Setup
Run the Prisma migrations and seed the database with sample data:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```
*(Note: Prisma 7 uses `prisma.config.ts` for configuration, so the database URL is resolved from there.)*

### 5. Running the App
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation
Once the server is running, visit the Swagger UI to interact with the API:
👉 **[http://localhost:4000/api/docs](http://localhost:4000/api/docs)**

## Available Endpoints (Prefix: `/api/v1`)
- `GET /students` - List students (supports `search`, `status`, `class`, `page`, `limit`, `sortBy`, `sortOrder`)
- `GET /students/:id` - Get a single student by UUID
- `POST /students` - Create a new student
- `PATCH /students/:id` - Update an existing student
- `DELETE /students/:id` - Delete a student
