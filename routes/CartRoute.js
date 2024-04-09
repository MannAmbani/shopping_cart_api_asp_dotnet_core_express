const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Cart = require('../models/Carts');

// GET all items in the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET item in the cart by ID
router.get('/:id', async (req, res) => {
    const cartItemId = req.params.id;

    try {
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json(cartItem);
    } catch (error) {
        console.error('Error fetching cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST add item to the cart
router.post('/', [
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity cannot be empty').custom(value => value >= 1).withMessage('Quantity must be at least 1'),
    body('userId').notEmpty().withMessage('User ID cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity, userId } = req.body;
    const cartItem = new Cart({ productId, quantity, userId });

    try {
        await cartItem.save();
        res.json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update item in the cart by ID
router.put('/:id', [
    param('id').notEmpty().withMessage('Cart item ID cannot be empty'),
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity cannot be empty').custom(value => value >= 1).withMessage('Quantity must be at least 1'),
    body('userId').notEmpty().withMessage('User ID cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { productId, quantity, userId } = req.body;

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(id, { productId, quantity, userId }, { new: true });

        if (updatedCartItem) {
            res.json({ message: 'Cart item updated successfully', updatedCartItem });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE item in the cart by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCartItem = await Cart.findByIdAndDelete(id);
        if (deletedCartItem) {
            res.json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
