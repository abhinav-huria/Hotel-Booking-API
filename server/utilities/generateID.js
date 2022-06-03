let hotels=1;
let rooms=1;
let bookings=1;
let users=1;

export function generateHotelId ()  {
    hotels++;
    return 'H' + Math.floor(Math.random() * (1000000+hotels));
    }
export function generateRoomId ()  {
    rooms++;
    return 'R' + Math.floor(Math.random() * (1000000+rooms));
    }
export function generateBookingId () {
    bookings++;
    return 'B' + Math.floor(Math.random() * (1000000+bookings));
    }
export function generateUserId  () {
    
    return 'U' + Math.floor(Math.random() * 1000000);
    }

