const express = require('express');
const router = express.Router();

const permissionController = require('../controller/permissionController');

// Create a new permission
router.post('/', permissionController.store);

// Get List of permissions
router.get('/', permissionController.index);

// Update a permission
router.put('/:id', permissionController.update);

// Delete a permission
router.delete('/:id', permissionController.delete);

module.exports = router;
