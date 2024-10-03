const userController = require('../Controller/userController')
const express = require('express');
const verifyToken = require('../Middleware/Middleware');
const router = express.Router();
const multer = require('multer');

// Setup multer
const upload = multer({ storage: multer.memoryStorage() });

router.post('/signup', userController.registerUser);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.profile);
router.post('/update', verifyToken, upload.single('profileImage'), userController.update);
router.get('/profile-data', verifyToken, userController.getUserProfile);

module.exports = router;