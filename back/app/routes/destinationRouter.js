const express = require("express");
const router = express.Router();
const isUser = require ("../middlewares/isUser");
const destinationCtrl = require("../controllers/destinationController");
const multer = require ("../middlewares/multer");


router.get('/', destinationCtrl.getAllDestination);
router.get('/:id', destinationCtrl.getOneDestination);
router.post('/', isUser, multer.single('picture'), destinationCtrl.createDestination);
router.put('/:id', isUser, multer.single('picture'), destinationCtrl.updateDestination);
router.delete('/:id', isUser, destinationCtrl.deleteDestination);


module.exports = router;