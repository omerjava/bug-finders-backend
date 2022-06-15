const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();
const authenticateJWT = require("../middlewares/auth-jwt");

router.get("/usernames", authenticateJWT, userController.getAllUsernames);
router.get("/bugHunters", authenticateJWT, userController.getAllUsers);
router.get("/userInfo", authenticateJWT, userController.getMyUserInfo);
router.delete("/delete", authenticateJWT, userController.deleteUser);

module.exports = router;
