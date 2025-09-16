# POS Application - Frontend to Backend Connection

This document explains how to connect the Angular frontend to the Express.js backend.

## Prerequisites

1. Ensure the backend server is running on `http://localhost:3000`
2. Ensure the frontend is configured to connect to the correct API endpoint

## Configuration

The frontend is already configured to connect to the backend API at `http://localhost:3000`. 
This is set in the service files:

```typescript
private apiUrl = 'http://localhost:3000/api/auth';
```

## Starting the Applications

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Start the backend server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend/pos-app
   ```

2. Start the frontend development server:
   ```
   npm start
   ```

## API Endpoints

The frontend communicates with the backend through the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get store by ID
- `GET /api/stores/owner/:ownerId` - Get stores by owner ID
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/store/:storeId` - Get products by store ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Troubleshooting

### CORS Issues

If you encounter CORS issues, ensure the backend has CORS enabled. The backend should already have this configured:

```javascript
const cors = require('cors');
app.use(cors());
```

### Connection Refused

If you get a "connection refused" error:
1. Ensure the backend server is running
2. Check that the backend is listening on port 3000
3. Verify that there are no firewall issues

### Authentication Errors

If authentication fails:
1. Ensure the database is properly initialized
2. Verify that the user credentials are correct
3. Check that the JWT secret is correctly configured in the backend `.env` file