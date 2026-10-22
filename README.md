# 🛍️ Syntecxhub E-Commerce Store

[![Node.js](https://img.shields.io/badge/Node.js-v24.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19.x-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4.x-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local%20%2F%20Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Protected-orange.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)]()

> A full-stack, enterprise-grade E-Commerce Web Application architected with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. Featuring a dark-tech aesthetic, glassmorphic design system, real-time inventory tracking, simulated multi-method checkout, customer order tracking, and an authorized administrative management console.

---

## 🌟 Key Features

### 1. 🎨 Modern User Interface & Aesthetic
- **Futuristic Dark-Tech Theme**: Deep navy and slate canvas with violet, cyan, and emerald glowing accents.
- **Glassmorphic Elements**: Translucent blurred cards, floating micro-interactions, smooth hover lifts, and fluid modal transitions.
- **Responsive Layout**: Designed for mobile smartphones, tablets, and wide desktop displays.
- **Typography**: Paired with modern fonts (*Plus Jakarta Sans* for readable body text and *Outfit* for headings).

### 2. 🔍 Product Catalog, Search & Filtering
- **Dynamic Category Strips**: Fast filtering across Audio, Computing, Wearables, Electronics, Smart Home, and Accessories.
- **Live Search**: Instant keyword search matching product names, brands, and descriptions.
- **Sorting Options**: Sort by newest, price (low-to-high, high-to-low), customer rating, or popularity.
- **Interactive Quick View**: Inspect high-res product photos, warranty information, and inventory count in a modal without navigating away.
- **Customer Reviews & Ratings**: Submit verified 1-5 star ratings and reviews.

### 3. 🛒 Cart Drawer & Smart Checkout
- **Slide-Over Cart Drawer**: Accessible from any page with real-time badge counters.
- **Quantity Controls**: Increment, decrement, or remove items with automatic stock validation.
- **Free Shipping Meter**: Visual progress bar indicating how much more is needed for free express delivery.
- **Promotional Coupons**: Supports promo discounts (e.g., `SYNTECX10` for 10% off).
- **Simulated Checkout**: Collects complete shipping information, offers multiple payment options (Simulated Credit Card, UPI / NetBanking, Cash on Delivery), and processes mock payments without live payment gateway fees.

### 4. 📦 Order Management & Tracking
- **Order Confirmation Receipt**: Displays order ID, timestamp, items breakdown, payment verification code, and destination.
- **Customer Orders Portal**: Real-time status badges (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).

### 5. 👑 Administrator Dashboard
- **Executive Metrics**: Total Revenue, Total Order Count, Active Orders Requiring Dispatch, Catalog Count, and Low Stock Alerts.
- **Product Management**: Full CRUD interface to add new products, edit pricing/stock/images, and remove discontinued hardware.
- **Order Management**: View all customer orders with customer details and update fulfillment status in one click.
- **Role-Based Authorization**: Protected backend endpoints restricted to users with `role: 'admin'`.

### 6. 🔐 Robust Security & Backend
- **Password Encryption**: Passwords salted and hashed with `bcryptjs`.
- **JWT Authorization**: Bearer tokens protecting private customer routes and administrator endpoints.
- **Input Validation**: Sanitization and validation on authentication and orders.
- **Environment Isolation**: Sensitive configuration stored in `.env`.

---

## 🏗️ Project Architecture

```
E-Commerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile
│   │   ├── productController.js  # Product catalog, CRUD, reviews
│   │   └── orderController.js    # Checkout, status updates, analytics
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & admin check
│   │   └── errorMiddleware.js    # 404 & error handling
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt pre-save hook
│   │   ├── Product.js            # Product & Review schema
│   │   └── Order.js              # Order schema with shipping & totals
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── productRoutes.js      # /api/products
│   │   └── orderRoutes.js        # /api/orders
│   ├── .env                      # Environment variables
│   ├── .env.example              # Template configuration
│   ├── package.json              # Backend dependencies & scripts
│   ├── seeder.js                 # Database populator script
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Top navigation with live search & cart
│   │   │   ├── Footer.jsx        # Footer with guarantees & categories
│   │   │   ├── ProductCard.jsx   # Product card with hover effects
│   │   │   ├── ProductModal.jsx  # Quick-view modal
│   │   │   ├── CartDrawer.jsx    # Slide-over cart drawer
│   │   │   ├── Rating.jsx        # Star rating component
│   │   │   └── Toast.jsx         # Bottom feedback notifications
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state & persistent token
│   │   │   └── CartContext.jsx   # Shopping cart state & local storage
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Hero, categories, featured gear
│   │   │   ├── ProductsPage.jsx  # Catalog with search, filters & sort
│   │   │   ├── ProductDetailsPage.jsx # Specs, reviews, gallery
│   │   │   ├── CartPage.jsx      # Full shopping cart & summary
│   │   │   ├── CheckoutPage.jsx  # Shipping & simulated payment
│   │   │   ├── OrderConfirmationPage.jsx # Order receipt
│   │   │   ├── MyOrdersPage.jsx  # Customer order history & tracking
│   │   │   ├── LoginPage.jsx     # User authentication
│   │   │   ├── RegisterPage.jsx  # New customer sign-up
│   │   │   └── AdminDashboardPage.jsx # Admin metrics, products & orders
│   │   ├── services/
│   │   │   └── api.js            # REST API client wrapper
│   │   ├── App.jsx               # Application router & views
│   │   ├── index.css             # Design system & styles
│   │   └── main.jsx              # React DOM root
│   ├── index.html                # HTML5 root with Google Fonts
│   ├── package.json              # Frontend dependencies & scripts
│   └── vite.config.js            # Vite configuration with API proxy
│
├── .gitignore                    # Git ignore file
├── .env.example                  # Root environment sample
├── package.json                  # Root runner scripts
└── README.md                     # Documentation
```

---

## 🔑 Default Demo Accounts

For instant testing, pre-configured accounts are seeded into the database:

| Role | Email | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@syntecxhub.com` | `admin123` | Full access to Admin Dashboard, Product CRUD & Order Updates |
| **👤 Customer** | `customer@syntecxhub.com` | `customer123` | Browse catalog, add to cart, checkout, view order history |

> **Pro-Tip**: Both accounts can be populated with one click using the **Demo Credentials** buttons on the Sign In page!

---

## 🚀 Step-by-Step Installation & Running Guide

### Prerequisites
1. **Node.js** (v18 or higher recommended)
2. **MongoDB** (Running locally on `127.0.0.1:27017` or a MongoDB Atlas connection URI)

---

### Step 1: Install Dependencies

From the project root directory, install dependencies for both backend and frontend:

#### Windows (PowerShell / Command Prompt):
```bash
# Install backend dependencies
cd backend
cmd /c "npm install"

# Install frontend dependencies
cd ../frontend
cmd /c "npm install"
```

---

### Step 2: Seed the Database

Populate MongoDB with default accounts, 12 high-performance hardware products, and sample orders:

```bash
cd backend
cmd /c "npm run seed"
```

Expected output:
```
 MongoDB Connected: 127.0.0.1
🧹 Clearing existing database collections...
👤 Seeding users...
📦 Seeding products...
🛍️ Seeding initial demo order...
✅ Database seeded successfully!
```

---

### Step 3: Start the Backend Server

Start the Express API server (runs on port **5000**):

```bash
cd backend
cmd /c "npm run dev"
```

You should see:
```
🚀 Syntecxhub E-Commerce Server running on port 5000 in development mode
 MongoDB Connected: 127.0.0.1
```

Verify backend health by opening `http://localhost:5000/api/health` in your browser.

---

### Step 4: Start the Frontend Application

Open a **separate terminal window** and run the React Vite development server:

```bash
cd frontend
cmd /c "npm run dev"
```

You will see:
```
  VITE v8.3.5 ready in 368 ms

  ➜  Local:   http://localhost:3000/
```

Open **`http://localhost:3000`** in your browser to experience the Syntecxhub E-Commerce Store!

---

## 📡 REST API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive JWT token | Public |
| `GET` | `/api/auth/profile` | Retrieve current user profile | Private |
| `PUT` | `/api/auth/profile` | Update profile information | Private |

### Products (`/api/products`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get products with search, category & sort | Public |
| `GET` | `/api/products/:id` | Get single product specifications | Public |
| `POST` | `/api/products` | Create a new product | Private (Admin) |
| `PUT` | `/api/products/:id` | Update product details or stock | Private (Admin) |
| `DELETE` | `/api/products/:id` | Delete a product | Private (Admin) |
| `POST` | `/api/products/:id/reviews` | Submit product review & rating | Private |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Create an order with shipping info | Private |
| `GET` | `/api/orders/myorders` | Get logged-in user's orders | Private |
| `GET` | `/api/orders/admin/stats`| Get executive dashboard metrics | Private (Admin) |
| `GET` | `/api/orders` | Get all customer orders | Private (Admin) |
| `GET` | `/api/orders/:id` | Get order details by ID | Private |
| `PUT` | `/api/orders/:id/status`| Update order status | Private (Admin) |

---

## 📤 Uploading to GitHub

To publish this project to GitHub:

```bash
# Initialize git repository (from project root)
git init

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: Syntecxhub full-stack e-commerce store"

# Set main branch
git branch -M main

# Link remote repository (replace with your GitHub repository URL)
git remote add origin https://github.com/YOUR_USERNAME/syntecxhub-ecommerce-store.git

# Push to GitHub
git push -u origin main
```

---

## 🛡️ License

This project is licensed under the **ISC License**. Developed for Syntecxhub.
