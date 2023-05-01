const express = require("express");
const router = express.Router();
const isUser = require ("../middlewares/isUser");
const activityCtrl = require("../controllers/activityControllers");
const multer = require ("../middlewares/multer");


router.get('/:id', activityCtrl.getOneActivity);
router.get('/', activityCtrl.getAllActivity);
router.post('/', isUser, multer.single('picture'), activityCtrl.createActivity);
router.put('/:id', isUser, multer.single('picture'), activityCtrl.updateActivity);
router.delete('/:id', isUser, activityCtrl.deleteActivity);


module.exports = router;