const axios = require('axios');

const{ BookingRepository } = require('../repository/index');

const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();

    }
    async createBooking(data){
        try {
            const flightId = data.flightId;
            // console.log(flightId);
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData  = response.data.data;  //because the response we get is in json format , we need to extract only data properties from it
        //still left to write the logic the check if booking is possible or not
         let createResponse;
        if(flightData.totalSeats >= data.noOfSeats)
        {
            // console.log('true');
            data.totalCost  = flightData.price * data.noOfSeats;
              createResponse = await this.bookingRepository.create(data);
            const totalSeats = flightData.totalSeats - data.noOfSeats;
            // console.log('totalseats')
            await axios.patch(getFlightRequestURL,{totalSeats}); //updating the seats left in the flight after booking
            const finalBooking = await this.bookingRepository.update(createResponse.id,{status : 'BOOKED'});
            return finalBooking;
        }
           //0:58:00
        // console.log(flightData);
            return createResponse;
        } catch (error) {
            console.log('error in service layer while creating booking')
            throw new ServiceError();
        }
    }

    async update(id, data){

    }
}
module.exports = BookingService;