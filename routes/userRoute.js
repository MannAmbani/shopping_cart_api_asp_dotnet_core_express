const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/users');
const cors = require('cors');
const app = new express();

// const path = require("path");
app.use(express.static('public')); //make public data available
app.use(bodyParser.json());
app.use(cors());

const { body, param, validationResult } = require('express-validator');
express.use

router.get('/', async (req, res) => {
    const user = await User.find();
    res.json(user);
  });
  
  // app.post('/tasks', async (req, res) => {
  //   const { title, description, status } = req.body;
  //   const task = new Task({ title, description, status });
  //   await task.save();
  //   res.json(task);
  // });

//     username: String,
    // email: { type: String, required: true },
    // password: { type: String, required: true },
    // contact:{type:String},
    // purchaseHistory:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}],
    // shippingAddress:{type:String}

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
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  });

  // app.put('/tasks/:id', async (req, res) => {
  //   const { id } = req.params;
  //   const { title, description, status } = req.body;
  
  //   try {
  //     const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
      
  //     if (updatedTask) {
  //       res.json(updatedTask);
  //     } else {
  //       res.status(404).json({ message: 'Task not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // });

 

  router.put('/:id', [
    // Validate task ID
    param('id').notEmpty().withMessage('User ID cannot be empty'),

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
