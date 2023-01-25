const express = require('express');
const router = express.Router();

const permissionController = require('../controller/permissionController');

// Get List of permissions
router.get('/', permissionController.index);

// Create a new permission
router.get('/create', permissionController.createView);

// Create a new permission
router.post('/', permissionController.store);

// Update view of a permission
router.get('/:id/edit', permissionController.editView);

// Update a permission
router.put('/:id', permissionController.update);

// Delete a permission
router.delete('/:id', permissionController.delete);

module.exports = router;
