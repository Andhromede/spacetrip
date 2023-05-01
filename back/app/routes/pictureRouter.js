const express = require('express');
const router = express.Router();
const pictureCtrl = require('../controllers/pictureController');
const isUser = require ("../middlewares/isUser");


router.get('/:id', pictureCtrl.getOnePicture);
router.get('/', pictureCtrl.getAllPicture);
router.post('/', isUser, pictureCtrl.createPicture);
router.put('/:id', isUser, pictureCtrl.updatePicture);
router.delete('/:id', isUser, pictureCtrl.deletePicture);


module.exports = router;