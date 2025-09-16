# POS Application Backend

This is the backend API for the Point-of-Sale application built with Express.js and MySQL.

## Features Implemented

1. **Authentication**
   - User login with JWT tokens
   - Password hashing with bcrypt

2. **User Management**
   - Create, read, update, delete users
   - Role-based access control

3. **Store Management**
   - Multi-store support
   - Store creation and management

4. **Product Management**
   - Product catalog management
   - Store-specific products

5. **Security**
   - Helmet.js for security headers
   - CORS enabled
   - Input validation

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── app.js           # Express application
├── .env                 # Environment variables
├── server.js            # Entry point
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## API Endpoints

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

## Setup Instructions

1. Clone the repository
2. Navigate to the `backend` directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a MySQL database and update the `.env` file with your database credentials
5. Run the database migrations (schema setup)
6. Start the development server:
   ```
   npm run dev
   ```
   
## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=pos_app
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

## Database Schema

The application uses the following tables:

1. **users** - User accounts and authentication
2. **roles** - User roles for access control
3. **stores** - Store information
4. **products** - Product catalog
5. **suppliers** - Supplier information
6. **purchase_orders** - Purchase orders
7. **stock_movements** - Stock movement tracking
8. **orders** - Sales orders
9. **payments** - Payment records

## Development

To start the development server with auto-reload:
```
npm run dev
```

To start the production server:
```
npm start
```

## Future Enhancements

1. Implement database migrations
2. Add comprehensive input validation
3. Implement pagination for large datasets
4. Add unit and integration tests
5. Implement rate limiting
6. Add logging with Winston
7. Implement file upload for product images
8. Add comprehensive error handling