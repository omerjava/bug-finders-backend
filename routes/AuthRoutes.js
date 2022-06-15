const express = require("express");
const authController = require("../controllers/AuthController");
const router = express.Router();




router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/getValidToken', authController.getValidToken);
router.post('/logout', authController.logout);



module.exports = router; 