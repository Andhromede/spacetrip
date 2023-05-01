const express = require("express");
const router = express.Router();
const rateCtrl = require('../controllers/rateController');
const isUser = require ("../middlewares/isUser");


router.get('/:id', rateCtrl.getRatesByHousing);
router.get('/user/:id', rateCtrl.getRatesByUser);
router.get('/', rateCtrl.getRates);
router.post('/', isUser, rateCtrl.createRate);
router.put('/:id',isUser, rateCtrl.updateRate);
router.delete('/:id',isUser, rateCtrl.deleteRate);


module.exports = router;