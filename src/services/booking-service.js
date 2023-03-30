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
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData  = response.data.data;  //because the response we get is in json format , we need to extract only data properties from it
            return flightData;
        } catch (error) {
            throw new ServiceError();
        }
    }
}
module.exports = BookingService;