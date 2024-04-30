const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.dashboard);
router.get('/estudiantes/inscribirMaterias', viewController.inscribirMaterias);
module.exports = router;