const express = require('express');
const router = express.Router();
const workPostController = require('../controllers/workPostController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// List all active work posts (for workers)
router.get('/', auth, workPostController.list);
// Create a work post (contractor only)
router.post('/', auth, role('contractor'), workPostController.create);
// Edit a work post (contractor only)
router.put('/:id', auth, role('contractor'), workPostController.update);
// Delete a work post (contractor only)
router.delete('/:id', auth, role('contractor'), workPostController.remove);

module.exports = router; 