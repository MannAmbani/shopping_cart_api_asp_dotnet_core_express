const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { body, param, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    const user = await User.find();
    res.json(user);
  });
  

    router.get('/:id', async (req, res) => {
        const userId = req.params.id;
    
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    router.post('/', [
    // Validate title, description, and status
    body('username').notEmpty().withMessage('username cannot be empty'),
    body('email').notEmpty().withMessage('email cannot be empty'),
    body('password').notEmpty().withMessage('password cannot be empty'),
    body('contact').notEmpty().withMessage('contact cannot be empty'),
    body('shippingAddress').notEmpty().withMessage('shippingAddress cannot be empty')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, proceed with creating the task
    const { username, email, password, contact,purchaseHistory, shippingAddress } = req.body;
    const user = new User({ username, email, password, contact,purchaseHistory, shippingAddress });
    await user.save();
    res.json({message: 'User Added Successfully' ,User:user});
});
  
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);;
        if (deletedUser) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/:id', [
    // Validate ID
    param('id').notEmpty().withMessage('User ID cannot be empty'),

    // Validate fields
    body('username').notEmpty().withMessage('username cannot be empty'),
    body('email').notEmpty().withMessage('email cannot be empty'),
    body('password').notEmpty().withMessage('password cannot be empty'),
    body('contact').notEmpty().withMessage('contact cannot be empty'),
    body('shippingAddress').notEmpty().withMessage('shippingAddress cannot be empty')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, proceed with updating the task
    const { id } = req.params;
    const { username, email, password, contact,purchaseHistory, shippingAddress } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password, contact,purchaseHistory, shippingAddress }, { new: true });

        if (updatedUser) {
            res.json({message:'User updated Successfully', UpdatedUser:updatedUser});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
