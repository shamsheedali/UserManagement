const adminController = require('../Controller/adminController');
const express = require("express");
const router = express.Router();
const verifyToken = require('../Middleware/Middleware');

router.post('/admin_login', adminController.login);
router.get('/get_users', verifyToken, adminController.fetchUsers);
router.get('/delete_user/:id', verifyToken, adminController.deleteUser);
router.post('/edit_user/:id', verifyToken, adminController.editUser);

module.exports = router;