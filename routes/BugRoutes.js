const express = require("express");
const bugController = require("../controllers/BugController.js");
const router = express.Router();
const authenticateJWT = require("../middlewares/auth-jwt");


router.post('/create', authenticateJWT, bugController.createBug);
router.get('/showAllBugs', bugController.getAllBugs);
router.get('/searchBugs', bugController.searchBugs);
router.get('/countBugs/:userId', bugController.countBugs);
router.get('/countBugs/', bugController.countBugs);
router.get('/showMyBugs', authenticateJWT, bugController.getMyBugs);
router.get('/:userId', authenticateJWT, bugController.getBugsById);
router.put('/updateMyBug', authenticateJWT, bugController.updateMyBug);
router.delete('/deleteMyBug', authenticateJWT, bugController.deleteMyBug);






module.exports = router; 
