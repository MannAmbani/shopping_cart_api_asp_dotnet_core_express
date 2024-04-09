const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Order = require('../models/Orders');

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET order by ID
router.get('/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST create new order
router.post('/', [
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('userId').notEmpty().withMessage('User ID cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity cannot be empty').custom(value => value >= 1).withMessage('Quantity must be at least 1'),
    body('totalPrice').isNumeric().withMessage('Total price must be a number').notEmpty().withMessage('Total price cannot be empty').custom(value => value >= 0).withMessage('Total price cannot be negative'),
    body('shippingAddress').notEmpty().withMessage('Shipping address cannot be empty'),
    body('status').notEmpty().withMessage('Status cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, userId, quantity, totalPrice, shippingAddress, status } = req.body;
    const order = new Order({ productId, userId, quantity, totalPrice, shippingAddress, status });

    try {
        await order.save();
        res.json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update order by ID
router.put('/:id', [
    param('id').notEmpty().withMessage('Order ID cannot be empty'),
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('userId').notEmpty().withMessage('User ID cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity cannot be empty').custom(value => value >= 1).withMessage('Quantity must be at least 1'),
    body('totalPrice').isNumeric().withMessage('Total price must be a number').notEmpty().withMessage('Total price cannot be empty').custom(value => value >= 0).withMessage('Total price cannot be negative'),
    body('shippingAddress').notEmpty().withMessage('Shipping address cannot be empty'),
    body('status').notEmpty().withMessage('Status cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { productId, userId, quantity, totalPrice, shippingAddress, status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { productId, userId, quantity, totalPrice, shippingAddress, status }, { new: true });

        if (updatedOrder) {
            res.json({ message: 'Order updated successfully', updatedOrder });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE order by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (deletedOrder) {
            res.json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
