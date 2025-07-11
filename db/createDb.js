const {Client} = require('pg');
require('dotenv').config();
const SQL = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  company VARCHAR(100) NOT NULL,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_category VARCHAR(100) NOT NULL,
  price DECIMAL(16,4),
  quantity INTEGER,
  image_sample TEXT,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  from_company VARCHAR(100),
  added_by INTEGER
);

-- ✅ Insert users first
INSERT INTO users (user_name, email, password, company)
VALUES
  ('Alice Johnson', 'alice@example.com', 'password123', 'CompanyA'),
  ('Bob Smith', 'bob@example.com', 'password456', 'CompanyB');

-- ✅ Now insert products
INSERT INTO products (product_name, product_category, price, quantity, image_sample, from_company, added_by)
VALUES
  ('Smartphone X', 'Electronics', 299.99, 45, 'https://picsum.photos/seed/phone/300/200', 'CompanyA', 1),
  ('Headphones Pro', 'Electronics', 99.99, 30, 'https://picsum.photos/seed/headphones/300/200', 'CompanyA', 1),
  ('Leather Jacket', 'Clothing', 149.99, 20, 'https://picsum.photos/seed/jacket/300/200', 'CompanyA', 1),
  ('Sneakers', 'Clothing', 89.99, 50, 'https://picsum.photos/seed/sneakers/300/200', 'CompanyA', 1),
  ('Coffee Mug', 'Accessories', 12.49, 100, 'https://picsum.photos/seed/mug/300/200', 'CompanyA', 1),
  ('Analog Watch', 'Accessories', 199.99, 15, 'https://picsum.photos/seed/watch/300/200', 'CompanyA', 1),
  ('Novel – The Great Tale', 'Books', 19.99, 60, 'https://picsum.photos/seed/novel/300/200', 'CompanyA', 1),
  ('Cookbook Deluxe', 'Books', 29.99, 40, 'https://picsum.photos/seed/cookbook/300/200', 'CompanyA', 1),
  ('Office Desk', 'Furniture', 249.99, 10, 'https://picsum.photos/seed/desk/300/200', 'CompanyA', 1),
  ('Desk Chair', 'Furniture', 129.99, 25, 'https://picsum.photos/seed/chair/300/200', 'CompanyA', 1),

  ('Action Camera', 'Electronics', 199.99, 35, 'https://picsum.photos/seed/camera/300/200', 'CompanyB', 2),
  ('Travel Backpack', 'Accessories', 79.99, 50, 'https://picsum.photos/seed/backpack/300/200', 'CompanyB', 2),
  ('Running Shoes', 'Clothing', 109.99, 45, 'https://picsum.photos/seed/runningshoes/300/200', 'CompanyB', 2),
  ('Yoga Mat', 'Fitness', 24.99, 60, 'https://picsum.photos/seed/yogamat/300/200', 'CompanyB', 2),
  ('Desk Lamp', 'Home', 39.99, 70, 'https://picsum.photos/seed/desklamp/300/200', 'CompanyB', 2),
  ('Wireless Mouse', 'Electronics', 29.99, 80, 'https://picsum.photos/seed/mouse/300/200', 'CompanyB', 2),
  ('Notebook', 'Stationery', 5.99, 200, 'https://picsum.photos/seed/notebook/300/200', 'CompanyB', 2),
  ('Pen Set', 'Stationery', 12.99, 150, 'https://picsum.photos/seed/penset/300/200', 'CompanyB', 2),
  ('Bluetooth Speaker', 'Electronics', 49.99, 55, 'https://picsum.photos/seed/speaker/300/200', 'CompanyB', 2),
  ('Water Bottle', 'Fitness', 14.99, 100, 'https://picsum.photos/seed/waterbottle/300/200', 'CompanyB', 2);

`


async function main(){
    console.log("seeding. . .")

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");

};

main();