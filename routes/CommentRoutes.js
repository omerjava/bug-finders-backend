const express = require("express");
const commentController = require("../controllers/CommentController.js");
const router = express.Router();
const authenticateJWT = require("../middlewares/auth-jwt");


router.post('/create', authenticateJWT, commentController.createNewComment);
router.get('/showAllComments', commentController.getAllComments);
router.get('/showMyComments', authenticateJWT, commentController.getMyComments);
router.get('/:userId', authenticateJWT, commentController.getCommentsById);
router.put('/updateMyComment', authenticateJWT, commentController.updateMyComment);
router.delete('/delete', authenticateJWT, commentController.deleteMyComment);




module.exports = router; 