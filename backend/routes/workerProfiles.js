const express = require('express');
const router = express.Router();
const workerProfileController = require('../controllers/workerProfileController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// List all worker profiles (for contractors)
router.get('/', auth, role('contractor'), workerProfileController.list);
// Create a worker profile (worker only)
router.post('/', auth, role('worker'), workerProfileController.create);
// Edit a worker profile (worker only)
router.put('/:id', auth, role('worker'), workerProfileController.update);
// Delete a worker profile (worker only)
router.delete('/:id', auth, role('worker'), workerProfileController.remove);

module.exports = router; 