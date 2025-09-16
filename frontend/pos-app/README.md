# POS Application Frontend

This is the frontend for the Point-of-Sale application built with Angular.

## Features Implemented

1. **Authentication**
   - Login functionality
   - JWT token management
   - Route protection with auth guard

2. **Dashboard**
   - Overview of key metrics
   - Sales statistics
   - Recent alerts

3. **Store Management**
   - List all stores
   - Add/edit stores
   - Activate/deactivate stores

4. **Product Management**
   - List all products
   - Add/edit products
   - Search functionality

5. **Sales / Order Management**
   - Cashier sessions
   - Order creation
   - Payment processing

6. **Purchasing**
   - Purchase order management
   - Supplier management

7. **Stock Management**
   - Stock balance tracking
   - Stock adjustments
   - Low stock alerts

8. **Customer Management**
   - Customer list
   - Membership tiers
   - Points tracking

9. **Reporting**
   - Sales reports
   - Product performance
   - Cashier session reports

10. **Settings**
    - System configuration
    - User management
    - Payment methods

## Project Structure

```
src/
├── app/
│   ├── guards/              # Route guards
│   ├── models/              # Data models
│   ├── modules/            # Feature modules
│   │   ├── auth/            # Authentication module
│   │   ├── dashboard/       # Dashboard module
│   │   ├── products/        # Product management module
│   │   ├── stores/          # Store management module
│   │   ├── sales/            # Sales module
│   │   ├── purchasing/      # Purchasing module
│   │   ├── stock/           # Stock management module
│   │   ├── customers/       # Customer management module
│   │   ├── reports/         # Reporting module
│   │   ├── settings/         # Settings module
│   │   └── shared/           # Shared components
│   ├── services/            # API services
│   ├── app.config.ts        # Application configuration
│   ├── app.routes.ts        # Application routes
│   └── app.ts               # Main application component
├── assets/                  # Static assets
├── styles.scss              # Global styles
└── index.html               # Main HTML file
```

## Development Setup

1. Navigate to the frontend directory:
   ```
   cd frontend/pos-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at `http://localhost:4200`

## Building for Production

To build the application for production:
```
npm run build
```

## Dependencies

- Angular 18+
- RxJS
- TypeScript

## Services

The application communicates with the backend API through services:
- AuthService: Handles authentication and user management
- StoreService: Manages store data
- ProductService: Manages product data
- UserService: Manages user data
- SupplierService: Manages supplier data
- PurchaseOrderService: Manages purchase orders
- StockService: Manages stock data
- CustomerService: Manages customer data
- SalesService: Manages sales data
- ReportService: Manages reports

## Modules

### Auth Module
Handles user authentication including login functionality.

### Dashboard Module
Provides an overview of key metrics and reports.

### Stores Module
Manages store information including creation and editing.

### Products Module
Handles product catalog management.

### Sales Module
Manages sales orders and cashier sessions.

### Purchasing Module
Handles purchasing functionality including purchase orders and suppliers.

### Stock Module
Manages stock balances and movements.

### Customers Module
Manages customer information and membership programs.

### Reports Module
Provides various business reports.

### Settings Module
System configuration and user management.

## Future Enhancements

1. Implement role-based access control in the UI
2. Add comprehensive input validation
3. Implement pagination for large datasets
4. Add unit and integration tests
5. Implement real-time updates with WebSockets
6. Add offline capability for POS
7. Implement advanced reporting features
8. Add barcode scanning functionality
9. Implement loyalty program features
10. Add inventory forecasting