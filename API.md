# EduAyna REST API Documentation

This document outlines the REST API endpoints available in the backend application. 

**Base URL**: `http://localhost:4000/api/v1` (Local) / `https://student-management-backend-beta-seven.vercel.app/api/v1` (Production)
**Swagger UI**: `/api/docs`

---

## 🔒 Authentication

All protected endpoints require a valid JWT token. 
The backend checks for this token in two places:
1. **HTTP-only Cookie**: Named `access_token` (used automatically by the frontend).
2. **Authorization Header**: `Authorization: Bearer <token>` (used by Swagger and external clients).

### 1. Register a new user
Registers a new admin/user in the system.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No

**Request Body**:
```json
{
  "email": "admin@flynest.com",
  "password": "yourpassword"
}
```

**Responses**:
- `201 Created`: User registered successfully.
- `400 Bad Request`: Validation error (e.g., password too short).
- `409 Conflict`: User with this email already exists.

### 2. Login
Authenticates a user, returns a JWT token, and securely sets an HTTP-only cookie.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No

**Request Body**:
```json
{
  "email": "admin@flynest.com",
  "password": "yourpassword"
}
```

**Responses**:
- `200 OK`: Login successful. Returns user data and the `access_token`.
- `401 Unauthorized`: Invalid credentials.

### 3. Get Current User Profile
Retrieves the profile of the currently logged-in user.

- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token or Cookie)

**Responses**:
- `200 OK`: Returns the user object (excluding password).
- `401 Unauthorized`: Token is missing or invalid.

### 4. Logout
Clears the `access_token` HTTP-only cookie.

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token or Cookie)

**Responses**:
- `200 OK`: `{ "message": "Logged out successfully" }`

---

## 🎓 Students

### 1. Get All Students
Retrieves a paginated list of students. Supports filtering by class, status, and searching by name/email.

- **URL**: `/students`
- **Method**: `GET`
- **Auth Required**: No (Publicly readable)

**Query Parameters** (All optional):
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search by name or email
- `class` (string): Filter by exactly matching class name
- `status` (string): Filter by status (`ACTIVE` or `INACTIVE`)
- `sortBy` (string): Sort field (`name`, `createdAt`, `class`)
- `sortOrder` (string): Sort direction (`asc`, `desc`)

**Responses**:
- `200 OK`: Returns a paginated list of students and metadata (total count, pages, etc.).

### 2. Get Student by ID
Retrieves a specific student by their UUID.

- **URL**: `/students/:id`
- **Method**: `GET`
- **Auth Required**: No

**Responses**:
- `200 OK`: Returns the student object.
- `404 Not Found`: Student does not exist.

### 3. Create a Student
Creates a new student record.

- **URL**: `/students`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token or Cookie)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+8801712345678",
  "class": "Grade 10",
  "status": "ACTIVE"
}
```

**Responses**:
- `201 Created`: Returns the created student.
- `400 Bad Request`: Validation errors (e.g., missing fields).
- `409 Conflict`: Email already exists.

### 4. Update a Student
Updates an existing student's details.

- **URL**: `/students/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes (Bearer Token or Cookie)

**Request Body** (All fields optional):
```json
{
  "name": "John Doe Updated",
  "status": "INACTIVE"
}
```

**Responses**:
- `200 OK`: Returns the updated student.
- `400 Bad Request`: Validation error.
- `404 Not Found`: Student does not exist.
- `409 Conflict`: Email already exists (if email is being changed).

### 5. Delete a Student
Permanently removes a student from the database.

- **URL**: `/students/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (Bearer Token or Cookie)

**Responses**:
- `200 OK`: Returns the deleted student data.
- `404 Not Found`: Student does not exist.
