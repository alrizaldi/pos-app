# POS Application - Complete Solution Summary

This is a complete Point-of-Sale application with both frontend and backend components.

## Table of Contents
1. [Overview](#overview)
2. [Backend (Express.js + MySQL)](#backend-expressjs--mysql)
3. [Frontend (Angular)](#frontend-angular)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Actors & Roles](#actors--roles)
7. [Data Model](#data-model)
8. [Permission Model](#permission-model)
9. [Cashier Session & Order Flow](#cashier-session--order-flow)
10. [Discount Rules & Enforcement](#discount-rules--enforcement)
11. [Purchasing & Stock Lifecycle](#purchasing--stock-lifecycle)
12. [Reporting & Dashboard](#reporting--dashboard)
13. [Security & Compliance](#security--compliance)
14. [Technology Stack](#technology-stack)
15. [Getting Started](#getting-started)
16. [API Testing](#api-testing)
17. [Future Enhancements](#future-enhancements)

## Overview

A multi-store Point-of-Sale web application built with an Angular front-end and a RESTful backend (Node.js + Express) and an RDBMS (MySQL).

### Primary Features:
- User & Role Management (RBAC)
- Store Management (multi-store)
- Product & Supplier Management
- Purchasing (PO) + Receiving
- Stock Management & Adjustments
- Sales / Order Management (cashier sessions)
- Discount & Promotion Engine
- Payment Methods & Transactions
- Customer (member) Management
- Reporting & Dashboard

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
- Angular 20+
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

### Core Tables & Key Fields

#### users
`id, username, email, password_hash, full_name, role_id, owner_id, store_id (nullable), is_active, last_login, created_at`

#### roles
`id, name (superadmin/owner/manager/warehouse/cashier or custom), permissions (json or linked table), owner_id (nullable — null = global roles)`

#### stores
`id, owner_id, name, address, phone, timezone, currency, is_active, created_at`

#### suppliers
`id, owner_id, store_id (nullable), name, contact, phone, email, address, notes`

#### products
`id, owner_id, store_id (nullable if product master is global), sku/barcode, name, description, uom, cost_price, sell_price, weight, category_id, supplier_id (nullable), stock_tracking (bool), images (urls)`

#### product_supplier (many-to-many / tracking)
`id, product_id, supplier_id, supplier_sku, lead_time_days, preferred_flag`

#### purchase_orders
`id, po_number, created_by, supplier_id, store_id, status (pending/ordered/received/closed), total, payment_terms, created_at`

#### purchase_order_items
`id, po_id, product_id, qty_ordered, qty_received, unit_price, subtotal`

#### receive_stock (goods receipt)
`id, po_id (nullable), receive_number, store_id, supplier_id, received_by, received_at, notes`

#### stock_movements
`id, type (receive, sale, adjustment, transfer), product_id, qty, store_id, reference_id (e.g., order_id or po_id), created_by, created_at, note`

#### stock_balances
`id, product_id, store_id, qty_on_hand, qty_reserved`

#### orders (sales)
`id, order_number, store_id, session_id, cashier_id, customer_id (nullable), status (open/paid/void), subtotal, discount_total, tax_total, total, created_at, payment_status`

#### order_items
`id, order_id, product_id, qty, unit_price, discount_applied, subtotal`

#### payments
`id, order_id, payment_method_id, amount, card_number_masked (if non-cash), transaction_ref, created_at`

#### payment_methods
`id, name (Cash, Debit Card, Gopay, OVO, Transfer), type, bank_account_id (nullable)`

#### bank_accounts
`id, owner_id, bank_name, account_number_masked, account_name`

#### customers / members
`id, name, phone, email, member_since, points, tier`

#### discounts
`id, name, owner_id, store_id (nullable), discount_type (product/total), product_id (nullable), percent_or_amount, start_at, end_at, min_qty, max_qty, applicable_membership_tiers, created_by`

#### cashier_sessions
`id, store_id, cashier_id, start_at, end_at (nullable), opening_balance, closing_balance, total_sales, total_refunds, status`

#### audit_logs
`id, user_id, action, entity_type, entity_id, changes (json), timestamp`

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

### Purchasing / PO
- GET /api/purchase-orders
- POST /api/purchase-orders
- PUT /api/purchase-orders/:id
- POST /api/purchase-orders/:id/receive

### Stock & Stock Movements
- GET /api/stock/balances
- POST /api/stock/adjust (manager only)
- GET /api/stock/movements

### Orders (sales)
- POST /api/orders (create sale)
- GET /api/orders/:id
- POST /api/orders/:id/pay
- POST /api/orders/:id/void
- GET /api/sessions/:session_id/orders

### Cashier sessions
- POST /api/sessions (open)
- PUT /api/sessions/:id/close
- GET /api/sessions/:id/report

### Discounts
- CRUD /api/discounts

### Payments & Payment Methods
- GET /api/payment-methods
- POST /api/payment-methods

### Customers
- CRUD /api/customers

### Reports
- GET /api/reports/sales?from=...&to=...
- GET /api/reports/product-performance
- GET /api/reports/cashier-sessions
- GET /api/reports/low-stock

Responses should use consistent envelope `{ success: bool, data: ..., meta: ... }`.

## Actors & Roles

### Superadmin
- Global visibility: can track everything across all owners and stores.
- Can create Owner accounts.

### Owner
- Can CRUD stores, create Roles (except Superadmin), create users, CRUD all features across their stores.

### Manager
- Can manage a single assigned store.
- Can CRUD master product (only for their assigned store), suppliers, discounts, create users (but cannot create Owner account), manage orders, reports.

### Warehouse Operator
- Can create purchase orders (PO) for any product, record receiving at store, and track purchasing history.

### Cashier
- Can create orders (sales) during cashier session, apply discounts that are already configured by Manager/Owner (or that are allowed to cashier), and close sessions. Limited access to other features.

### Notes / Enforcement:
- Role creation: normally created by Owner. Superadmin can create Owners. Owner-created roles are scoped to that Owner.
- Manager: cannot delete Owner accounts.
- Manager's CRUD on product is limited to the store they manage.
- Discount creation: Manager only.
- Cashier: can only create orders and apply discounts at order time (only those already set).

## Permission Model (RBAC)

Permissions can be implemented as named permission strings (e.g., store.create, product.read, order.create, order.refund, report.view, etc.). Assign sets to roles.

- Owner: full permission for their owner scope (all stores they own).
- Manager: all permissions within assigned store except owner-level actions (delete owner, manage other owner stores).
- Cashier: minimal set — order.create, order.read_own_session, order.apply_discount_allowed.
- Warehouse operator: po.create, receive.create, stock.read, stock.adjust (maybe not delete).
- Superadmin: global \* permission.

### Implementation detail:
Store each role's permissions in the roles table as JSON list or in normalized role_permissions table.

## Cashier Session & Order Flow

### Flow:
1. Create store -> Owner.
2. Create accounts (owner creates manager/cashier etc).
3. Create suppliers.
4. Create products.
5. Create purchase order (PO) to supplier.
6. Receive stock -> stock movements update balances.
7. Cashier opens session (shift): records opening_balance (petty cash).
8. Cashier creates orders during session: multiple products, discounts (only active ones).
9. Payments recorded (cash, debit, e-wallets).
10. Close session: calculate totals, cash in drawer, reconcile petty cash, shift report.
11. Reporting: per session, per cashier, per product, per member.

### Important logic:
- Orders should lock reserved quantity to prevent overselling (decrement available stock or reserve until payment).
- Session-level report includes: opening_balance, cash_sales, non-cash_sales, refunds, closing_balance, discrepancy.
- Session timing: store-defined shift windows (e.g., 08:00–14:00). System should allow manual open/close by cashier but track timestamps.

## Discount Rules & Enforcement

### Discount types:
- Product-level (percentage or fixed) with start/end date/time and optionally quantity limits.
- Order-level (total order discount) with min total threshold.
- Member-exclusive discounts (by membership tier).
- Scheduled discounts (time based — e.g., 10% weekdays 2–4 pm).

### Behavior:
- Manager or Owner can create/edit discounts.
- Cashier may apply discounts only if discounts are configured and flagged as "allowed to cashier" or automatically applied by rule.
- On order creation, system checks active discounts for products and order-level and applies max priority rule or combine rules (define priority in discount config).

### Data relations:
- discounts -> product_id (nullable) OR scope (all products).
- discounts -> start_at / end_at / applicable_stores.

## Purchasing & Stock Lifecycle

- PO created by Warehouse Operator/Manager/Owner.
- PO statuses: Draft -> Sent -> Partially Received -> Received -> Closed.
- Goods receipt includes PO reference and creates stock movements.
- Stock movements update stock_balances.
- Manual stock adjustments allowed to Manager (with reason mandatory).
- Track payment status for purchases: cash, credit, terms (with payment schedule).
- Stock audit:
  - Keep audit logs for changes (stock adjustments, receive, transfer).
  - Report low stock (threshold set per product).

## Reporting & Dashboard

### Reports to implement:
- Sales report (by date range, by store, by cashier, shift)
- Product sales performance (top N)
- Customer/member purchase history & top spenders
- Purchase & receiving history
- Stock movement & stock on hand
- Discounts used (what discounts applied, when, by whom)
- Payment reconciliation (cash vs non-cash)
- Export to Excel (CSV/XLSX)

### Dashboard widgets:
- Top 5 products of the month (by revenue or qty)
- Top 5 members by spend
- Alerts: top 10 products low in stock (threshold)
- Busy time heatmap: busiest day/hour of month (transactions distribution)
- Quick KPIs: daily sales, transactions count, avg basket, cash in drawer

## Security & Compliance

- Authentication: JWT + refresh tokens or session tokens, strong password hashing (bcrypt).
- Authorization: middleware role check + store scope enforcement.
- Input validation: server-side validation & sanitize inputs.
- PCI considerations for card storage: don't store full card numbers. Only store masked PAN and tokenize via payment gateway.
- Data retention & GDPR-like concerns: provide mechanism to delete/anonymize customer data if requested (if applicable).
- Logging & monitoring: error monitoring (Sentry) and activity/audit logs.

## Technology Stack

### Front-end:
- Angular (modern Angular 20+)
- UI: Angular Material for consistent UI components
- State: RxJS + services

### Back-end:
- Node.js + Express
- DB: MySQL
- ORM: mysql2 (promise-based)
- Auth: JWT + passport
- File storage: Local for images

### DevOps:
- Containerize with Docker (optional)
- CI/CD pipeline (optional)

## Getting Started

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure the database in `.env`
4. Initialize the database: `node init-db.js` (if exists) or run setup.sql
5. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend/pos-app`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Testing

### Postman Collection
- Import `POS-App-API.postman_collection.json` into Postman
- Use the requests to test the API endpoints

### Initialization Script
- Run `node init-app.js` to create a default admin user and sample data
- Login credentials: username: admin, password: password123

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
11. Implement offline-first capability for cashier
12. Add real-time stock updates
13. Implement loyalty program
14. Add advanced promotions engine
15. Implement multi-currency support
16. Add inventory forecasting
17. Implement receipt templates
18. Add shift audit & CCTV tie-ins
19. Add 2-factor auth (2FA)
20. Add role-based UI templates
21. Implement API for third-party apps
22. Add import/export bulk product/supplier list
23. Add analytics pipeline