import axios from "axios";

export const bookRoom = async (userId, roomId, data) => {
  try {
    const res = await axios.post(
      `http://localhost:3003/api/v1/booking/book/${userId}/${roomId}`,
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

export const getBooking = async (bookingId) => {
    try {
        const res = await axios.get(
        `http://localhost:3003/api/v1/booking/${bookingId}`
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
    };