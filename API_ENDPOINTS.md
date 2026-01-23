# External API Endpoints Configuration

This document describes the external API endpoints that replace the local Next.js API routes.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## Endpoints

### Authentication Endpoints

#### Login
- **Endpoint**: `POST /auth/login`
- **Full URL**: `${NEXT_PUBLIC_API_URL}/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```

#### Signup
- **Endpoint**: `POST /auth/signup`
- **Full URL**: `${NEXT_PUBLIC_API_URL}/auth/signup`
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userpassword",
    "role": "user"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```

## Implementation

The API functions are implemented in `/src/lib/api.ts` and are used by:
- Login page: `/src/app/login/page.tsx`
- Signup page: `/src/app/signup/page.tsx`

## OAuth Authentication

NextAuth is still used for OAuth providers (Google) and the route `/api/auth/[...nextauth]` remains active for handling OAuth callbacks.
