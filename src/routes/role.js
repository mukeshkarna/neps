const express = require('express');
const router = express.Router();

const roleController = require('../controller/roleController');

// Get List of Roles
router.get('/', roleController.index);

// Create view of a new Role
router.get('/create', roleController.createView);

// Create a new Role
router.post('/create', roleController.store);

// Get Role by ID
router.get('/:id', roleController.show);

// Update view of a Role
router.get('/:id/edit', roleController.editView);

// Update a Role
router.put('/:id', roleController.update);

// Delete a Role
router.delete('/:id', roleController.delete);

// Add Permissions to Role
router.post('/permissions/:id', roleController.addPermission);

module.exports = router;
