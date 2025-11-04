import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: savedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Track order (public route for customers) - MUST BE BEFORE /:id route
router.post('/track', async (req, res) => {
  try {
    const { orderId, email, phone } = req.body;
    
    if (!orderId || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and either email or phone number are required'
      });
    }

    // Find order by ID and verify with email or phone
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found. Please check your order ID.'
      });
    }

    // Verify email or phone matches
    const emailMatch = email && order.email.toLowerCase() === email.toLowerCase();
    const phoneMatch = phone && order.phone === phone;

    if (!emailMatch && !phoneMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email or phone number does not match our records.'
      });
    }
    
    // Return order details (excluding sensitive info)
    res.status(200).json({
      success: true,
      data: {
        _id: order._id,
        trackingId: order.trackingId,
        orderStatus: order.orderStatus,
        orderDate: order.orderDate,
        deliveryDate: order.deliveryDate,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        items: order.items,
        customerName: order.customerName,
        address: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to track order',
      error: error.message
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    });
  }
});

export default router;
