const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Get saved jobs (worker)
router.get('/', auth, role('worker'), savedJobController.list);
// Save a job (worker)
router.post('/', auth, role('worker'), savedJobController.create);
// Remove saved job (worker)
router.delete('/:id', auth, role('worker'), savedJobController.remove);

module.exports = router; 