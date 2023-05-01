const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const isUser = require ("../middlewares/isUser");


router.get('/:id', bookingController.getOneBooking);
router.get('/', bookingController.getAllBooking);
router.get('/housing/:id', bookingController.getBookingByHousing);
router.get('/user/:id', isUser, bookingController.getBookingByIdUser);
router.post('/', isUser, bookingController.createBooking);
router.put('/:id', isUser, bookingController.updateBooking);
router.delete('/:id', isUser, bookingController.deleteBooking);


module.exports = router;