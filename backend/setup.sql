-- Create database
CREATE DATABASE IF NOT EXISTS pos_app;
USE pos_app;

-- Create roles table
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  permissions JSON,
  owner_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, permissions) VALUES 
  ('superadmin', '{"permissions": ["*"]}'),
  ('owner', '{"permissions": ["store.*", "user.*", "product.*", "order.*", "report.*"]}'),
  ('manager', '{"permissions": ["product.*", "order.*", "report.*"]}'),
  ('warehouse', '{"permissions": ["purchase.*", "stock.*"]}'),
  ('cashier', '{"permissions": ["order.create", "order.read"]}');

-- Create users table
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

-- Create stores table
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

-- Create products table
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