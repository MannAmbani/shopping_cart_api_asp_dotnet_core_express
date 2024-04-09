const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Comment = require('../models/Comments');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET comment by ID
router.get('/:id', async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST create new comment
router.post('/', [
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('userId').notEmpty().withMessage('User ID cannot be empty'),
    body('rating').isNumeric().withMessage('Rating must be a number').notEmpty().withMessage('Rating cannot be empty').custom(value => value >= 0 && value <= 5).withMessage('Rating must be between 0 and 5'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('text').optional().isString().withMessage('Text must be a string')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, userId, rating, images, text } = req.body;
    const comment = new Comment({ productId, userId, rating, images, text });

    try {
        await comment.save();
        res.json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update comment by ID
router.put('/:id', [
    param('id').notEmpty().withMessage('Comment ID cannot be empty'),
    body('productId').notEmpty().withMessage('Product ID cannot be empty'),
    body('userId').notEmpty().withMessage('User ID cannot be empty'),
    body('rating').isNumeric().withMessage('Rating must be a number').notEmpty().withMessage('Rating cannot be empty').custom(value => value >= 0 && value <= 5).withMessage('Rating must be between 0 and 5'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('text').optional().isString().withMessage('Text must be a string')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { productId, userId, rating, images, text } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, { productId, userId, rating, images, text }, { new: true });

        if (updatedComment) {
            res.json({ message: 'Comment updated successfully', updatedComment });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE comment by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (deletedComment) {
            res.json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
