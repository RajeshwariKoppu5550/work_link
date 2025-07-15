const express = require('express');
const router = express.Router();
const savedWorkerController = require('../controllers/savedWorkerController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Get saved workers (contractor)
router.get('/', auth, role('contractor'), savedWorkerController.list);
// Save a worker (contractor)
router.post('/', auth, role('contractor'), savedWorkerController.create);
// Remove saved worker (contractor)
router.delete('/:id', auth, role('contractor'), savedWorkerController.remove);

module.exports = router; 