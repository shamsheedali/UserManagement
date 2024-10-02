const userController = require('../Controller/userController')
const express = require('express');
const router = express.Router();

router.post('/signup', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;