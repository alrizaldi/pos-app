# POS Application - Complete Solution

This is a complete Point-of-Sale application with both frontend and backend components.

## Backend (Express.js + MySQL)

Location: `/backend`

### Features
- RESTful API design
- User authentication with JWT tokens
- Role-based access control
- Store management
- Product management
- Security features (bcrypt password hashing, helmet, CORS)

### Technologies
- Node.js
- Express.js
- MySQL
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- helmet
- morgan

## Frontend (Angular)

Location: `/frontend/pos-app`

### Features
- Modern Angular architecture with standalone components
- Responsive design
- Authentication flow
- Dashboard with key metrics
- Store management (CRUD operations)
- Product management (CRUD operations)
- Navigation with route protection

### Technologies
- Angular 18+
- TypeScript
- RxJS
- Angular Router
- Angular Forms

## Database Schema

The application uses a MySQL database with the following tables:
- users
- roles
- stores
- products
- suppliers
- purchase_orders
- stock_movements
- orders
- payments
- customers
- discounts
- cashier_sessions
- audit_logs

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Users
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

### Stores
- GET /api/stores
- GET /api/stores/:id
- GET /api/stores/owner/:ownerId
- POST /api/stores
- PUT /api/stores/:id
- DELETE /api/stores/:id

### Products
- GET /api/products
- GET /api/products/:id
- GET /api/products/store/:storeId
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

## Getting Started

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure the database in `.env`
4. Initialize the database: `node init-db.js`
5. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend/pos-app`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Future Enhancements

1. Implement sales/order management features
2. Add comprehensive reporting functionality
3. Implement customer management
4. Add discount engine
5. Implement inventory management features
6. Add purchasing functionality
7. Implement role-based access control in the UI
8. Add unit and integration tests
9. Implement pagination for large datasets
10. Add file upload for product images