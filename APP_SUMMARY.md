# POS Application — Specification & Implementation Guide (Angular front-end)

Nice brief — I converted your notes into a clear, actionable specification + implementation guide you can hand to devs or use to implement yourself. I kept your role/store/product rules exactly, reconciled small conflicts, and added recommended enhancements to make the app robust and production-ready.

## 1. High-level overview

A multi-store Point-of-Sale web application built with an Angular front-end and a RESTful backend (recommended: Node.js + Express) and an RDBMS (Postgres or MySQL).
Main goals: multi-role access control, per-store scoping, purchase & stock lifecycle, cashier sessions, discount rules, payments, and detailed reporting.

### Primary features:

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

## 2. Actors & Roles (as you specified)

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
- Manager’s CRUD on product is limited to the store they manage.
- Discount creation: Manager only.
- Cashier: can only create orders and apply discounts at order time (only those already set).

## 3. Data model (core tables/entities & key fields)

Below are the most important tables. Add timestamps, created_by, updated_by on each table.

### users

`id, username, email, password_hash, full_name, role_id, owner_id, store_id (nullable), is_active, last_login, created_at`

### roles

`id, name (superadmin/owner/manager/warehouse/cashier or custom), permissions (json or linked table), owner_id (nullable — null = global roles)`

### stores

`id, owner_id, name, address, phone, timezone, currency, is_active, created_at`

### suppliers

`id, owner_id, store_id (nullable), name, contact, phone, email, address, notes`

### products

`id, owner_id, store_id (nullable if product master is global), sku/barcode, name, description, uom, cost_price, sell_price, weight, category_id, supplier_id (nullable), stock_tracking (bool), images (urls)`

### product_supplier (many-to-many / tracking)

`id, product_id, supplier_id, supplier_sku, lead_time_days, preferred_flag`

### purchase_orders

`id, po_number, created_by, supplier_id, store_id, status (pending/ordered/received/closed), total, payment_terms, created_at`

### purchase_order_items

`id, po_id, product_id, qty_ordered, qty_received, unit_price, subtotal`

### receive_stock (goods receipt)

`id, po_id (nullable), receive_number, store_id, supplier_id, received_by, received_at, notes`

### stock_movements

`id, type (receive, sale, adjustment, transfer), product_id, qty, store_id, reference_id (e.g., order_id or po_id), created_by, created_at, note`

### stock_balances

`id, product_id, store_id, qty_on_hand, qty_reserved`

### orders (sales)

`id, order_number, store_id, session_id, cashier_id, customer_id (nullable), status (open/paid/void), subtotal, discount_total, tax_total, total, created_at, payment_status`

### order_items

`id, order_id, product_id, qty, unit_price, discount_applied, subtotal`

### payments

`id, order_id, payment_method_id, amount, card_number_masked (if non-cash), transaction_ref, created_at`

### payment_methods

`id, name (Cash, Debit Card, Gopay, OVO, Transfer), type, bank_account_id (nullable)`

### bank_accounts

`id, owner_id, bank_name, account_number_masked, account_name`

### customers / members

`id, name, phone, email, member_since, points, tier`

### discounts

`id, name, owner_id, store_id (nullable), discount_type (product/total), product_id (nullable), percent_or_amount, start_at, end_at, min_qty, max_qty, applicable_membership_tiers, created_by`

### cashier_sessions

`id, store_id, cashier_id, start_at, end_at (nullable), opening_balance, closing_balance, total_sales, total_refunds, status`

### audit_logs

`id, user_id, action, entity_type, entity_id, changes (json), timestamp`

## 4. Permission model (RBAC)

Permissions can be implemented as named permission strings (e.g., store.create, product.read, order.create, order.refund, report.view, etc.). Assign sets to roles.

- Owner: full permission for their owner scope (all stores they own).
- Manager: all permissions within assigned store except owner-level actions (delete owner, manage other owner stores).
- Cashier: minimal set — order.create, order.read_own_session, order.apply_discount_allowed.
- Warehouse operator: po.create, receive.create, stock.read, stock.adjust (maybe not delete).
- Superadmin: global \* permission.

### Implementation detail:

Store each role’s permissions in the roles table as JSON list or in normalized role_permissions table.

## 5. API design (recommended REST endpoints)

All endpoints require JWT token + role checks. Use middleware to check owner/store scope.

### Examples (CRUD only — add search/filtering as needed):

#### Auth

- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

#### Users

- GET /api/users (owner: list across owner; manager: list in store)
- POST /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

#### Roles

- GET /api/roles
- POST /api/roles (owner only)
- PUT /api/roles/:id
- DELETE /api/roles/:id

#### Stores

- GET /api/stores
- POST /api/stores (owner only)
- PUT /api/stores/:id (owner only)
- DELETE /api/stores/:id (owner only)

#### Products

- GET /api/products
- POST /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

#### Suppliers

- GET /api/suppliers
- POST /api/suppliers
- PUT /api/suppliers/:id
- DELETE /api/suppliers/:id

#### Purchasing / PO

- GET /api/purchase-orders
- POST /api/purchase-orders
- PUT /api/purchase-orders/:id
- POST /api/purchase-orders/:id/receive

#### Stock & Stock Movements

- GET /api/stock/balances
- POST /api/stock/adjust (manager only)
- GET /api/stock/movements

#### Orders (sales)

- POST /api/orders (create sale)
- GET /api/orders/:id
- POST /api/orders/:id/pay
- POST /api/orders/:id/void
- GET /api/sessions/:session_id/orders

#### Cashier sessions

- POST /api/sessions (open)
- PUT /api/sessions/:id/close
- GET /api/sessions/:id/report

#### Discounts

- CRUD /api/discounts

#### Payments & Payment Methods

- GET /api/payment-methods
- POST /api/payment-methods

#### Customers

- CRUD /api/customers

#### Reports

- GET /api/reports/sales?from=...&to=...
- GET /api/reports/product-performance
- GET /api/reports/cashier-sessions
- GET /api/reports/low-stock

Responses should use consistent envelope `{ success: bool, data: ..., meta: ... }`.

## 6. UI structure (Angular) & components

### Recommended modules and components:

#### Modules:

- auth.module
- admin.module (user, role)
- store.module
- product.module
- supplier.module
- purchasing.module
- stock.module
- sales.module (orders + cashier-session)
- discount.module
- customer.module
- reporting.module
- dashboard.module
- shared.module (services, directives, pipes)

#### Key components/pages:

- Login / MFA
- Dashboard (owner/manager/cashier views differ)
- Store list / store form
- User list / user form
- Role list / role form
- Product list / product form / barcode scanner dialog
- Supplier list / supplier form
- Purchase order create / PO list / receive stock page
- Stock adjustments / stock movements
- Open Session / Cashier POS screen (fast entry)
- Order details / receipt preview / print
- Discount management
- Customer list / customer detail
- Reports (filters + export)
- Settings (payment methods, bank accounts)

### UI/UX notes:

- POS (cashier) screen must be keyboard-friendly and support barcode scanners (barcode sends input + Enter).
- Allow quick-add product to order (search by name/sku/barcode).
- Provide offline capability for cashier (see enhancements).
- Use role-aware menus and UI route guards.

## 7. Cashier session & order flow (detailed)

### Flow you requested:

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

## 8. Discount rules & enforcement

### Discount types:

- Product-level (percentage or fixed) with start/end date/time and optionally quantity limits.
- Order-level (total order discount) with min total threshold.
- Member-exclusive discounts (by membership tier).
- Scheduled discounts (time based — e.g., 10% weekdays 2–4 pm).

### Behavior:

- Manager or Owner can create/edit discounts.
- Cashier may apply discounts only if discounts are configured and flagged as “allowed to cashier” or automatically applied by rule.
- On order creation, system checks active discounts for products and order-level and applies max priority rule or combine rules (define priority in discount config).

### Data relations:

- discounts -> product_id (nullable) OR scope (all products).
- discounts -> start_at / end_at / applicable_stores.

## 9. Purchasing & stock lifecycle

- PO created by Warehouse Operator/Manager/Owner.
- PO statuses: Draft -> Sent -> Partially Received -> Received -> Closed.
- Goods receipt includes PO reference and creates stock movements.
- Stock movements update stock_balances.
- Manual stock adjustments allowed to Manager (with reason mandatory).
- Track payment status for purchases: cash, credit, terms (with payment schedule).
- Stock audit:
  - Keep audit logs for changes (stock adjustments, receive, transfer).
  - Report low stock (threshold set per product).

## 10. Reporting & dashboard

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

## 11. Integrations & external concerns

- Payment gateway integrations (for debit/credit/e-wallet) — integrate with midtrans / stripe / local provider.
- Receipt printing: support thermal printer via browser or fallback to PDF receipt.
- Barcode scanner: keyboard emulation support.
- SMS/Email: for receipts or notifications.
- Accounting export: export to CSV or integrate with accounting software.
- Backup & audit: periodic DB backups and audit logs retention.

## 12. Security & compliance

- Authentication: JWT + refresh tokens or session tokens, strong password hashing (bcrypt).
- Authorization: middleware role check + store scope enforcement.
- Input validation: server-side validation & sanitize inputs.
- PCI considerations for card storage: don't store full card numbers. Only store masked PAN and tokenize via payment gateway.
- Data retention & GDPR-like concerns: provide mechanism to delete/anonymize customer data if requested (if applicable).
- Logging & monitoring: error monitoring (Sentry) and activity/audit logs.

## 13. Suggested tech stack

### Front-end:

- Angular (if you meant Angular 1.x) or Angular (recommended modern Angular 14+). Since you said Angular js, clarify later — I recommend modern Angular for long-term maintainability.
- UI: Tailwind or Angular Material for consistent UI components.
- State: RxJS + services.

### Back-end:

- Node.js + Express (or NestJS if you want structured framework).
- DB: PostgreSQL (recommended) or MySQL.
- ORM: Prisma or TypeORM / Sequelize.
- Auth: JWT + passport (or built-in NestJS Passport).
- File storage: S3 or local for images.

### DevOps:

- Containerize with Docker.
- CI/CD pipeline (GitLab/Github Actions).
- Backups & monitoring.

## 14. Important business rules & validations (summary)

- Owner can CRUD stores and roles (within owner). Superadmin can create Owners.
- Role scoping: roles created by Owner are limited to that owner.
- Manager is assigned to one store only; their actions limited to that store.
- Cashier session: sales are scoped to session; reports per session required.
- Discounts: created by Manager/Owner; cashier can apply only pre-configured discounts or those flagged as allowed.
- Product supplier relationships should allow multiple suppliers per product and track preferred supplier.
- Stock adjustments must require reason & be audited.

## 15. UI/UX & performance recommendations

- POS screen: maximize keyboard shortcuts and barcode input handling.
- Product search: implement incremental search with server-side pagination and fuzzy search.
- Use client-side caching for product lists to make POS snappy (invalidate cache on stock receive).
- Use optimistic UI for cashier operations but ensure order confirmation after server persist.
- Build mobile-friendly views for managers to check dashboard on phone.
- Add offline-first capability for POS: local IndexedDB queue for orders, sync when online (critical for unreliable networks).

## 16. Testing & QA

- Unit tests on services and critical logic (discount engine, stock reservations).
- E2E tests for main flows (open session -> create orders -> apply discounts -> close session).
- Security tests: auth & permission checks for each endpoint.
- Performance load tests on order creation endpoint.
- Data migration tests for schema changes.

## 17. Deployment & maintenance

- Staging environment to mirror production.
- Database backups daily and before migrations.
- Migrate scripts for schema updates.
- Logs retention policy & monitoring alerts for failures (e.g., failed syncs, negative stock).

## 18. Recommended enhancements (to make it “completely great”)

- Offline-first POS: Cache product data and queue orders offline; sync with server when online.
- Real-time stock updates: Use WebSocket (Socket.IO) or SSE so cashier sees latest stock after receiving PO.
- Loyalty program: points, tiers, member discounts, automatic points on purchase.
- Advanced promotions engine: combine rules, stackability, coupon codes, scheduled campaigns.
- Multi-currency / localization for chains in different countries.
- Inventory forecasting & reorder suggestions (min-max, lead-time based reorder).
- Receipt templates & printing profiles per store.
- Shift audit & CCTV tie-ins (for high-value stores).
- 2-factor auth (2FA) for owner or manager accounts.
- Role-based UI templates: dashboard tailored to role (sales KPIs for owner, stock KPIs for warehouse).
- API for third-party apps (mobile app, kiosk).
- Import/export bulk product, supplier list via CSV.
- Analytics pipeline (store-level trends, cohort analysis).

## 19. Sample implementation checklist / roadmap (MVP → v1 → v2)

### MVP (4–8 weeks depending on team):

- Auth, Roles, Users
- Store creation
- Products CRUD with barcode
- Suppliers CRUD
- PO creation + receiving
- Stock balance + stock movements
- Cashier session + POS order creation + payments (cash)
- Basic reports: sales per session, top products, low stock
- Dashboard minimal widgets

### v1 (after MVP):

- Discounts engine
- Multiple payment methods + payment gateway integration
- Customer/member management + membership discount
- Export reports to Excel
- Role-permissions editor UI

### v2 (polish & scale):

- Offline POS + sync
- Loyalty program + member tiers
- Advanced analytics & forecasting
- Multi-tenant / SaaS hardening (if needed)
- Mobile apps & printer integration

## 20. Appendix — Example DB relation snippet (ER notes)

- owner (users with role owner) 1—\* stores
- store 1—\* stock_balances (per product)
- product — supplier via product_supplier
- purchase_order 1—\* purchase_order_items
- purchase_order 1—\* receive_stock (one-to-many for partial receives)
- order 1—\* order_items; order -> payments (1..\*)
- cashier_session 1—\* orders (session stores all orders by cashier for shift)
