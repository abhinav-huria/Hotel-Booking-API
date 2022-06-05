import axios from "axios";

export const bookRoom = async (userId, roomId, data) => {
  try {
    const res = await axios.post(
      `/api/v1/booking/book/${userId}/${roomId}`,
      data,
      { withCredentials: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getBooking = async (userId,bookingId) => {
    try {
        const res = await axios.get(
        `/api/v1/booking/${userId}/${bookingId}`
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
    };

    export const deleteBooking = async (bookingId) => {
        try {
            const res = await axios.delete(
            `/api/v1/booking/delete/${bookingId}`
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
        };

        export const getUserBookings = async (userId) => {
            try {
                const res = await axios.get(
                `/api/v1/booking/mybookings/u/${userId}`,
                { withCredentials: true }
                );
                return res.data;
            } catch (err) {
                console.log(err);
            }
            };