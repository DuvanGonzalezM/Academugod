const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.dashboard);
router.get('/docentes/cargar_notas', viewController.cargarN);

module.exports = router;