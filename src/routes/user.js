const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

// Get List of Users
router.get('/', userController.index);

// Create a new User
router.post('/', userController.store);

// Get User by ID
router.get('/:id', userController.show);

// Update a User
router.put('/:id', userController.update);

// Delete a User
router.delete('/:id', userController.delete);

module.exports = router;
