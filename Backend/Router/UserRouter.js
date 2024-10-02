const userController = require('../Controller/userController')
const express = require('express');
const verifyToken = require('../Middleware/Middleware')
const router = express.Router();

router.post('/signup', userController.registerUser);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.profile);

module.exports = router;