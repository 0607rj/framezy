# Famezy - E-Commerce Platform with Admin Dashboard

A full-stack e-commerce application with a public storefront, admin dashboard, and advanced features like order tracking and cart management.

## 📋 Project Overview

Famezy is a modern e-commerce platform built with:
- **Frontend**: React + Vite
- **Admin Dashboard**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Features**: Product catalog, shopping cart, order management, admin panel, order tracking system

## 🗂️ Project Structure

```
poster/
├── frontend/              # Customer-facing storefront
│   ├── src/
│   │   ├── components/   # Reusable components (Header, Cart, etc.)
│   │   ├── pages/        # Page components (Home, ProductDetail, etc.)
│   │   ├── context/      # CartContext for state management
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── admin/                 # Admin management dashboard
│   ├── src/
│   │   ├── components/   # Admin components (Orders, Products)
│   │   ├── pages/        # Admin pages (Dashboard, Login)
│   │   ├── context/      # AuthContext for authentication
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/              # Express server & API
│   ├── routes/          # API routes (products, orders)
│   ├── models/          # MongoDB models (Product, Order)
│   ├── server.js        # Express server entry point
│   ├── package.json
│   └── README.md
│
├── SETUP_INSTRUCTIONS.md # Order tracking setup guide
├── ORDER_TRACKING_GUIDE.md # User guide for order tracking
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd poster
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
NODE_ENV=development
```

Start the backend:
```bash
npm start
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory (can be empty or with API URL):
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Admin Dashboard Setup
```bash
cd admin
npm install
```

Create a `.env` file in the `admin/` directory:
```
VITE_API_URL=http://localhost:5000/api
```

Start the admin dashboard:
```bash
npm run dev
```

The admin dashboard will run on `http://localhost:5174`

## 📱 Features

### Customer Features
- **Product Browsing**: View products by categories
- **Shopping Cart**: Add/remove items, persistent cart
- **Checkout**: Complete order placement
- **Order Tracking**: Track orders without login (Order ID + Email/Phone verification)
- **Order History**: View past orders (via tracking)
- **Responsive Design**: Works on desktop and mobile

### Admin Features
- **Dashboard**: Overview of orders and products
- **Product Management**: Add, edit, delete products
- **Order Management**: View all orders, update order status
- **Admin Authentication**: Secure login system

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)
- `POST /api/orders/track` - Track order (public - requires Order ID + Email/Phone)

## 📚 Documentation

- [Setup Instructions](./SETUP_INSTRUCTIONS.md) - Detailed order tracking implementation
- [Order Tracking Guide](./ORDER_TRACKING_GUIDE.md) - How to use order tracking features

Each folder also contains its own README:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Admin Dashboard README](./admin/README.md)

## 🔐 Security Notes

### .env Files
Never commit `.env` files to the repository. They are already in `.gitignore`. 

Create your own `.env` files locally with sensitive information:
- **Backend**: MongoDB URI, API keys
- **Frontend/Admin**: API URLs (can be public)

### Admin Authentication
Default admin credentials should be changed in production.

## 🌐 Live Applications

### Deployed Versions
- **Frontend**: [framezy.netlify.app](https://framezy.netlify.app/)
- **Admin Dashboard**: [framezy-admin.netlify.app](https://framezy-admin.netlify.app/)
- **Backend API**: [Your Backend URL]

### Deployment Steps
Refer to each folder's README for specific deployment instructions.

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Admin
```bash
cd admin
npm run build
```

### Backend
No special build needed; deploy `server.js` and all dependencies.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Push to your branch
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 💬 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Coding!** 🎉
