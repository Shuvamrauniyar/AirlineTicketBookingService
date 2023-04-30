
const {Booking} = require('../models/index');
const { StatusCodes } = require('http-status-codes');
const { ValidationError, AppError } = require('../utils/errors');

class BookingRepository {
    async create(data){
        try {
            console.log('creating entries from repo layer')
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            console.log('error in repo layer');
            if(error == sequelizeValidationerror) {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository Error',
                'cannot create Booking',
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports = BookingRepository;
