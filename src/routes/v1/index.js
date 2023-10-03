const express = require('express');

const{BookingController} = require('../../controllers/index')

const router = express.Router();

router.post('/bookings', BookingController.create);
router.patch('/cancelBooking/:id', BookingController.cancelBooking);

module.exports = router;