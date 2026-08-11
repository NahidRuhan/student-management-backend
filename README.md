# EduAyna - Student Management System

### 🔗 Project Links
- **Frontend Live Demo:** [https://student-management-frontend-rho-lilac.vercel.app](https://student-management-frontend-rho-lilac.vercel.app)
- **Backend Live API:** [https://student-management-backend-beta-seven.vercel.app](https://student-management-backend-beta-seven.vercel.app)
- **Frontend Repository:** [https://github.com/NahidRuhan/student-management-frontend](https://github.com/NahidRuhan/student-management-frontend)
- **Backend Repository:** [https://github.com/NahidRuhan/student-management-backend](https://github.com/NahidRuhan/student-management-backend)

## Project Overview
This repository contains the Full-Stack implementation of the Student Management Dashboard. 
- **Frontend**: A sleek, modern, and responsive web application built with Next.js 16 (App Router), custom Tailwind CSS v4 primitives, and Redux Toolkit.
- **Backend**: A robust RESTful API built with NestJS 11 and Prisma ORM to manage student records and authenticate users.

Together, they provide full CRUD operations, pagination, filtering, sorting, and robust JWT-based authentication using HTTP-only cookies to secure data modifications.

## API Documentation
The backend provides a comprehensive REST API for managing students and authentication.
- **Interactive Swagger UI**: [https://student-management-backend-beta-seven.vercel.app/api/docs](https://student-management-backend-beta-seven.vercel.app/api/docs)
- **Detailed Markdown API Reference**: [View API.md](./API.md)

## Requirements
To run this project locally, you will need:
- Node.js (v18 or higher)
- PostgreSQL (Local instance or a cloud provider like NeonDB) for the backend
- Two open terminal instances (one for the backend server, one for the frontend server)

## Installation
You need to install dependencies for both the frontend and backend applications.

**Backend Installation:**
```bash
cd student-management-backend
npm install
```

**Frontend Installation:**
```bash
cd student-management-frontend
npm install
```

## Environment Variables
Create the respective environment files in the root of both directories. **Do not commit real credentials or secrets to version control.**

### Backend (`student-management-backend/.env`)
```env
# The connection string for your PostgreSQL database
DATABASE_URL="postgresql://username:password@localhost:5432/eduayna?schema=public"

# The port on which the backend server will run
PORT=4000

# Used to configure CORS allowing the frontend to communicate with the backend
FRONTEND_URL=http://localhost:3000

# Secret key for signing JWT tokens (should be a long random string in production)
JWT_SECRET=super_secret_jwt_key_here
```

### Frontend (`student-management-frontend/.env.local`)
```env
# The URL where your backend API is running (used by Next.js proxy)
NEXT_PUBLIC_API_URL=/api/v1
```

## Database Setup
The database schema is defined in the backend service using Prisma.

1. Navigate to the backend directory:
   ```bash
   cd student-management-backend
   ```
2. Create the tables in your database and apply the initial migration history:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Seed the database with dummy students to get started quickly:
   ```bash
   npm run prisma:seed
   ```

## Running the Application
You will need to run both servers concurrently.

**1. Start the Backend:**
```bash
cd student-management-backend
npm run start:dev
```
*The backend will run on `http://localhost:4000` and you can view the Swagger API docs at `http://localhost:4000/api/docs`.*

**2. Start the Frontend:**
```bash
cd student-management-frontend
npm run dev
```
*The frontend will run on `http://localhost:3000`. Navigate to this URL in your browser.*

## Available Scripts

### Backend Scripts
- `npm run start:dev`: Starts the application in development mode with hot-reloading.
- `npm run build`: Compiles the NestJS application into the `dist` folder for production.
- `npm run start:prod`: Runs the compiled production build.
- `npm run prisma:seed`: Populates the database with initial seed data.

### Frontend Scripts
- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Creates an optimized production build of the application.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint for static code analysis.

## Additional Notes
- **API Proxying**: The Next.js configuration (`next.config.ts`) intercepts requests to `/api/v1/:path*` and forwards them to the backend server. This completely bypasses complex CORS issues and allows secure HTTP-Only cookie forwarding.
- **Authentication**: JWT Cookies are securely issued by the backend and attached to every frontend request via RTK Query's `credentials: 'include'` configuration.
- **UI Architecture**: Primitive components are fully custom-built (using `clsx` and `tailwind-merge`) without relying on heavy external component libraries.

## Short Explanation

**What was the most challenging part of the assignment?**
Integrating Redux Toolkit (which requires client-side execution) seamlessly with Next.js 16's App Router and Server Components architecture. Ensuring that authentication state was securely hydrated from backend HTTP-only cookies on first load—without causing React hydration mismatch errors—required careful proxy configuration and wrapper component design.

**What technical decision are you most proud of?**
Implementing an ultra-secure, HTTP-Only Cookie-based authentication flow. By pairing NestJS Passport with Next.js API proxies, the JWT tokens are completely invisible to the frontend JavaScript. Unlike typical local-storage implementations which are highly vulnerable to XSS attacks, this architectural decision ensures our session management follows strict enterprise security best practices right out of the box.

**If you had another 4 hours, what would you improve?**
1. **Bulk Actions**: Add multi-select checkboxes to the student data table to allow bulk deletion or bulk status updates.
2. **Analytics**: Add a visual charting library (like Recharts) to the dashboard to show statistics on student enrollment and active vs. inactive ratios.
3. **Advanced Permissions**: Expand the authentication system into full Role-Based Access Control (e.g., Admin, Teacher, Viewer), allowing fine-grained permissions over who can edit specific classes or students.
4. **CSV Export/Import**: Build capabilities to export the current student roster to a CSV/Excel file, and allow bulk importing of new students via a spreadsheet upload.
5. **Audit Trails**: Implement a backend activity log that tracks exactly which user created, modified, or deleted a student, and expose a "Revision History" tab on the frontend.
6. **Performance Optimization**: Implement backend database indexing on frequently searched columns (like name and class), and utilize Next.js advanced caching strategies to serve the public student list instantly from the edge.

**What part of the application would you change before deploying it to production?**
1. **Security & Rate Limiting**: Implement strict rate limiting (e.g., using Redis) on the backend `/auth/login` and `/auth/register` endpoints to protect against brute-force credential stuffing attacks.
2. **Secret Management**: Ensure all environment variables (especially the JWT secret) are rotated and securely injected via a secret manager (like AWS Secrets Manager or Vercel Secrets) rather than local files.
3. **CI/CD Pipeline**: Set up automated GitHub Actions to run ESLint, Prettier, and Jest unit tests on every Pull Request before allowing merges to the main branch.
4. **Containerization**: Write optimized, multi-stage `Dockerfiles` for both the Next.js frontend and NestJS backend to ensure they run identically on any cloud provider and can scale horizontally under heavy load.
5. **CORS & Cookie Hardening**: Lock down the backend CORS configuration to explicitly whitelist only the exact production frontend domain. Additionally, enforce strict cookie policies by dynamically setting `secure: true` and `SameSite='Strict'` on the JWT cookies when the environment is production.
