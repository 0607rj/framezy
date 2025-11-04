# Famezy Backend API

Backend server for Famezy e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env`

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Posters` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Order Schema
```json
{
  "customerName": "string",
  "email": "string",
  "phone": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "pincode": "string",
    "country": "India"
  },
  "items": [{
    "productId": "string",
    "productName": "string",
    "quantity": number,
    "price": number,
    "image": "string"
  }],
  "totalAmount": number,
  "paymentMethod": "COD|Online|UPI",
  "paymentStatus": "Pending|Paid|Failed",
  "orderStatus": "Pending|Processing|Shipped|Delivered|Cancelled"
}
```
