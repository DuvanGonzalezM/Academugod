const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', loginController.login);
router.post('/login', loginController.auth);
router.get('/logout', loginController.logout);

module.exports = router;