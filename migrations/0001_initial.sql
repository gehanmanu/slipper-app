-- Migration number: 0001        2025-04-02
-- Slipper Distribution Web App Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS users;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create product sizes table
CREATE TABLE IF NOT EXISTS product_sizes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  size TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop_id INTEGER NOT NULL,
  order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('Cash', 'Cheque')),
  payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Completed')),
  order_status TEXT NOT NULL DEFAULT 'New' CHECK (order_status IN ('New', 'Processing', 'Completed', 'Cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  location TEXT,
  notes TEXT,
  created_by TEXT,
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_orders_shop_id ON orders(shop_id);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Insert initial admin user
INSERT INTO users (username, password, role) VALUES 
  ('admin', 'gehan123', 'admin');

-- Insert sample products
INSERT INTO products (name, description, price, image_url) VALUES 
  ('Classic Flip Flops', 'Comfortable everyday slippers', 15.99, '/images/classic-flip-flops.jpg'),
  ('Luxury Leather Slippers', 'Premium leather house slippers', 29.99, '/images/luxury-leather.jpg'),
  ('Beach Sandals', 'Waterproof beach sandals', 19.99, '/images/beach-sandals.jpg'),
  ('Cozy Home Slippers', 'Warm and soft indoor slippers', 24.99, '/images/cozy-home.jpg');

-- Insert sample product sizes
INSERT INTO product_sizes (product_id, size, stock) VALUES 
  (1, 'S', 50),
  (1, 'M', 100),
  (1, 'L', 75),
  (1, 'XL', 25),
  (2, 'S', 30),
  (2, 'M', 60),
  (2, 'L', 40),
  (2, 'XL', 20),
  (3, 'S', 40),
  (3, 'M', 80),
  (3, 'L', 60),
  (3, 'XL', 30),
  (4, 'S', 35),
  (4, 'M', 70),
  (4, 'L', 50),
  (4, 'XL', 25);

-- Insert sample shop
INSERT INTO shops (name, address, contact_person, phone, email, location) VALUES 
  ('Footwear Paradise', '123 Main St, Colombo', 'John Smith', '+94123456789', 'john@footwearparadise.com', 'Colombo');
