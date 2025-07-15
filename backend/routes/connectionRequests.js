const express = require('express');
const router = express.Router();
const connectionRequestController = require('../controllers/connectionRequestController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// List requests (for user)
router.get('/', auth, connectionRequestController.list);
// Create/apply (worker applies to job)
router.post('/', auth, role('worker'), connectionRequestController.create);
// Accept/decline (contractor)
router.put('/:id', auth, role('contractor'), connectionRequestController.update);

module.exports = router; 