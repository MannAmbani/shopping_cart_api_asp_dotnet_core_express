const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Product = require('../models/Products');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST create new product
router.post('/', [
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('image').notEmpty().withMessage('Image URL cannot be empty'),
    body('pricing').isNumeric().withMessage('Pricing must be a number').notEmpty().withMessage('Pricing cannot be empty').custom(value => value >= 0).withMessage('Pricing cannot be negative'),
    body('shippingCost').isNumeric().withMessage('Shipping cost must be a number').notEmpty().withMessage('Shipping cost cannot be empty').custom(value => value >= 0).withMessage('Shipping cost cannot be negative'),
    body('oldPrice').optional().isNumeric().withMessage('Old price must be a number').custom(value => value >= 0).withMessage('Old price cannot be negative'),
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('category').notEmpty().withMessage('Category cannot be empty'),
    body('tags').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { description, image, pricing, shippingCost, oldPrice, title, category, tags } = req.body;
    const product = new Product({ description, image, pricing, shippingCost, oldPrice, title, category, tags });

    try {
        await product.save();
        res.json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update product by ID
router.put('/:id', [
    param('id').notEmpty().withMessage('Product ID cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('image').notEmpty().withMessage('Image URL cannot be empty'),
    body('pricing').isNumeric().withMessage('Pricing must be a number').notEmpty().withMessage('Pricing cannot be empty').custom(value => value >= 0).withMessage('Pricing cannot be negative'),
    body('shippingCost').isNumeric().withMessage('Shipping cost must be a number').notEmpty().withMessage('Shipping cost cannot be empty').custom(value => value >= 0).withMessage('Shipping cost cannot be negative'),
    body('oldPrice').optional().isNumeric().withMessage('Old price must be a number').custom(value => value >= 0).withMessage('Old price cannot be negative'),
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('category').notEmpty().withMessage('Category cannot be empty'),
    body('tags').optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { description, image, pricing, shippingCost, oldPrice, title, category, tags } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { description, image, pricing, shippingCost, oldPrice, title, category, tags }, { new: true });

        if (updatedProduct) {
            res.json({ message: 'Product updated successfully', updatedProduct: updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
