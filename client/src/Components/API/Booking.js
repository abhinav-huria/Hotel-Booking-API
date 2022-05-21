import axios from "axios";

export const bookRoom = async (userId,roomId,data) => {
  try {
        const res = await axios
            .post(`http://localhost:3003/api/v1/booking/book/:${userId}/:${roomId}`, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}