# POS Application Database Schema

This document outlines the database schema for the POS application.

## Tables

### users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  owner_id INT NULL,
  store_id INT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### roles
```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  permissions JSON,
  owner_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### stores
```sql
CREATE TABLE stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  timezone VARCHAR(50) DEFAULT 'UTC',
  currency VARCHAR(3) DEFAULT 'USD',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### suppliers
```sql
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  store_id INT NULL,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### products
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  store_id INT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  uom VARCHAR(20) DEFAULT 'each',
  cost_price DECIMAL(10, 2) NOT NULL,
  sell_price DECIMAL(10, 2) NOT NULL,
  weight DECIMAL(10, 2) NULL,
  category_id INT NULL,
  supplier_id INT NULL,
  stock_tracking BOOLEAN DEFAULT TRUE,
  images JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### product_supplier
```sql
CREATE TABLE product_supplier (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  supplier_id INT NOT NULL,
  supplier_sku VARCHAR(50),
  lead_time_days INT DEFAULT 0,
  preferred_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### purchase_orders
```sql
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  po_number VARCHAR(50) UNIQUE NOT NULL,
  created_by INT NOT NULL,
  supplier_id INT NOT NULL,
  store_id INT NOT NULL,
  status ENUM('pending', 'ordered', 'received', 'closed') DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  payment_terms VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### purchase_order_items
```sql
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  po_id INT NOT NULL,
  product_id INT NOT NULL,
  qty_ordered INT NOT NULL,
  qty_received INT DEFAULT 0,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);
```

### receive_stock
```sql
CREATE TABLE receive_stock (
  id INT PRIMARY KEY AUTO_INCREMENT,
  po_id INT NULL,
  receive_number VARCHAR(50) UNIQUE NOT NULL,
  store_id INT NOT NULL,
  supplier_id INT NOT NULL,
  received_by INT NOT NULL,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);
```

### stock_movements
```sql
CREATE TABLE stock_movements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('receive', 'sale', 'adjustment', 'transfer') NOT NULL,
  product_id INT NOT NULL,
  qty INT NOT NULL,
  store_id INT NOT NULL,
  reference_id INT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  note TEXT
);
```

### stock_balances
```sql
CREATE TABLE stock_balances (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  store_id INT NOT NULL,
  qty_on_hand INT DEFAULT 0,
  qty_reserved INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### orders
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  store_id INT NOT NULL,
  session_id INT NOT NULL,
  cashier_id INT NOT NULL,
  customer_id INT NULL,
  status ENUM('open', 'paid', 'void') DEFAULT 'open',
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_total DECIMAL(10, 2) DEFAULT 0,
  tax_total DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### order_items
```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  qty INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  discount_applied DECIMAL(10, 2) DEFAULT 0,
  subtotal DECIMAL(10, 2) NOT NULL
);
```

### payments
```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  payment_method_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  card_number_masked VARCHAR(20) NULL,
  transaction_ref VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### payment_methods
```sql
CREATE TABLE payment_methods (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  bank_account_id INT NULL
);
```

### bank_accounts
```sql
CREATE TABLE bank_accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_number_masked VARCHAR(50) NOT NULL,
  account_name VARCHAR(100) NOT NULL
);
```

### customers
```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points INT DEFAULT 0,
  tier VARCHAR(50)
);
```

### discounts
```sql
CREATE TABLE discounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  owner_id INT NOT NULL,
  store_id INT NULL,
  discount_type ENUM('product', 'total') NOT NULL,
  product_id INT NULL,
  percent_or_amount DECIMAL(5, 2) NOT NULL,
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  min_qty INT DEFAULT 0,
  max_qty INT DEFAULT 0,
  applicable_membership_tiers JSON,
  created_by INT NOT NULL
);
```

### cashier_sessions
```sql
CREATE TABLE cashier_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  cashier_id INT NOT NULL,
  start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_at TIMESTAMP NULL,
  opening_balance DECIMAL(10, 2) DEFAULT 0,
  closing_balance DECIMAL(10, 2) DEFAULT 0,
  total_sales DECIMAL(10, 2) DEFAULT 0,
  total_refunds DECIMAL(10, 2) DEFAULT 0,
  status ENUM('open', 'closed') DEFAULT 'open'
);
```

### audit_logs
```sql
CREATE TABLE audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT NOT NULL,
  changes JSON,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Relationships

- `users.role_id` references `roles.id`
- `users.owner_id` references `users.id` (for owner-created users)
- `users.store_id` references `stores.id`
- `stores.owner_id` references `users.id`
- `suppliers.owner_id` references `users.id`
- `suppliers.store_id` references `stores.id`
- `products.owner_id` references `users.id`
- `products.store_id` references `stores.id`
- `products.category_id` references `categories.id`
- `products.supplier_id` references `suppliers.id`
- `product_supplier.product_id` references `products.id`
- `product_supplier.supplier_id` references `suppliers.id`
- `purchase_orders.created_by` references `users.id`
- `purchase_orders.supplier_id` references `suppliers.id`
- `purchase_orders.store_id` references `stores.id`
- `purchase_order_items.po_id` references `purchase_orders.id`
- `purchase_order_items.product_id` references `products.id`
- `receive_stock.po_id` references `purchase_orders.id`
- `receive_stock.store_id` references `stores.id`
- `receive_stock.supplier_id` references `suppliers.id`
- `receive_stock.received_by` references `users.id`
- `stock_movements.product_id` references `products.id`
- `stock_movements.store_id` references `stores.id`
- `stock_movements.created_by` references `users.id`
- `stock_balances.product_id` references `products.id`
- `stock_balances.store_id` references `stores.id`
- `orders.store_id` references `stores.id`
- `orders.session_id` references `cashier_sessions.id`
- `orders.cashier_id` references `users.id`
- `orders.customer_id` references `customers.id`
- `order_items.order_id` references `orders.id`
- `order_items.product_id` references `products.id`
- `payments.order_id` references `orders.id`
- `payments.payment_method_id` references `payment_methods.id`
- `payment_methods.bank_account_id` references `bank_accounts.id`
- `bank_accounts.owner_id` references `users.id`
- `discounts.owner_id` references `users.id`
- `discounts.store_id` references `stores.id`
- `discounts.product_id` references `products.id`
- `discounts.created_by` references `users.id`
- `cashier_sessions.store_id` references `stores.id`
- `cashier_sessions.cashier_id` references `users.id`
- `audit_logs.user_id` references `users.id`