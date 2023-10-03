
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
    async update(bookingId,data)
    {
        try {
            console.log('updating  status from repo layer')
            // const bookingData = await Booking.update(data,{
            //     where:{
            //         id: bookingId
            //     }
            // }); //here the update was returning 1 ig it means successfully updated but it was good response to the frontend,so used below method
            const bookingData = await Booking.findByPk(bookingId);
            if(data)
            {
               bookingData.status = data.status;
            }
            await bookingData.save();
            return bookingData;
        } catch (error) {
            console.log('error in repo layer');
           throw error;
        }
    }
    async getBookingRecord(bookingId){
        try {
            const bookingDetails = await Booking.findOne({
                where: {id: bookingId},
                attributes: ['flightId', 'noOfSeats']
            });
            return bookingDetails;
        } catch (error) {
            console.log('error while fetching booking details in booking-repo layer');
            throw error;
        }
    }
}
module.exports = BookingRepository;
